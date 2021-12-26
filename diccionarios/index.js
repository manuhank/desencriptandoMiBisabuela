const fs = require("fs");
const { filterByExtension, removeExtension } = require("../utils/fileNames");

function Diccionario() {
  this.palabras = [];
  this.diccionarioCargado;
  this.index = [];
  this.disponibles = fs
    .readdirSync(`${__dirname}/archivos/`)
    .filter(filterByExtension("txt"))
    .map(removeExtension);
  this.cacheFiles = fs
    .readdirSync(`${__dirname}/cache`)
    .filter(filterByExtension("cache"))
    .map(removeExtension);

  this.cargar = ({
    diccionarioSeleccionado,
    sacarTildes = true,
    saveIndex,
    disableCache,
  }) => {
    if (diccionarioSeleccionado || diccionarioSeleccionado === 0) {
      const diccionarioACargar = isNaN(diccionarioSeleccionado)
        ? diccionarioSeleccionado
        : this.disponibles[diccionarioSeleccionado];
      if (diccionarioACargar) {
        (!disableCache && this._cargarCache({ diccionarioACargar })) ||
          this._cargar({ diccionarioACargar, sacarTildes }) ||
          (saveIndex && this._cachear());
      }
    }
    return this;
  };

  this._cachear = () => {
    this.palabras.forEach((palabra) => {
      const largoPalabra = palabra.length;
      const caracteresPalabra = new Set(palabra).size;
      if (!this.index[largoPalabra]) this.index[largoPalabra] = [];
      if (!this.index[largoPalabra][caracteresPalabra])
        this.index[largoPalabra][caracteresPalabra] = [];
      this.index[largoPalabra][caracteresPalabra].push(palabra);
    });
    fs.writeFileSync(
      `${__dirname}/cache/\\${this.diccionarioCargado}.cache`,
      JSON.stringify(({ index, palabras } = this))
    );
  };

  this._cargar = ({ diccionarioACargar, sacarTildes }) => {
    const dicFile = fs
      .readFileSync(`${__dirname}/archivos/${diccionarioACargar}.txt`)
      .toString();
    const EOL = /\r/.test(dicFile) ? "\r\n" : "\n";
    this.palabras = dicFile.split(EOL);

    this.palabras = [
      ...new Set(
        this.palabras.map((palabra) => {
          if (sacarTildes)
            palabra = palabra
              .replace(/á/gi, "a")
              .replace(/é/gi, "e")
              .replace(/í/gi, "i")
              .replace(/ó/gi, "o")
              .replace(/ú/gi, "u")
              .replace(/ü/gi, "u");
          return palabra.toLowerCase();
        })
      ),
    ];
    this.diccionarioCargado = diccionarioACargar;
  };

  this._cargarCache = ({ diccionarioACargar }) => {
    if (this.cacheFiles.includes(diccionarioACargar)) {
      Object.assign(
        this,
        JSON.parse(fs.readFileSync(`${__dirname}/cache/${diccionarioACargar}.cache`))
      );
      this.diccionarioCargado = diccionarioACargar;
      return true;
    } else return false;
  };
}

module.exports = { Diccionario };
