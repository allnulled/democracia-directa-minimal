const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/CrearProblema";
    
    getMiddleware() { return []; }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.CrearProblema");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const parametrosFormateados = this.getFormattedParameters(request);
            const validacion = this.validateParameters(parametrosFormateados);
            const votacion = await this.validateEstadoDeVotacion(parametrosFormateados.idVotacion);
            const idProblema = await this.insertProblema(parametrosFormateados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "El problema fue creado correctamente",
                id: idProblema
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getFormattedParameters(request) {
        const titulo = this.api.Utilities.GetRequestParameter(request, "titulo", false);
        const descripcion = this.api.Utilities.GetRequestParameter(request, "descripcion", false);
        const contenido = this.api.Utilities.GetRequestParameter(request, "contenido", false);
        const idVotacion = this.api.Utilities.GetRequestParameter(request, "id_votacion", false);
        if(typeof titulo !== "string") {
            throw new Error("Se requiere parámetro «titulo» en el controlador «CrearProblema»");
        }
        if(typeof descripcion !== "string") {
            throw new Error("Se requiere parámetro «descripcion» en el controlador «CrearProblema»");
        }
        if(typeof contenido !== "string") {
            throw new Error("Se requiere parámetro «contenido» en el controlador «CrearProblema»");
        }
        if(typeof idVotacion !== "number") {
            throw new Error("Se requiere parámetro «id_votacion» ser número en el controlador «CrearProblema»");
        }
        return { titulo, descripcion, contenido, idVotacion };
    }

    validateParameters(parametros) {
        const { titulo, descripcion, contenido, idVotacion } = parametros;
        if(titulo.length === 0) {
            throw new Error("Se requiere parámetro «titulo» no estar vacío en el controlador «CrearProblema»");
        }
        if(descripcion.length === 0) {
            throw new Error("Se requiere parámetro «descripcion» no estar vacío en el controlador «CrearProblema»");
        }
        if(contenido.length === 0) {
            throw new Error("Se requiere parámetro «contenido» no estar vacío en el controlador «CrearProblema»");
        }
        if(idVotacion.length === 0) {
            throw new Error("Se requiere parámetro «id_votacion» no estar vacío en el controlador «CrearProblema»");
        }
    }

    async validateEstadoDeVotacion(idVotacion) {
        let sql = "";
        sql += "SELECT * FROM Votacion WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontró ninguna votación con el «id_votacion» proporcionado en el controlador «CrearProblema»");
        }
        const votacion = votacionesCoincidentes[0];
        if(votacion.estado !== "Problemas") {
            throw new Error("No se puede crear problema porque la votación proporcionada no está actualmente en el estado de «Problemas» en el controlador «CrearProblema»")
        }
        return true;
    }

    async insertProblema(parametros) {
        const { titulo, descripcion, contenido, idVotacion } = parametros;
        let sql = "";
        sql += "INSERT INTO Problema (titulo, descripcion, contenido, id_votacion) VALUES (\n  ";
        sql += sqlstring.escape(titulo);
        sql += ",\n  ";
        sql += sqlstring.escape(descripcion);
        sql += ",\n  ";
        sql += sqlstring.escape(contenido);
        sql += ",\n  ";
        sql += sqlstring.escape(idVotacion);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        const [{ UltimoRegistro: id }] = await this.api.Utilities.QueryDatabase("SELECT LAST_INSERT_ROWID() AS UltimoRegistro;");
        return id;
    }

};