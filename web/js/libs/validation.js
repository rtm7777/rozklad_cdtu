export let validateNumber = (event) => {
  let key = event.keyCode;
  if (event.ctrlKey || event.altKey ||
     (key > 47 && key < 58 && event.shiftKey === false) ||
     (key > 95 && key < 106) ||
     (key === 8) || (key === 9) ||
     (key > 34 && key < 41) || (key === 46)) {
    return;
  } else {
    event.preventDefault();
  }
};
