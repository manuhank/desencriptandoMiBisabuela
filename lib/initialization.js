const fs = require("fs");
const cli = require("../utils/cli");
const Diccionario = require("../diccionarios");
const chequear = require("./patrones");

async function loadPattern(commandLineLoadedPattern) {
  if (commandLineLoadedPattern) {
    try {
      var patronInicial = fs
        .readFileSync(commandLineLoadedPattern)
        .toString()
        .replace("\n", " ");
    } catch (error) {
      console.error("No se encuentra el archivo");
      var patronInicial = await cli.preguntar("patron: ");
    }
  } else {
    var patronInicial = await cli.preguntar("patron: ");
  }
  return patronInicial.replace(/  /gi, " ").split(" ");
}

async function loadDictionary(diccionarioSeleccionado) {
  const diccionario = new Diccionario();
  if (diccionarioSeleccionado > diccionario.disponibles.length)
    diccionarioSeleccionado = undefined;
  if (!diccionarioSeleccionado)
    cli.listar({
      titulo: "Estos son los diccionarios disponibles:",
      lista: diccionario.disponibles,
      numerar: true,
    });

  const seleccionDeDiccionario =
    (diccionarioSeleccionado ||
      (await cli.preguntar("¿cual desea utilizar? "))) - 1;
  console.log("Elegido: " + diccionario.disponibles[seleccionDeDiccionario]);
  diccionario.cargar({
    diccionario: seleccionDeDiccionario,
    sacarTildes: true,
    saveIndex: true,
  });
  return diccionario;
}

function createCandidates(palabrasPatrones, diccionario) {
  return palabrasPatrones.map((patron) =>
    diccionario.index[patron.split(",").length].filter((palabra) =>
      chequear(patron.split(","), palabra)
    )
  );
}
module.exports = {
  loadPattern,
  loadDictionary,
  createCandidates,
};
