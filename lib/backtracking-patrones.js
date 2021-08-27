module.exports = function (
    palabrasEnPatron = [],
    palabrasPotenciales = [],
    validar,
    callbacks = {}
  ) {
    const nPalabrasEnPatron = palabrasEnPatron.length;
    if (nPalabrasEnPatron < 2) return palabrasPotenciales[0];

    const cursoresListas = new Array(nPalabrasEnPatron).fill(0),
      longitudListas = palabrasPotenciales.map((arr) => arr.length),
      oracionTest = [],
      patronTest = [],
      posiblesSoluciones = [];
    let cursorOracion = 0;

    while (cursoresListas[0] < longitudListas[0]) {
      oracionTest[cursorOracion] =
        palabrasPotenciales[cursorOracion][cursoresListas[cursorOracion]];
      patronTest[cursorOracion] = palabrasEnPatron[cursorOracion];
      if (!cursorOracion) {
        cursorOracion++;
        callbacks.siguiente?.();
        continue;
      }

      if (validar(patronTest.join(",").split(","), oracionTest.join(""))) {
        if (cursorOracion == nPalabrasEnPatron - 1)
          posiblesSoluciones.push(oracionTest.slice());
        else {
          cursorOracion++;
          continue;
        }
      }

      cursoresListas[cursorOracion]++;
      //retroseso de cursor
      while (cursoresListas[cursorOracion] == longitudListas[cursorOracion]) {
        oracionTest.pop();
        patronTest.pop();
        //evita que se reinicie el primer indice.
        if (cursorOracion) {
          cursoresListas[cursorOracion] = 0;
          cursorOracion--;
        }
        cursoresListas[cursorOracion]++;
      }
    }
    return posiblesSoluciones;
  }
