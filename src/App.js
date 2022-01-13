import './App.css';
import MyInput from "./components/input/MyInput";
import {useState} from "react";

function App() {
  const [grn, setGrn] = useState(0);
  const [course, setCourse] = useState(30);
  const onChangeGrn = (e) => {
    setGrn(e.target.value);
  }
  const onChangeCourse = (e) => {
    setCourse(e.target.value);
  }
  return (
    <div className="App container">
      <h1>Counting</h1>
      <form>
        <MyInput
            value={grn}
            onChange={onChangeGrn}
            type="text"
            label={{text: 'Гривна'}}
        />
        <MyInput
            value={course}
            onChange={onChangeCourse}
            type="text"
            label={{text: 'Курс'}}
        />
        <MyInput
            value={grn / course}
            type="text"
            readOnly
            label={{text: 'Доллары'}}
        />
      </form>
    </div>
  );
}

export default App;
