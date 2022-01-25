import {useState} from "react";
import {formatDate} from "../utils";

const setValueByType = (e) => {
  const {type, value, checked} = e.target;
  switch (type) {
    case 'date':
      return formatDate(value, '-');
    case 'checkbox':
      return checked;
    default:
      return value;
  }
}

export const useForm = (byHash, byId) => {
  const [byHashValues, setByHashValues] = useState(() => {
    const newByHashValues = {};
    byId.forEach(id => {
      newByHashValues[id] = byHash[id]
    })
    return newByHashValues
  });

  const onFieldChange = (e) => {
    const newByHashValues = {...byHashValues}
    newByHashValues[e.target.name].value = setValueByType(e);
    setByHashValues(newByHashValues)
  }

  const getSubmitData = () => ({
    uah: byHashValues.uah.value,
    date: byHashValues.date.value,
    course: byHashValues.course.value,
  })
  return [byHashValues, onFieldChange, getSubmitData, setByHashValues];
}
