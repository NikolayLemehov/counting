import {useEffect, useState} from 'react';
import axios from "axios";
import {formatDate} from "../utils";

const URL = process.env.REACT_APP_NBU_COURSE
const useFetchCourse = (debouncedDate, debouncedAuthCourse) => {
  const [remoteCourse, setRemoteCourse] = useState(30);
  const [isLoading, setIsLoading] = useState(false);



  const fetchCourse = async () => {
    if (!debouncedAuthCourse) {
      return;
    }
    setIsLoading(true)
    const res = await axios.get(`${URL}?valcode=USD&date=${formatDate(debouncedDate)}&json`)
    if (res.status === 200) {
      setRemoteCourse(res.data[0].rate)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchCourse();
  }, [debouncedDate, debouncedAuthCourse]) // eslint-disable-line react-hooks/exhaustive-deps
  return [remoteCourse, isLoading, setRemoteCourse];
};

export default useFetchCourse;