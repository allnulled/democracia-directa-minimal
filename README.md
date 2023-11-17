# democracia-directa-minimal

Software libre de organización civil por método asambleario. 

## Requisitos

Para hacer funcionar este software necesitas tener instalado:

- `npm` y `node` que puedes conseguir los 2 a la vez de su fuente oficial aquí:
   - [https://nodejs.org/en/download](https://nodejs.org/en/download)
- `git`, que es opcional y solo se usa para la descarga del proyecto.

## Instalación

Descarga y descomprime el proyecto en una carpeta. O también puedes usar `git` tal que así:

```sh
git clone https://github.com/allnulled/democracia-directa-minimal.git .
```

Después, necesitarás `npm` para poder instalar todas las dependencias de `node_modules` así:

```sh
npm install
```

## Arranque

Para arrancar también necesitarás `npm` y `node`. Una vez los tengas disponibles desde línea de comandos, puedes:

```sh
npm start
```

Luego puedes entrar así con Firefox, por ejemplo, desde línea de comandos:

```
firefox http://127.0.0.1:5054/ui
```

## Filosofía

Este software sirve para organizar comunidades basándose en votaciones. El software contempla los siguientes pasos:

 - **Fase problemas:**
   - La creación de problemas.
   - La votación de problemas (a favor, en contra o indiferente).
 - **Fase de soluciones:**
   - La creación de soluciones.
   - La votación de soluciones (a favor, en contra o indiferente).
 - **Fase de implementaciones:**
   - La creación de implementaciones (de solución).
   - La votación de implementaciones (a favor, en contra o indiferente).

También existe un mecanismo para cada una de las siguientes operaciones:
  
  - **Crear una nueva votación.**
  - **Hacer progresar el estado de una votación.**
  - **Consultar votaciones, problemas, soluciones e implementaciones actuales.**

Con todo esto, este software pretende cumplir con la finalidad de organizar la voluntad de una comunidad igualitaria, tanto creando propuestas como votándolas.

## Uso

Por defecto, hay 2 usuarios en el sistema:
  - `admin` (contraseña: `admin`)
  - `noadmin` (contraseña: `noadmin`)

Utilízalos para organizarte una comunidad de usuarios, luego cambia las contraseñas para hacerlas seguras utilizando algún software para acceder a la base de datos `sqlite` (como por ejemplo *DB Browser for SQLite* en Linux).

A continuación se listan las operaciones que este software sí contempla:

  - Navegar por votaciones, problemas, soluciones e implementaciones.
  - Crear nuevos problemas, soluciones e implementaciones.
  - Votar a favor, en contra y retirar voto de problemas, soluciones e implementaciones.
  - Crear nuevas votaciones (solo administradores).
  - Hacer progresar el estado de las votaciones (solo administradores).

A continuación se listas las operaciones que este software no contempla actualmente:

  - **Crear un usuario.** No hay un mecanismo de registro público. Cada nuevo usuario debe ser introducido a la base de datos directamente. Esto asegura el hermetismo de la comunidad, así como el ahuyentar trolls que pueden fastidiarlo todo bien rápidamente (inflándolo de propuestas *fake* que ensucien los datos y ofusquen las buenas propuestas, consumiendo tiempo del resto de miembros de la comunidad en filtrar las propuestas *fake*). De habilitarse en un futuro, el registro seguiría sin estar en manos del usuario final, y en cambio sería un proceso que le correspondería al administrador.


  