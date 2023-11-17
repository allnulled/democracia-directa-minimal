const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/CrearImplementacion";
    
    getMiddleware() { return []; }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.CrearImplementacion");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const parametrosFormateados = this.getFormattedParameters(request);
            const validacion = this.validateParameters(parametrosFormateados);
            const votacion = await this.validateEstadoDeVotacion(parametrosFormateados.idVotacion);
            const concordanciaConProblema = await this.validateConcordanciaConProblema(parametrosFormateados.idProblema, parametrosFormateados.idVotacion);
            const idImplementacion = await this.insertImplementacion(parametrosFormateados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La implementación fue creada correctamente",
                id: idImplementacion
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
        const idSolucion = this.api.Utilities.GetRequestParameter(request, "id_solucion", false);
        if(typeof titulo !== "string") {
            throw new Error("Se requiere parámetro «titulo» en el controlador «CrearImplementacion»");
        }
        if(typeof descripcion !== "string") {
            throw new Error("Se requiere parámetro «descripcion» en el controlador «CrearImplementacion»");
        }
        if(typeof contenido !== "string") {
            throw new Error("Se requiere parámetro «contenido» en el controlador «CrearImplementacion»");
        }
        if(typeof idVotacion !== "number") {
            throw new Error("Se requiere parámetro «id_votacion» ser un número en el controlador «CrearImplementacion»");
        }
        if(typeof idProblema !== "number") {
            throw new Error("Se requiere parámetro «id_problema» ser un número en el controlador «CrearImplementacion»");
        }
        if(typeof idSolucion !== "number") {
            throw new Error("Se requiere parámetro «id_solucion» ser un número en el controlador «CrearImplementacion»");
        }
        return { titulo, descripcion, contenido, idVotacion, idProblema, idSolucion };
    }

    validateParameters(parametros) {
        const { titulo, descripcion, contenido, idVotacion, idProblema, idSolucion } = parametros;
        if(titulo.length === 0) {
            throw new Error("Se requiere parámetro «titulo» no estar vacío en el controlador «CrearImplementacion»");
        }
        if(descripcion.length === 0) {
            throw new Error("Se requiere parámetro «descripcion» no estar vacío en el controlador «CrearImplementacion»");
        }
        if(contenido.length === 0) {
            throw new Error("Se requiere parámetro «contenido» no estar vacío en el controlador «CrearImplementacion»");
        }
        if(idVotacion <= 0) {
            throw new Error("Se requiere parámetro «id_votacion» ser un número entero en el controlador «CrearImplementacion»");
        }
        if(idProblema <= 0) {
            throw new Error("Se requiere parámetro «id_problema» ser un número entero en el controlador «CrearImplementacion»");
        }
        if(idSolucion <= 0) {
            throw new Error("Se requiere parámetro «id_solucion» ser un número entero en el controlador «CrearImplementacion»");
        }
    }

    async validateEstadoDeVotacion(idVotacion) {
        let sql = "";
        sql += "SELECT * FROM Votacion WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontró ninguna votación con el «id_votacion» proporcionado en el controlador «CrearImplementacion»");
        }
        const votacion = votacionesCoincidentes[0];
        if(votacion.estado !== "Implementaciones") {
            throw new Error("No se puede crear problema porque «id_votacion» no está actualmente en el estado de «Implementaciones» en el controlador «CrearImplementacion»")
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
            throw new Error("No se encontró ningún problema con el «id_problema» proporcionado en el controlador «CrearImplementacion»");
        }
        const problema = problemasCoincidentes[0];
        const idVotacionNumero = parseInt(idVotacion);
        if(problema.id_votacion !== idVotacionNumero) {
            throw new Error("No se puede crear solución porque «id_votacion» no coincide con el «problema.id_votacion» proporcionado en el controlador «CrearImplementacion»")
        }
        return true;
    }

    async validateConcordanciaConSolucion(idSolucion, idProblema, idVotacion) {
        let sql = "";
        sql += "SELECT * FROM Solucion WHERE id = ";
        sql += sqlstring.escape(idSolucion);
        sql += ";";
        const solucionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(solucionesCoincidentes.length === 0) {
            throw new Error("No se encontró ninguna solución con el «id_solucion» proporcionado en el controlador «CrearImplementacion»");
        }
        const solucion = solucionesCoincidentes[0];
        const idProblemaNumero = parseInt(idProblema);
        const idVotacionNumero = parseInt(idVotacion);
        if(solucion.id_votacion !== idVotacionNumero) {
            throw new Error("No se puede crear solución porque «id_votacion» no coincide con el «solucion.id_votacion» proporcionado en el controlador «CrearImplementacion»")
        }
        if(solucion.id_problema !== idProblemaNumero) {
            throw new Error("No se puede crear solución porque «id_problema» no coincide con el «solucion.id_problema» proporcionada en el controlador «CrearImplementacion»")
        }
        return true;
    }

    async insertImplementacion(parametros) {
        const { titulo, descripcion, contenido, idVotacion, idProblema, idSolucion } = parametros;
        let sql = "";
        sql += "INSERT INTO Implementacion (titulo, descripcion, contenido, id_votacion, id_problema, id_solucion) VALUES (\n  ";
        sql += sqlstring.escape(titulo);
        sql += ",\n  ";
        sql += sqlstring.escape(descripcion);
        sql += ",\n  ";
        sql += sqlstring.escape(contenido);
        sql += ",\n  ";
        sql += sqlstring.escape(idVotacion);
        sql += ",\n  ";
        sql += sqlstring.escape(idProblema);
        sql += ",\n  ";
        sql += sqlstring.escape(idSolucion);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        const [{ UltimoRegistro: id }] = await this.api.Utilities.QueryDatabase("SELECT LAST_INSERT_ROWID() AS UltimoRegistro;");
        return id;
    }

};