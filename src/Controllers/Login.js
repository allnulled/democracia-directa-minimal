const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/Login";
    
    getMiddleware() {
        return [];
    }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.Login");
        try {
            const { nombre, contrasenya } = this.getLoginParameters(request);
            let sesionActiva = await this.getActiveSession(nombre, contrasenya);
            let token = undefined;
            if(sesionActiva === false) {
                token = await this.createActiveSession(nombre, contrasenya);
                sesionActiva = await this.getActiveSession(nombre, contrasenya);
            } else {
                token = sesionActiva.token;
            }
            const permisos = await this.getPermisosByIdUsuario(sesionActiva.id_usuario);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La sesión fue iniciada correctamente",
                sesion: { token },
                permisos
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getLoginParameters(request) {
        const nombre = this.api.Utilities.GetRequestParameter(request, "nombre", false);
        const contrasenya = this.api.Utilities.GetRequestParameter(request, "contrasenya", false);
        if(typeof nombre !== "string") {
            throw new Error("Se requiere parámetro «nombre» en el controlador «Login»");
        }
        if(typeof contrasenya !== "string") {
            throw new Error("Se requiere parámetro «contrasenya» en el controlador «Login»");
        }
        return { nombre, contrasenya };
    }

    async getActiveSession(nombre, contrasenya) {
        const usuario = await this.getUserByNameAndPassword(nombre, contrasenya);
        let sql = "";
        sql += "SELECT * FROM Sesion WHERE id_usuario = ";
        sql += sqlstring.escape(usuario.id);
        sql += ";";
        const sesionesActivas = await this.api.Utilities.QueryDatabase(sql);
        if(sesionesActivas.length) {
            return sesionesActivas[0];
        }
        return false;
    }

    async createActiveSession(nombre, contrasenya) {
        const usuario = await this.getUserByNameAndPassword(nombre, contrasenya);
        const nuevoToken = this.api.Utilities.GetRandomString(99);
        let sql = "";
        sql += "INSERT INTO Sesion (id_usuario, token) VALUES (";
        sql += sqlstring.escape(usuario.id);
        sql += ",";
        sql += sqlstring.escape(nuevoToken);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        return nuevoToken;
    }

    async getUserByNameAndPassword(nombre, contrasenya) {
        let sql = "";
        sql += "SELECT * FROM Usuario WHERE nombre = ";
        sql += sqlstring.escape(nombre);
        sql += "\n AND contrasenya = ";
        sql += sqlstring.escape(contrasenya);
        sql += ";";
        const usuariosCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(usuariosCoincidentes.length === 0) {
            throw new Error("No se encontró usuario coincidente con nombre «" + nombre + "» y la contraseña proporcionada");
        }
        return usuariosCoincidentes[0];
    }

    async getPermisosByIdUsuario(id_usuario) {
        let sql1 = "";
        sql1 += "SELECT * FROM Permiso_de_usuario\n WHERE id_usuario = ";
        sql1 += sqlstring.escape(id_usuario)
        sql1 += ";";
        const permisosDeUsuario = await this.api.Utilities.QueryDatabase(sql1)
        const idsDePermisosDeUsuario = permisosDeUsuario.reduce((salida, permisoDeUsuario) => {
            if(salida.indexOf(permisoDeUsuario.id_permiso) === -1) {
                salida.push(permisoDeUsuario.id_permiso);
            }
            return salida;
        }, []);
        if(idsDePermisosDeUsuario.length === 0) {
            return [];
        }
        let sql2 = "";
        sql2 += "SELECT * FROM Permiso\n WHERE id IN (";
        for(let index=0; index<idsDePermisosDeUsuario.length; index++) {
          const idDePermisoDeUsuario = idsDePermisosDeUsuario[index];
          if(index !== 0) {
            sql2 += ", ";
          }
          sql2 += sqlstring.escape(idDePermisoDeUsuario)
        }
        sql2 += ")";
        const permisos = await this.api.Utilities.QueryDatabase(sql2);
        return permisos;
    }

};