function splitArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize)
    result.push(array.slice(i, i + chunkSize));
  return result;
}

module.exports = function (palabrasPotenciales, max = 500, min = 100) {
  const palabrasInicio = palabrasPotenciales[0].length;
  if (palabrasInicio > max) {
    const chunkSize = Math.ceil(palabrasInicio / max);
    return splitArray(
      palabrasPotenciales[0],
      chunkSize
    ).map((arrDePalabrasIniciales) => [
      arrDePalabrasIniciales,
      ...palabrasPotenciales.slice(1),
    ]);
  } else if (palabrasInicio < min) {
    let combinaciones = 1,
      cursor = 0;
    while (cursor < palabrasPotenciales.length && combinaciones < min)
      combinaciones = combinaciones * palabrasPotenciales[cursor++].length;
    const chunkSize = Math.ceil(combinaciones / min);
    const partialyExpandedArray = splitArray(
      palabrasPotenciales[cursor-1],
      chunkSize
    );
    const combinatoryArray = require("../utils/array-combinatory");
    const result = cursor
      ? combinaciones < max
        ? combinatoryArray(palabrasPotenciales.slice(0, cursor))
        : combinatoryArray([
            ...palabrasPotenciales.slice(0, cursor-1),
            partialyExpandedArray,
          ])
      : palabrasPotenciales;
    if (palabrasPotenciales.length > cursor + 1)
      return result.map((task) => [
        ...task,
        palabrasPotenciales.slice(cursor, palabrasPotenciales.length),
      ]);
    else return result;
  } else
    return palabrasPotenciales[0].map((palabraInicial) => [
      [palabraInicial],
      ...palabrasPotenciales.slice(1),
    ]);
};
const testInput = [5_000, 50, 200].map((i) =>
  new Array(3).fill().map((_) => new Array(i).fill(0))
);
const testOutput = testInput.map((test) => module.exports(test));
