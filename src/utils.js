export const formatDate = (stringDate, separation = '') => {
  const date = new Date(stringDate);
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yyyy = date.getFullYear();
  if (yyyy < 10) yyyy = '0' + yyyy;

  return (`${yyyy}${separation}${mm}${separation}${dd}`);
}
export const debounce = (cb, delay) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
