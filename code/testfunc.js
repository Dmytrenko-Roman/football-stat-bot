'use strict';

const Time = text => {
  const cut = text.substr(0, 2);
  const cutend = text.substr(2, 4);
  return {cut, cutend};
}

console.log(Time('20:30'));