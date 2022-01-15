import MyInput from "./components/input/MyInput";
import {useEffect, useState} from "react";
import MyButton from "./components/button/MyButton";
import OperationList from "./components/list/OperationList";
import {nanoid} from "nanoid";

function App() {
  const [uah, setUah] = useState(0);
  const [course, setCourse] = useState(30);
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
  const onClickBtn = () => {
    setItems(prevState => [...prevState, {uah, course, usd, id: nanoid()}])
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
            label={'USD'}
            inputProps={{
              value: usd,
              onChange: onChangeCourse,
              type: 'text',
            }}
        />
        <MyButton onClick={onClickBtn} type="button">Add operation</MyButton>
      </form>
      <OperationList
          items={items}
      />
    </div>
  );
}

export default App;
