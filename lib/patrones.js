function componerPatron(patron, letras) {
    //esta funcion toma un patron alfanumerico normalizado (con rango iniciado en 0 y ordenado)
    //y un listado de las letras en x palabra, devuelve como quedaria esa palabra si estubiera
    //compuesto por el patron para que otra funcion chequee si coinciden.
    letras = letras.filter(letra => !patron.includes(letra));
    return patron.map(caracter => (isNaN(caracter) ? caracter : letras[caracter])).join("");
  }
  
  function normalizarRango(patron) {
    //recive un patron de strings y devuelve otro con int ordenados e iniciados en 0 + letras
    const indice = [];
    return patron.map(caracter => {
      if (isNaN(caracter)) return caracter;
      if (!indice.includes(caracter)) indice.push(caracter);
      return indice.indexOf(caracter);
    });
  }
  
  module.exports = function chequear(patron, palabra) {
    patron = normalizarRango(patron);
    const numerosEnPatron = patron.filter(caracter => !isNaN(caracter));
    if (patron.length == palabra.length) {
      const letrasPalabra = [...new Set(palabra)];
      if (letrasPalabra.length > Math.max(...numerosEnPatron))
        return palabra == componerPatron(patron, letrasPalabra);
    } else return false;
  }