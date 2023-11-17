const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/CrearVotacion";
    
    getMiddleware() { return []; }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.CrearVotacion");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            this.validateAuthentication(request);
            const parametrosValidados = this.getFormattedAndValidatedParameters(request);
            const idVotacion = await this.insertVotacion(parametrosValidados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La votación fue insertada correctamente",
                id: idVotacion
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    validateAuthentication(request) {
        if(request.DatosDeAutentificacion.permisos.filter(permiso => permiso.nombre === "permiso de administración").length === 0) {
            throw new Error("Se requiere permiso de autentificación en el controlador «CrearVotacion»");
        }
    }

    getFormattedAndValidatedParameters(request) {
        const presentacion = this.api.Utilities.GetRequestParameter(request, "presentacion", false);
        const fechaDePresentacion = this.api.Utilities.GetRequestParameter(request, "fecha_de_presentacion", false);
        const fechaDeProblemas = this.api.Utilities.GetRequestParameter(request, "fecha_de_problemas", false);
        const fechaDeSoluciones = this.api.Utilities.GetRequestParameter(request, "fecha_de_soluciones", false);
        const fechaDeImplementaciones = this.api.Utilities.GetRequestParameter(request, "fecha_de_implementaciones", false);
        const fechaDeAplicaciones = this.api.Utilities.GetRequestParameter(request, "fecha_de_aplicaciones", false);
        if(typeof presentacion !== "string") {
            throw new Error("Se requiere parámetro «presentacion» en el controlador «CrearVotacion»");
        }
        if(typeof fechaDePresentacion !== "string") {
            throw new Error("Se requiere parámetro «fecha_de_presentacion» en el controlador «CrearVotacion»");
        }
        if(typeof fechaDeProblemas !== "string") {
            throw new Error("Se requiere parámetro «fecha_de_problemas» en el controlador «CrearVotacion»");
        }
        if(typeof fechaDeSoluciones !== "string") {
            throw new Error("Se requiere parámetro «fecha_de_soluciones» en el controlador «CrearVotacion»");
        }
        if(typeof fechaDeImplementaciones !== "string") {
            throw new Error("Se requiere parámetro «fecha_de_implementaciones» en el controlador «CrearVotacion»");
        }
        if(typeof fechaDeAplicaciones !== "string") {
            throw new Error("Se requiere parámetro «fecha_de_aplicaciones» en el controlador «CrearVotacion»");
        }
        const fechaDePresentacionComoFecha = this.api.Utilities.GetDateFromString(fechaDePresentacion);
        const fechaDeProblemasComoFecha = this.api.Utilities.GetDateFromString(fechaDeProblemas);
        const fechaDeSolucionesComoFecha = this.api.Utilities.GetDateFromString(fechaDeSoluciones);
        const fechaDeImplementacionesComoFecha = this.api.Utilities.GetDateFromString(fechaDeImplementaciones);
        const fechaDeAplicacionesComoFecha = this.api.Utilities.GetDateFromString(fechaDeAplicaciones);
        if(fechaDePresentacionComoFecha >= fechaDeProblemasComoFecha) {
            throw new Error("Se requiere parámetro «fecha_de_presentacion» ser anterior a parámetro «fecha_de_problemas» en el controlador «CrearVotacion»");
        }
        if(fechaDeProblemasComoFecha >= fechaDeSolucionesComoFecha) {
            throw new Error("Se requiere parámetro «fecha_de_problemas» ser anterior a parámetro «fecha_de_soluciones» en el controlador «CrearVotacion»");
        }
        if(fechaDeSolucionesComoFecha >= fechaDeImplementacionesComoFecha) {
            throw new Error("Se requiere parámetro «fecha_de_soluciones» ser anterior a parámetro «fecha_de_implementaciones» en el controlador «CrearVotacion»");
        }
        if(fechaDeImplementacionesComoFecha >= fechaDeAplicacionesComoFecha) {
            throw new Error("Se requiere parámetro «fecha_de_implementaciones» ser anterior a parámetro «fecha_de_aplicaciones» en el controlador «CrearVotacion»");
        }
        return { presentacion, fechaDePresentacion, fechaDeProblemas, fechaDeSoluciones, fechaDeImplementaciones, fechaDeAplicaciones };
    }

    async insertVotacion(parametrosValidados) {
        const { presentacion, fechaDePresentacion, fechaDeProblemas, fechaDeSoluciones, fechaDeImplementaciones, fechaDeAplicaciones } = parametrosValidados;
        let sql = "";
        sql += "INSERT INTO Votacion (presentacion, estado, fecha_de_presentacion, fecha_de_problemas, fecha_de_soluciones, fecha_de_implementaciones, fecha_de_aplicaciones) VALUES (\n  ";
        sql += sqlstring.escape(presentacion);
        sql += ",\n  ";
        sql += sqlstring.escape("Presentación");
        sql += ",\n  ";
        sql += sqlstring.escape(fechaDePresentacion);
        sql += ",\n  ";
        sql += sqlstring.escape(fechaDeProblemas);
        sql += ",\n  ";
        sql += sqlstring.escape(fechaDeSoluciones);
        sql += ",\n  ";
        sql += sqlstring.escape(fechaDeImplementaciones);
        sql += ",\n  ";
        sql += sqlstring.escape(fechaDeAplicaciones);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        let sqlId = "";
        sqlId += "SELECT LAST_INSERT_ROWID() AS UltimoRegistro;";
        const id = await this.api.Utilities.QueryDatabase(sqlId);
        return id[0].UltimoRegistro;
    }

};