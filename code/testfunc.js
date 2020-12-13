'use strict';

const Time = text => {
  const cut = text.substr(0, 2);
  const cutend = text.substr(2, 4);
  const newtime = (+cut + 2).toString() + cutend;
  return newtime;
}

console.log(Time('20:30'));