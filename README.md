# Desencriptando a mi bisabuela
Bienvenid@ al codigo de la charla *Desencriptando a mi bisabuela*

## Setup
1. Clona el repositorio `git clone https://github.com/manuhank/desencriptandoMiBisabuela.git`
2. Ingresa a la carpeta `cd desencriptandoMiBisabuela`
3. Corre el programa con `node .` o `npm start`.

> El codigo no tiene dependencias, por lo cual **NO** es necesario correr `npm install`

## Uso

### Patrones
Un texto a decodificar necesita ser ingresado de la sieuignete manera:
1. Cada caracter debe tener asignado un numero y los caracteres de una misma palabra deben estar separados por una comas.
Por ejemplo `ϪϛϟϡϪ  => 1,2,3,4,1`. No es necesario que los numeros sigan ningún orden en particular:  `ϪϛϟϡϪ  => 10,5,7,1,12` tambien es valido.
2. Las palabras se ingresan separadas por espacio. 
Por ejemplo `ϪϛϟϡϪ ϧϕϥϝ  => 1,2,3,4,1 5,6,7,8`
3. Si se conoce el valor de un caracter, puede introducirse como letra.
Por ejemplo, si se sabe que `Ϫ = S` `ϪϛϟϡϪ  => S,2,3,4,S`

### Diccionarios
Un diccionario es una lista de palabras validas.
El codigo viene con 4 diccionarios:
1. Español (1.225.118 palabras)
2. Español_corto (80.393 palabras)
3. Ingles (370.101 palabras)
4. Ingles_corto (58.111 palabras)

Los diccionarios cortos permiten reducir el tiempo de computacion a expensas de encontrar menos resultados validos.
>Se pueden agregar palabras a los diccionarios añadiendola al archivo `.txt` dentro de la carpeta `diccionarios`. En caso de existir el archivo `.cache` de ese diccionario, se debe borrar.

### Parametros

#### -p
Para hacer mas facil el ingreso de patrones, los mismos se pueden guardar en un archivo `.txt` y luego pasarselos al programa mediante el parametro `-p`. Por ejemplo `node . -p ./"nota virginia"/patron.txt` abirra el patron de la nota de mi bisabuela

#### -d
Se puede preseleccionar el diccionario con el argumento `-d` seguido del numero del diccionario

#### -y
Se puede omitir la confirmación pasando el argumetno `-y`

