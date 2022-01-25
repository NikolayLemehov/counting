import MyInput from "./components/input/MyInput";
import {useEffect, useState} from "react";
import MyButton from "./components/button/MyButton";
import OperationList from "./components/list/OperationList";
import {nanoid} from "nanoid";
import Output from "./components/output/Output";
import {formatDate} from "./utils";
// import classes from "./App.module.css";
import {useDebounce} from "./hooks/useDebounce";
import useFetchCourse from "./hooks/useFetchCourse";
import {useForm} from "./hooks/useForm";

const NameInput = {
  UAH: 'uah',
}
const NBU_DELAY = 1000;
const byId = ['uah', 'date', 'courseAuto', 'course']
const byHash = {
  uah: {
    type: 'text',
    label: 'UAH',
    value: '0',
  },
  date: {
    type: 'date',
    label: 'Дата',
    value: formatDate(new Date(), '-'),
  },
  courseAuto: {
    type: 'checkbox',
    label: 'Automatic course',
    value: true,
  },
  course: {
    type: 'text',
    label: 'Course',
    value: '30',
  },
}

function App() {
  const [byHashValues, onFieldChange, getSubmitData, setByHashValues] = useForm(byHash, byId)
  const [uahDirty, setUahDirty] = useState(false);
  const [uahError, setUahError] = useState('');

  const [items, setItems] = useState([]);

  const debouncedDate = useDebounce(byHashValues.date.value, NBU_DELAY)
  const debouncedAuthCourse = useDebounce(byHashValues.courseAuto.value, NBU_DELAY)

  const [remoteCourse, isLoading] = useFetchCourse(debouncedDate, debouncedAuthCourse)
  const [usd, setUsd] = useState(() => (+(byHashValues.uah.value) / +(byHashValues.course.value)));

  useEffect(() => {
    setUsd(+(byHashValues.uah.value) / +(byHashValues.course.value))
  }, [byHashValues.uah.value, byHashValues.course.value])

  useEffect(() => {
    setUsd(+(byHashValues.uah.value) / remoteCourse)
  }, [remoteCourse]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newByHashValues = {...byHashValues}
    newByHashValues.course.value = remoteCourse;
    setByHashValues(newByHashValues)
  }, [remoteCourse]) // eslint-disable-line react-hooks/exhaustive-deps

  const onClickSubmitBtn = () => {
    if (!uahError) {
      setItems(prevState => [...prevState, {...getSubmitData(), usd, id: nanoid()}])
    }
  }
  const onClickRemoveBtn = (id) => {
    setItems(prevState => {
      const index = prevState.findIndex(it => it.id === id);
      if (index !== -1) {
        prevState.splice(index, 1)
      }
      return [...prevState];
    })
  }
  const onKeyPressInput = (evt) => {
    if (evt.key !== 'Enter') return

    if(evt.target.name === NameInput.UAH) {
      setUahDirty(true)
    }
    onClickSubmitBtn()
  }

  return (
    <div className='container'>
        <h1>Counting</h1>
        <form>
          {byId.map(id => {
            return <MyInput
                key={id}
                label={byHash[id].label}
                inputProps={{
                  type: byHash[id].type,
                  name: id,
                  value: byHashValues[id].value,
                  onChange: onFieldChange,
                  onKeyPress: onKeyPressInput,
                  defaultChecked: byHash[id].type === 'checkbox' && byHashValues[id].value,
                  readOnly: id === 'course' && debouncedAuthCourse,
                }}
            />
          })}
          {(uahError && uahDirty) && <div style={{color: "red"}}>{uahError}</div>}

          <Output
              usd={usd.toFixed(2)}
          />
          <MyButton onClick={onClickSubmitBtn} type="button">Add operation</MyButton>
          {isLoading ? <div>Loading...</div> : <div>online</div>}
        </form>
        <OperationList
            items={items}
            onClickRemoveBtn={onClickRemoveBtn}
        />
      </div>
  );
}

export default App;
