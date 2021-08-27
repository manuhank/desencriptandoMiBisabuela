const readline = require("readline");

module.exports = {
  preguntar: (pregunta) =>
    new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(pregunta, (respuesta) => {
        rl.close();
        resolve(respuesta);
      });
    }),

  listar: ({ titulo, lista, numerar }) => {
    if (titulo) console.log(titulo);
    lista.forEach((str, i) => console.log(numerar ? `${i + 1}) ${str}` : str));
  },

  barraProgreso: function (opciones) {
    Object.assign(this, ({ longitudBarra, pasos } = opciones));
    this.espacio = Math.round((this.longitudBarra - 4) / 2);
    console.log(
      "0% ".padEnd(this.espacio) + "50% ".padEnd(this.espacio) + "100%"
    );
    this.incremento = this.longitudBarra / this.pasos;
    this.progreso = 0;
    this.avanzar = (fraccion = 1) => {
      this.progreso += this.incremento * fraccion;
      while (this.progreso >= 1) {
        process.stdout.write("=");
        this.progreso--;
      }
    };
  },

  argumentos: process.argv
    .slice(2)
    .reduce((objectArgs, value, i, arrayOfArgs) => {
      if (value[0] === "-")
        objectArgs[value.slice(1)] =
          arrayOfArgs.length > i + 1 && arrayOfArgs[i + 1][0] !== "-"
            ? arrayOfArgs[i + 1]
            : true;
      return objectArgs;
    }, {}),
};
