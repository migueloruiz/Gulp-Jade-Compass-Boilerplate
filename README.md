# Sitio Juegos Paralímpicos Rio 2016 #

## Archivos jade ##

Para compilar los archivos jade, seguir los siguientes pasos:

1. Colocarse en la carpeta "/paralimpicos/"
2. Escribir en la consola lo siguiente:
```
nodefront compile -w -r
```

## Archivos CSV ##

Para concatenar los archivos csv en un solo json, seguir los siguientes pasos:

1. Instalar paquetes con:
```
npm install
```

2. Colocarse en la carpeta "/paralimpicos/csv/"
3. Para convertir escribir en consola lo siguiente:
```
gulp csvConvert
```
4. Automaticamente se genera el archivo "agenda.json" en la carpeta json

## Librerías JS ##

Para juntar las librerías en un solo archivo **lib.min.js**, seguir los siguientes pasos:

1. Guardar todas las librerías deseadas en la carpeta "/paralimpicos/js/libs/"
2. Colocarse en la carpeta "/paralimpicos/js/libs/"
3. Escribir en consola lo siguiente:
```
cat * | uglifyjs -o ../lib.min.js
```

## Documentación de librerías usadas en este repositorio ##

1. [Moment JS](http://momentjs.com/)
2. [Twitter Post Fetcher](https://github.com/jasonmayes/Twitter-Post-Fetcher)
3. [XML to JSON](https://github.com/abdmob/x2js)
