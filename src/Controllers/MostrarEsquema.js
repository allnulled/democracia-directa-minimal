const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/MostrarEsquema";
    
    getMiddleware() {
        return [];
    }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.MostrarEsquema");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const schema = this.api.Database.Schema;
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "El esquema se muestra correctamente",
                esquema: schema
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

};