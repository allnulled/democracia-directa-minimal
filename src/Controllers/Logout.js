const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/Logout";
    
    getMiddleware() { return []; }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.Logout");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const tokenParameter = this.api.Utilities.GetRequestParameter(request, "authorization", false);
            if(typeof tokenParameter !== "string") {
                throw new Error("Se requiere parámetro «authorization» en el controlador «Logout»");
            }
            await this.getSessionByToken(tokenParameter);
            await this.deleteSessionByToken(tokenParameter);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La sesión fue cancelada correctamente",
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }
    
    async getSessionByToken(tokenParameter) {
        let sql = "";
        sql += "SELECT * FROM Sesion WHERE token = ";
        sql += sqlstring.escape(tokenParameter);
        sql += ";";
        const sesionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(sesionesCoincidentes.length === 0) {
            throw new Error("No se encontraron sesiones coincidentes con el token proporcionado en el controlador «Logout»");
        }
        return sesionesCoincidentes[0];
    }

    async deleteSessionByToken(tokenParameter) {
        let sql = "";
        sql += "DELETE FROM Sesion WHERE token = ";
        sql += sqlstring.escape(tokenParameter);
        sql += ";";
        return await this.api.Utilities.QueryDatabase(sql);
    }

};