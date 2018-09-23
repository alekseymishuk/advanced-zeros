module.exports = function getZerosCount(number, base) {
  let zerosCount = number;
  (getSimpleFactors(base) || []).forEach(it => {
    let division = Math.floor(getDivision(number, 1, it.value) / it.power);
    zerosCount = division < zerosCount ? division : zerosCount;
    return it;
  });
  return zerosCount;

}

function getDivision(number, power, multiple) {
  const delimeter = Math.pow(multiple, power);
  return number > delimeter ? 
    Math.floor(number / delimeter) + getDivision(number, ++power, multiple)
    : Math.floor(number / delimeter);
}

function getSimpleFactors(number) {
  let factors = [];
  let currentSimple = 2;
  
  while(number !== 1) {
    let power = 0;
    while (number / currentSimple !== Math.floor(number / currentSimple)) {
      currentSimple = getSimple(currentSimple);
    }
    while(number / currentSimple === Math.floor(number / currentSimple)) {
      power++;
      number = number / currentSimple;
    }
    factors.push({value: currentSimple, power});
    currentSimple = getSimple(currentSimple);
  }
  return factors;
}


function getSimple(prev) {
  let nextSimple = prev + 1;
  while(!isSimple(nextSimple)) nextSimple++;
  return nextSimple;
}

function isSimple(number) {
  if (number === 2) return true;
  for(let i = 2; i < Math.floor(number / 2); i++) {
    if (number / i !== Math.floor(number / i)) continue;
    return false;
  }
  return true;
}
