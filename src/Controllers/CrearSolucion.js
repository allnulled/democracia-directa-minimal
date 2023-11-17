const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/CrearSolucion";
    
    getMiddleware() { return []; }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.CrearSolucion");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const parametrosFormateados = this.getFormattedParameters(request);
            const validacion = this.validateParameters(parametrosFormateados);
            const votacion = await this.validateEstadoDeVotacion(parametrosFormateados.idVotacion);
            const concordanciaConProblema = await this.validateConcordanciaConProblema(parametrosFormateados.idProblema, parametrosFormateados.idVotacion);
            const idSolucion = await this.insertSolucion(parametrosFormateados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La solución fue creada correctamente",
                id: idSolucion
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
        const idProblema = this.api.Utilities.GetRequestParameter(request, "id_problema", false);
        if(typeof titulo !== "string") {
            throw new Error("Se requiere parámetro «titulo» en el controlador «CrearSolucion»");
        }
        if(typeof descripcion !== "string") {
            throw new Error("Se requiere parámetro «descripcion» en el controlador «CrearSolucion»");
        }
        if(typeof contenido !== "string") {
            throw new Error("Se requiere parámetro «contenido» en el controlador «CrearSolucion»");
        }
        if(typeof idVotacion !== "number") {
            throw new Error("Se requiere parámetro «id_votacion» ser un número en el controlador «CrearSolucion»");
        }
        if(typeof idProblema !== "number") {
            throw new Error("Se requiere parámetro «id_problema» ser un número en el controlador «CrearSolucion»");
        }
        return { titulo, descripcion, contenido, idVotacion, idProblema };
    }

    validateParameters(parametros) {
        const { titulo, descripcion, contenido, idVotacion, idProblema } = parametros;
        if(titulo.length === 0) {
            throw new Error("Se requiere parámetro «titulo» no estar vacío en el controlador «CrearSolucion»");
        }
        if(descripcion.length === 0) {
            throw new Error("Se requiere parámetro «descripcion» no estar vacío en el controlador «CrearSolucion»");
        }
        if(contenido.length === 0) {
            throw new Error("Se requiere parámetro «contenido» no estar vacío en el controlador «CrearSolucion»");
        }
        if(idVotacion <= 0) {
            throw new Error("Se requiere parámetro «id_votacion» ser un número entero en el controlador «CrearSolucion»");
        }
        if(idProblema <= 0) {
            throw new Error("Se requiere parámetro «id_problema» ser un número entero en el controlador «CrearSolucion»");
        }
    }

    async validateEstadoDeVotacion(idVotacion) {
        let sql = "";
        sql += "SELECT * FROM Votacion WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontró ninguna votación con el «id_votacion» proporcionado en el controlador «CrearSolucion»");
        }
        const votacion = votacionesCoincidentes[0];
        if(votacion.estado !== "Soluciones") {
            throw new Error("No se puede crear problema porque la votación proporcionada no está actualmente en el estado de «Soluciones» en el controlador «CrearSolucion»")
        }
        return true;
    }

    async validateConcordanciaConProblema(idProblema, idVotacion) {
        let sql = "";
        sql += "SELECT * FROM Problema WHERE id = ";
        sql += sqlstring.escape(idProblema);
        sql += ";";
        const problemasCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(problemasCoincidentes.length === 0) {
            throw new Error("No se encontró ningún problema con el «id_problema» proporcionado en el controlador «CrearSolucion»");
        }
        const problema = problemasCoincidentes[0];
        const idVotacionNumero = parseInt(idVotacion);
        if(problema.id_votacion !== idVotacionNumero) {
            throw new Error("No se puede crear problema porque «id_votacion» no coincide con la «problema.id_votacion» proporcionado en el controlador «CrearSolucion»")
        }
        return true;
    }

    async insertSolucion(parametros) {
        const { titulo, descripcion, contenido, idVotacion, idProblema } = parametros;
        let sql = "";
        sql += "INSERT INTO Solucion (titulo, descripcion, contenido, id_votacion, id_problema) VALUES (\n  ";
        sql += sqlstring.escape(titulo);
        sql += ",\n  ";
        sql += sqlstring.escape(descripcion);
        sql += ",\n  ";
        sql += sqlstring.escape(contenido);
        sql += ",\n  ";
        sql += sqlstring.escape(idVotacion);
        sql += ",\n  ";
        sql += sqlstring.escape(idProblema);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        const [{ UltimoRegistro: id }] = await this.api.Utilities.QueryDatabase("SELECT LAST_INSERT_ROWID() AS UltimoRegistro;");
        return id;
    }

};