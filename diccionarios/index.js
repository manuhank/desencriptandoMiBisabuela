const fs = require("fs");

module.exports = function () {
  this.palabras;
  this.diccionarioCargado;
  this.index = [];
  this.archivos = fs.readdirSync(__dirname);
  this.disponibles = this.archivos
    .filter((nombreArchivo) => nombreArchivo.match(/.+\.txt$/))
    .map((nombreArchivo) => nombreArchivo.slice(0, -4));

  this.cargar = ({ diccionario, sacarTildes, saveIndex, disableCache }) => {
    if (diccionario || diccionario === 0) {
      
      this.diccionarioCargado = isNaN(diccionario)
        ? diccionario
        : this.disponibles[diccionario];

      if (
        !disableCache &&
        this.archivos.includes(this.diccionarioCargado + ".cache")
      ) {
        console.log("cargado de chache");
        Object.assign(
          this,
          JSON.parse(
            fs.readFileSync(`${__dirname}/${this.diccionarioCargado}.cache`)
          )
        );
      } else {
        console.log("sin cache");
        const dicFile = fs
          .readFileSync(`${__dirname}/${this.diccionarioCargado}.txt`)
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
        this.palabras.forEach((palabra) => {
          const largoPalabra = palabra.length;
          const caracteresPalabra = new Set(palabra).size;
          if (!this.index[largoPalabra]) this.index[largoPalabra] = [];
          if (!this.index[largoPalabra][caracteresPalabra])
            this.index[largoPalabra][caracteresPalabra] = [];
          this.index[largoPalabra][caracteresPalabra].push(palabra);
        });
        if (saveIndex)
          fs.writeFileSync(
            `${__dirname}\\${this.diccionarioCargado}.cache`,
            JSON.stringify(({ index, palabras } = this))
          );
      }
    } else this.palabras = null;

    return this;
  };
};
