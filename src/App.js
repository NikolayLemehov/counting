import MyInput from "./components/input/MyInput";
import {useEffect, useState} from "react";
import MyButton from "./components/button/MyButton";
import OperationList from "./components/list/OperationList";
import {nanoid} from "nanoid";
import Output from "./components/output/Output";

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
  const onClickRemoveBtn = (id) => {
    setItems(prevState => {
      const index = prevState.findIndex(it => it.id === id);
      if (index !== -1) {
        prevState.splice(index, 1)
      }
      return [...prevState];
    })
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
