import MyInput from "./components/input/MyInput";
import {useEffect, useState} from "react";
import MyButton from "./components/button/MyButton";
import OperationList from "./components/list/OperationList";
import {nanoid} from "nanoid";
import Output from "./components/output/Output";
import {formatDate} from "./utils";
import classes from "./App.module.css";
import axios from "axios";
import {useDebounce} from "./hooks/useDebounce";

const NameInput = {
  UAH: 'uah',
}
// new RegExp(/^\d*(?:[.,]\d*)?$/).test(e.target.value)
const url = process.env.REACT_APP_NBU_COURSE
const NBU_DELAY = 1000;

function App() {
  const [uah, setUah] = useState(0);
  const [uahDirty, setUahDirty] = useState(false);
  const [uahError, setUahError] = useState('');
  const [course, setCourse] = useState(30);
  const [date, setDate] = useState(new Date());
  const [usd, setUsd] = useState(() => (+uah / course));
  const [authCourse, setAuthCourse] = useState(true);

  const [items, setItems] = useState([]);

  const debouncedDate = useDebounce(date, NBU_DELAY)
  const debouncedAuthCourse = useDebounce(authCourse, NBU_DELAY)
  useEffect(() => {
    setUsd(+uah / course)
  }, [uah, course])

  const onChangeUah = (e) => {
    setUah(e.target.value);
    if (e.target.value === '') {
      setUahError('Ошибка')
    } else {
      setUahError('')
    }
  }
  const onChangeCourse = (e) => {
    setCourse(e.target.value);
  }
  const onChangeDate = (e) => {
    setDate(new Date(e.target.value));
  }

  const onClickSubmitBtn = () => {
    setItems(prevState => [...prevState, {uah, course, usd, date, id: nanoid()}])
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
    setItems(prevState => [...prevState, {uah, course, usd, date, id: nanoid()}])
  }
  const fetchCourse = async () => {
    if (!debouncedAuthCourse) {
      return;
    }
    const res = await axios.get(`${url}?valcode=USD&date=${formatDate(debouncedDate)}&json`)
    if (res.status === 200) {
      setCourse(res.data[0].rate)
    }
  }
  useEffect(() => {
    fetchCourse();
  }, [debouncedDate, debouncedAuthCourse]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='container'>
        <h1>Counting</h1>
        <form>
          <MyInput
              label={'UAH'}
              inputProps={{
                type: 'text',
                name: NameInput.UAH,
                value: uah,
                onChange: onChangeUah,
                onKeyPress: onKeyPressInput,
              }}
          />
          {(uahError && uahDirty) && <div style={{color: "red"}}>{uahError}</div>}

          <div className={classes.hWrapper}>
            <MyInput
                label={'Course'}
                inputProps={{
                  type: 'text',
                  value: course,
                  onChange: onChangeCourse,
                  readOnly: debouncedAuthCourse,
                }}
            />
            <MyInput
                label={'Automatic course'}
                inputProps={{
                  type: 'checkbox',
                  defaultChecked: debouncedAuthCourse,
                  onChange: ({target}) => setAuthCourse(target.checked),
                }}
            />
          </div>

          <MyInput
              label={'Date'}
              inputProps={{
                value: formatDate(date, '-'),
                onChange: onChangeDate,
                type: 'date',
              }}
          />
          <Output
              usd={usd.toFixed(2)}
          />
          <MyButton onClick={onClickSubmitBtn} type="button">Add operation</MyButton>
        </form>
        <OperationList
            items={items}
            onClickRemoveBtn={onClickRemoveBtn}
        />
      </div>
  );
}

export default App;
