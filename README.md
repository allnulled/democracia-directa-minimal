# express-boilerplate

Código fuente base para servidores basados en Node.js + Express + SQLite.

## Índice

- [express-boilerplate](#express-boilerplate)
  - [Índice](#índice)
  - [Instalación](#instalación)
  - [Ejecución](#ejecución)
  - [Filosofía](#filosofía)
  - [Uso](#uso)
    - [Crear un controlador](#crear-un-controlador)
    - [Crear una utilidad](#crear-una-utilidad)
    - [Crear un modelo de dato](#crear-un-modelo-de-dato)
    - [Crear un comando](#crear-un-comando)
    - [Crear una configuración](#crear-una-configuración)
  - [¿Qué más ofrece el boilerplate?](#qué-más-ofrece-el-boilerplate)

## Instalación

Descarga el proyecto y ejecuta `npm install` para instalar las dependencias.

## Ejecución

Para ejecutarlo simplemente `npm start`.

## Filosofía

Este proyecto es completamente **minimalista**.

La ejecución se basa prácticamente en 1 fichero:
  - `src/main.js`: define el proceso principal.

Los datos se basan en 2 ficheros más:
  - `src/Database/scripts/creation.sql`
  - `src/Database/scripts/migration.sql`

Además, en el código original, la base de datos es SQLite, por lo cual es un proyecto compacto, que no depende de URLs/servidores externos.

## Uso

A continuación se detallan los procesos de desarollo siguientes:

  1. [Crear un controlador](#crear-un-controlador).
  2. [Crear una utilidad](#crear-una-utilidad).
  3. [Crear un modelo de dato](#crear-un-modelo-de-dato).
  4. [Crear un comando](#crear-un-comando).
  5. [Crear una configuración](#crear-una-configuración).

### Crear un controlador

En `src/Controllers` puedes crear un fichero como éste, que es el de `IndexController`:

```js
module.exports = class {
    method = "use";
    route = "/";
    getMiddleware() { return []; }
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.IndexController");
        try {
            const errorParameter = this.api.Utilities.GetRequestParameter(request, "error", false);
            if(typeof errorParameter === "string") {
                throw new Error(errorParameter);
            }
            const db = this.api.Utilities.GetDatabaseConnection();
            const [{ Result: result }] = await db.Execute("SELECT 100 as 'Result';");
            const [{ Result: result2 }] = await this.api.Utilities.QueryDatabase("SELECT 200 as 'Result';");
            return this.api.Utilities.DispatchSuccess(response, {
                message: "The API is working",
                result: result + result2
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }
};
```

La `api` (con `Utilities`) se inyecta en todas las clases de controlador, una vez instanciado. También se recibe como parámetro en el `constructor`.

### Crear una utilidad

En `src/Utilities` puedes crear un fichero como éste:

```js
module.exports = class {
    action() {
        this.api.Utilities.Trace("api.Utilities.GetDatabaseConnection");
        return this.api.Database.Connection;
    }
}
```

Esta utilidad es una `action`, pero también puedes crear una utilidad `factory` simplemente escribiendo el método `factory` (y no `action`) a modo de *factory* propiamente, o fábrica del valor final de la utilidad.

La `api` (con `Utilities`) se inyecta en todas las clases de utilidad, una vez instanciada. También se recibe como parámetro en el `constructor`.

### Crear un modelo de dato

En `src/Database/scripts/creation.sql` añades la tabla de datos que deseas.

### Crear un comando

En `package.json` el apartado `scripts` te será de ayuda en esto. Los comandos se ejecutarían mediante `npm`.

### Crear una configuración

En `src/main.js` tienes la función `setupConfigurations`, donde se establecen los valores para las variables de entorno de `process.env`. Puedes añadrila ahí.

## ¿Qué más ofrece el boilerplate?

Unas pocas clases utilitarias:

 - Para homogeneizar las salidas y entradas JSON de los controladores: `DispatchSuccess` y `DispatchError`.
 - Para tratamiento de fechas y texto general: `GetDateFromString`, `GetDateToString`, `GetStringLeftPadded`.
 - Para bases de datos: `GetDatabaseConnection`, `InitializeDatabase`, `QueryDatabase`.
 - Para gestionar peticiones: `GetRequestParameter`.