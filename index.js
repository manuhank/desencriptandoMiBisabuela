const cli = require("./utils/cli");

const {
  loadPattern,
  loadDictionary,
  createCandidates,
} = require("./lib/initialization");
const multiThreaded = require("./lib/multi-threader");

(async () => {
  const {p:patronSeleccionado, d:diccionarioSeleccionado, y} = cli.argumentos;
  const palabrasPatrones = await loadPattern(patronSeleccionado);
  const diccionario = await loadDictionary(diccionarioSeleccionado);
  //construye lista de palabras candidatas para cada patron
  const palabrasPotenciales = createCandidates(palabrasPatrones, diccionario);

  //enunciar faltantes
  for (i in palabrasPatrones) {
    if (!palabrasPotenciales[i].length)
      console.log(`${palabrasPatrones[i]} no tiene coincidencias`);
  }
  const cantidadMaximaCombinaciones = palabrasPotenciales.reduce(
    (result, item) => result * item.length,
    1
  );
  console.log(
    `Podrian llegar a tener que realizarse ${cantidadMaximaCombinaciones} testeos.`
  );
  if ( !y &&
    !["si", "y", "yes"].includes(
      (await cli.preguntar("desea continuar? si/no ")).toLowerCase()
    )
  )
    process.exit();

  const barraProgreso = new cli.barraProgreso({
    pasos: palabrasPotenciales[0].length,
    longitudBarra: 60,
  });

  const finalizado = (posiblesSoluciones) => {
    console.log();
    console.timeEnd("total");
    if (posiblesSoluciones.length)
      cli.listar({
        titulo: "resultados posibles:",
        lista: posiblesSoluciones.map((oracion) => oracion.join(" ")),
        numerar: true,
      });
    else console.log("ninguna coincide");
  };
  console.time("total");
  multiThreaded(palabrasPatrones, palabrasPotenciales, {
    finalizado,
    progreso: barraProgreso.avanzar,
  });
})();
