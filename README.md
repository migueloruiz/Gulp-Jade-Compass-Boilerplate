SaticiWeb - Boilerplate
======================================================================

# Iniciar Servidor de Desarrollo
```
npm serve
```
este comando elimina la carpeta de distibucion *./dist* y ejecuta el comando *gulp default*, ek cual contrulle todo el proyecto

# Testing
```
npm test
```
Lanza revision de estilos de codigo de archivos js y lanza testing unitario

# Performans
```
sudo npm install -g lighthouse
```

# Lintern
Por default el boilertplate cuneta con listerns

* JS: se utiliza [Es Lint](http://eslint.org/) con la guia de estilos [Standar JS](https://standardjs.com/)

# Commits y Documentación

## Mensajes de Commit

La primera línea del mensaje debe ser una descripción corta (80 caracteres) pública de lo que ha logrado con el commit. Esto es importante porque es lo que aparece en el CHANGELOG del proyecto.

Si el commit hacer referencia a un error, se debe agregar el numero de referencia #0000 y el link al al issueTraker,  piensa cuidadosamente si necesita levantar error antes de hacer commit.

Deje una línea en blanco después de la primera línea.

Utilice listas en las líneas siguientes para explicar lo que logran sus cambios y, en particular, por qué ha utilizado su enfoque.

**ANTES DE HACER COMMIT ACTULIZA EL CHANGELOG.md**

Para tener un control del tipo de cambios de se utilizan iconos para definir el tipo de comit:

Commit Type | Emoji
----------  | -------------
Launch | :rocket: `:rocket:`
Initial Commit | :tada: `:tada:`
Version Tag | :bookmark: `:bookmark:`
New Feature | :sparkles: `:sparkles:`
Bugfix | :bug: `:bug:`
Metadata | :card_index: `:card_index:`
Refactoring | :recycle: `:recycle:`
Documentation | :books: `:books:`
Internationalization | :globe_with_meridians: `:globe_with_meridians:`
Performance | :racehorse: `:racehorse:`
Cosmetic | :lipstick: `:lipstick:`
Tooling | :wrench: `:wrench:`
Tests | :rotating_light: `:rotating_light:`
Deprecation | :poop: `:poop:`
Work In Progress (WIP) | :construction: `:construction:`
Other | [Be creative](http://www.emoji-cheat-sheet.com/)

E.g.
>:bug: update a gulp ([#292](http://linkAerror.com))
>
>- se actualiza la version de gulp en el package.json
>- se corrigen errores referentes a upgrade de gulp en gulpfile.js
