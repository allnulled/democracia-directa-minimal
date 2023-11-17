const sqlstring = require("sqlstring");

module.exports = class {

    async action(request, force = false) {
        this.api.Utilities.Trace("api.Utilities.AuthenticateRequest");
        const authorization = this.api.Utilities.GetRequestParameter(request, "authorization", false);
        if(typeof authorization !== "string") {
            if(force) {
                throw new Error("Se requiere parámetro «authorization» en la utilidad «AuthenticateRequest»");
            }
        }
        const sesion = await this.getSesion(authorization);
        const usuario = { id: sesion.id_usuario };
        const permisos = await this.getPermisosDeUsuario(sesion.id_usuario);
        const authentication = { sesion, usuario, permisos };
        request.DatosDeAutentificacion = authentication;
    }

    async getSesion(authorization) {
        let sql = "";
        sql += "SELECT * FROM Sesion";
        sql += "\n WHERE token = ";
        sql += sqlstring.escape(authorization);
        sql += ";";
        const sesionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(sesionesCoincidentes.length === 0) {
            throw new Error("No se encontraron sesiones coincidentes con los parámetros proporcionados en la utilidad «AuthenticateRequest»");
        }
        const sesion = sesionesCoincidentes[0];
        return sesion;
    }

    async getPermisosDeUsuario(idUsuario) {
        let sql = "";
        sql += "SELECT * FROM Permiso_de_usuario";
        sql += "\n WHERE id_usuario = ";
        sql += sqlstring.escape(idUsuario);
        sql += ";";
        const permisosDeUsuarioCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        const idsDePermisosCoincidentes = permisosDeUsuarioCoincidentes.map(permiso => permiso.id);
        let sql2 = "";
        sql2 += "SELECT * FROM Permiso";
        sql2 += "\n WHERE id IN (";
        for(let index=0; index<idsDePermisosCoincidentes.length; index++) {
          const idPermiso = idsDePermisosCoincidentes[index];
          if(index !== 0) {
            sql2 += ", ";
          }
          sql2 += sqlstring.escape(idPermiso);
        }
        sql2 += ");";
        const permisosCoincidentes = await this.api.Utilities.QueryDatabase(sql2);
        return permisosCoincidentes;
    }

};