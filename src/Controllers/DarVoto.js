const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/DarVoto";
    
    getMiddleware() {
        return [];
    }

    getConfigurations() {
        return {
            maxVotos: 10
        };
    }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.DarVoto");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            this.request = request;
            this.response = response;
            const parametrosFormateados = this.getFormattedParameters(request);
            this.validateParameters(parametrosFormateados);
            await this.getObjetivoById(parametrosFormateados);
            await this.getVotacionById(parametrosFormateados);
            await this.getIdUsuarioByToken(parametrosFormateados);
            await this.validateEstadoDeVotacion(parametrosFormateados);
            await this.validateLimitOfVotos(parametrosFormateados);
            await this.validateNoVoteTheSame(parametrosFormateados);
            const idVoto = await this.insertVoto(parametrosFormateados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "El voto fue asignado correctamente",
                id: idVoto
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getFormattedParameters(request) {
        const idVotacion = this.api.Utilities.GetRequestParameter(request, "id_votacion", false);
        const idProblema = this.api.Utilities.GetRequestParameter(request, "id_problema", false);
        const idSolucion = this.api.Utilities.GetRequestParameter(request, "id_solucion", false);
        const idImplementacion = this.api.Utilities.GetRequestParameter(request, "id_implementacion", false);
        const sentido = this.api.Utilities.GetRequestParameter(request, "sentido", false);
        return { idVotacion, idProblema, idSolucion, idImplementacion, sentido };
    }

    validateParameters(parametros) {
        const { idVotacion, idProblema, idSolucion, idImplementacion, sentido } = parametros;
        if(typeof idVotacion === "number") {
            throw new Error("Se requiere el parámetro «id_votacion» de ser omitido en el controlador «DarVoto»");
        }
        const tieneProblema = typeof idProblema === "number";
        const tieneSolucion = typeof idSolucion === "number";
        const tieneImplementacion = typeof idImplementacion === "number";
        const tieneSentido = typeof sentido === "number";
        if(!tieneSentido) {
            throw new Error("Se requiere el parámetro «sentido» ser un número en el controlador «DarVoto»");
        }
        if([1,-1].indexOf(sentido) === -1) {
            throw new Error("Se requiere el parámetro «sentido» ser un número válido con '1' o '-1' en el controlador «DarVoto»");
        }
        let modeloObjetivo = undefined;
        if(tieneProblema && (tieneSolucion || tieneImplementacion)) {
            throw new Error("Se requiere que solo tenga «id_problema», «id_solucion» o «id_implementacion» (1) en el controlador «DarVoto»")
        } else if(tieneProblema) {
            modeloObjetivo = "Problema";
        }
        if(tieneSolucion && (tieneProblema || tieneImplementacion)) {
            throw new Error("Se requiere que solo tenga «id_problema», «id_solucion» o «id_implementacion» (2) en el controlador «DarVoto»")
        } else if(tieneSolucion) {
            modeloObjetivo = "Solucion";
        }
        if(tieneImplementacion && (tieneProblema || tieneSolucion)) {
            throw new Error("Se requiere que solo tenga «id_problema», «id_solucion» o «id_implementacion» (3) en el controlador «DarVoto»")
        } else if(tieneImplementacion) {
            modeloObjetivo = "Implementacion";
        }
        if((!tieneProblema) && (!tieneSolucion) && (!tieneImplementacion)) {
            throw new Error("Se requiere que mínimo tenga «id_problema», «id_solucion» o «id_implementacion» (4) en el controlador «DarVoto»");
        }
        parametros.modelo_objetivo = modeloObjetivo;
    }
    
    async getObjetivoById(parametros) {
        let sql = "";
        sql += "SELECT * FROM ";
        sql += sqlstring.escapeId(parametros.modelo_objetivo);
        sql += "\n WHERE id = ";
        if(parametros.modelo_objetivo === "Problema") {
            sql += sqlstring.escape(parametros.idProblema);
        } else if(parametros.modelo_objetivo === "Solucion") {
            sql += sqlstring.escape(parametros.idSolucion);
        } else if(parametros.modelo_objetivo === "Implementacion") {
            sql += sqlstring.escape(parametros.idImplementacion);
        } else {
            throw new Error("Se requiere que «modelo_objetivo» sea válido en el controlador «DarVoto»");
        }
        const objetivosCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(objetivosCoincidentes.length === 0) {
            throw new Error("No se encontraron instancias de «" + parametros.modelo_objetivo + "» coincidentes con los parámetros proporcionados en el controlador «DarVoto»");
        }
        parametros.instancia_objetivo = objetivosCoincidentes[0];
    }
    
    async getVotacionById(parametros) {
        const idVotacion = parametros.instancia_objetivo.id_votacion;
        let sql = "";
        sql += "SELECT * FROM Votacion\n WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontraron votaciones coincidentes con «instancia_objetivo.id_votacion» con los parámetros proporcionados en el controlador «DarVoto»");
        }
        const votacion = votacionesCoincidentes[0];
        parametros.votacion = votacion;
    }

    async getIdUsuarioByToken(parametros) {
        const authorization = this.api.Utilities.GetRequestParameter(this.request, "authorization", false);
        if(typeof authorization !== "string") {
            throw new Error("Se requiere parametro «authorization» en el controlador «DarVotos»");
        }
        let sql = "";
        sql += "SELECT * FROM Sesion\n WHERE token = ";
        sql += sqlstring.escape(authorization);
        sql += ";";
        const sesionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(sesionesCoincidentes.length === 0) {
            throw new Error("No se encontraron sesiones coincidentes con los parámetros proporcionados en el controlador «DarVotos»");
        }
        const sesion = sesionesCoincidentes[0];
        const idUsuario = sesion.id_usuario;
        parametros.sesion = sesion;
        parametros.id_usuario = idUsuario;
    }

    validateEstadoDeVotacion(parametros) {
        if(parametros.modelo_objetivo === "Problema") {
            if(parametros.votacion.estado !== "Problemas") {
                throw new Error("Se requiere de «votacion.estado» ser «Problemas» para insertar voto en el controlador «DarVoto»");
            }
        } else if(parametros.modelo_objetivo === "Solucion") {
            if(parametros.votacion.estado !== "Soluciones") {
                throw new Error("Se requiere de «votacion.estado» ser «Soluciones» para insertar voto en el controlador «DarVoto»");
            }
        } else if(parametros.modelo_objetivo === "Implementacion") {
            if(parametros.votacion.estado !== "Implementaciones") {
                throw new Error("Se requiere de «votacion.estado» ser «Implementaciones» para insertar voto en el controlador «DarVoto»");
            }
        } else {
            throw new Error("Se requiere que «modelo_objetivo» sea válido (1) en el controlador «DarVoto»");
        }
    }
    
    async validateLimitOfVotos(parametros) {
        let columnaObjetivo = undefined;
        if(parametros.modelo_objetivo === "Problema") {
            columnaObjetivo = "id_problema";
        } else if(parametros.modelo_objetivo === "Solucion") {
            columnaObjetivo = "id_solucion";
        } else if(parametros.modelo_objetivo === "Implementacion") {
            columnaObjetivo = "id_implementacion";
        } else {
            throw new Error("Se requiere que «modelo_objetivo» sea válido (2) en el controlador «DarVoto»");
        }
        let sql = "";
        sql += "SELECT * FROM Voto ";
        sql += "\n WHERE ";
        sql += sqlstring.escapeId(columnaObjetivo); // id_problema, id_solucion o id_implementacion, por lo cual se divide por cada fase el cálculo del límite máximo de votos en la validación del voto
        sql += " IS NOT NULL";
        sql += "\n   AND id_usuario = ";
        sql += sqlstring.escape(parametros.id_usuario)
        sql += ";";
        const votosCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        const maxVotos = this.getConfigurations().maxVotos;
        if(votosCoincidentes.length >= maxVotos) {
            throw new Error("No se puede sobrepasar el límite de votos «" + maxVotos + "» por cada ronda de estado en el controlador «DarVoto»");
        }
    }

    async validateNoVoteTheSame(parametros) {
        let columnaObjetivo = undefined;
        if(parametros.modelo_objetivo === "Problema") {
            columnaObjetivo = "id_problema";
            parametros.valor_objetivo = parametros.idProblema;
        } else if(parametros.modelo_objetivo === "Solucion") {
            columnaObjetivo = "id_solucion";
            parametros.valor_objetivo = parametros.idSolucion;
        } else if(parametros.modelo_objetivo === "Implementacion") {
            columnaObjetivo = "id_implementacion";
            parametros.valor_objetivo = parametros.idImplementacion;
        } else {
            throw new Error("Se requiere que «modelo_objetivo» sea válido (3) en el controlador «DarVoto»");
        }
        let sql = "";
        sql += "SELECT * FROM Voto ";
        sql += "\n WHERE ";
        sql += sqlstring.escapeId(columnaObjetivo);
        sql += " = ";
        sql += sqlstring.escape(parametros.valor_objetivo);
        sql += ";";
        const votosCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votosCoincidentes.length > 0) {
            throw new Error("Esta instancia de «" + columnaObjetivo + "» ya ha sido votado");
        }
    }

    async insertVoto(parametros) {
        let sql = "";
        console.log(parametros);
        sql += "INSERT INTO Voto (";
        sql += "\n  id_votacion";
        sql += ",\n  id_problema";
        sql += ",\n  id_solucion";
        sql += ",\n  id_implementacion";
        sql += ",\n  id_usuario";
        sql += ",\n  sentido";
        sql += ") VALUES (";
        sql += "\n  " + sqlstring.escape(parametros.instancia_objetivo.id_votacion);
        const values = { id_votacion: null, id_problema: null, id_solucion: null, id_implementacion: null, id_usuario: null };
        values.id_votacion = parametros.votacion.id;
        values.id_votacion = ",\n  ";
        if(parametros.modelo_objetivo === "Problema") {
            values.id_problema = parametros.idProblema;
        }
        if(parametros.modelo_objetivo === "Solucion") {
            values.id_solucion = parametros.idSolucion;
        }
        if(parametros.modelo_objetivo === "Implementacion") {
            values.id_implementacion = parametros.idImplementacion;
        }
        values.id_usuario = parametros.id_usuario;
        sql += ",\n  " + sqlstring.escape(values.id_problema);
        sql += ",\n  " + sqlstring.escape(values.id_solucion);
        sql += ",\n  " + sqlstring.escape(values.id_implementacion);
        sql += ",\n  " + sqlstring.escape(values.id_usuario);
        sql += ",\n  " + sqlstring.escape(parametros.sentido);
        sql += ");";
        await this.api.Utilities.QueryDatabase(sql);
        const [{ id }] = await this.api.Utilities.QueryDatabase("SELECT LAST_INSERT_ROWID() AS id;");
        return id;

    }
};