import MyInput from "./components/input/MyInput";
import {useEffect, useState} from "react";
import MyButton from "./components/button/MyButton";
import OperationList from "./components/list/OperationList";
import {nanoid} from "nanoid";
import Output from "./components/output/Output";
import {formatDate} from "./utils";

function App() {
  const [uah, setUah] = useState(0);
  const [course, setCourse] = useState(30);
  const [date, setDate] = useState(new Date());
  const [usd, setUsd] = useState(() => (uah / course));
  const [items, setItems] = useState([]);

  useEffect(() => {
    setUsd(uah / course)
  }, [uah, course])

  const onChangeUah = (e) => {
    setUah(e.target.value);
  }
  const onChangeCourse = (e) => {
    setCourse(e.target.value);
  }
  const onChangeDate = (e) => {
    setDate(new Date(e.target.value));
  }
  const onClickBtn = () => {
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
  const onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      onClickBtn();
    }
  }

  return (
    <div className='container'>
      <h1>Counting</h1>
      <form>
        <MyInput
            label={'UAH'}
            inputProps={{
              value: uah,
              onChange: onChangeUah,
              onKeyPress,
              type: 'text',
            }}
        />
        <MyInput
            label={'Course'}
            inputProps={{
              value: course,
              onChange: onChangeCourse,
              type: 'text',
            }}
        />
        <MyInput
            label={'Date'}
            inputProps={{
              value: formatDate(date),
              onChange: onChangeDate,
              type: 'date',
            }}
        />
        <Output
            usd={usd.toFixed(2)}
        />
        <MyButton onClick={onClickBtn} type="button">Add operation</MyButton>
      </form>
      <OperationList
          items={items}
          onClickRemoveBtn={onClickRemoveBtn}
      />
    </div>
  );
}

export default App;
