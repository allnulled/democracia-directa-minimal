const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/ProgresarEstadoDeVotacion";
    
    getMiddleware() { return []; }

    estadosPosibles = ["Presentación","Problemas","Soluciones","Implementaciones","Aplicaciones","Histórico"];
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.ProgresarEstadoDeVotacion");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            this.validateAuthentication(request);
            const parametrosFormateados = this.getFormattedAndValidatedParameters(request);
            const votacion = await this.getVotacion(parametrosFormateados);
            const siguienteEstado = this.validateCambioDeEstado(votacion);
            await this.updateEstadoDeVotacion(votacion.id, siguienteEstado);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: `La votación progresó a estado «${siguienteEstado}» correctamente`,
                estado: siguienteEstado,
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
        const idVotacion = this.api.Utilities.GetRequestParameter(request, "id_votacion", false);
        if(typeof idVotacion !== "number") {
            throw new Error("Se requiere de parámetro «id_votacion» en el controlador «ProgresarEstadoDeVotacion»");
        }
        return { idVotacion };
    }

    async getVotacion(parametros) {
        const { idVotacion } = parametros;
        let sql = "SELECT * FROM Votacion WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontró ninguna votación con el «id_votacion» proporcionado en el controlador «ProgresarEstadoDeVotacion»");
        }
        return votacionesCoincidentes[0];
    }

    validateCambioDeEstado(votacion) {
        const { id_votacion: idVotacion, estado: estadoActual } = votacion;
        const posicionDeEstado = this.estadosPosibles.indexOf(estadoActual);
        if(posicionDeEstado === -1) {
            throw new Error("Se encontró que el «estado» de la «Votación» no coincide con ningún estado contemplado en el controlador «ProgresarEstadoDeVotacion»");
        }
        const estadoSiguiente = this.estadosPosibles[posicionDeEstado + 1];
        if(typeof estadoSiguiente === "undefined") {
            throw new Error("Se encontró que el «estado» de la «Votación» es el último estado posible contemplado en el controlador «ProgresarEstadoDeVotacion»");
        }
        if(estadoSiguiente === "Problemas") {
            const fechaDeProblemas = this.api.Utilities.GetDateFromString(votacion.fecha_de_problemas);
            const fechaActual = new Date();
            if(fechaActual < fechaDeProblemas) {
                throw new Error("Se requiere que la fecha actual sea posterior a la «fecha_de_problemas» de la votación en el controlador «ProgresarEstadoDeVotacion»");
            }
        }
        if(estadoSiguiente === "Soluciones") {
            const fechaDeSoluciones = this.api.Utilities.GetDateFromString(votacion.fecha_de_soluciones);
            const fechaActual = new Date();
            if(fechaActual < fechaDeSoluciones) {
                throw new Error("Se requiere que la fecha actual sea posterior a la «fecha_de_soluciones» de la votación en el controlador «ProgresarEstadoDeVotacion»");
            }
        }
        if(estadoSiguiente === "Implementaciones") {
            const fechaDeImplementaciones = this.api.Utilities.GetDateFromString(votacion.fecha_de_implementaciones);
            const fechaActual = new Date();
            if(fechaActual < fechaDeImplementaciones) {
                throw new Error("Se requiere que la fecha actual sea posterior a la «fecha_de_implementaciones» de la votación en el controlador «ProgresarEstadoDeVotacion»");
            }
        }
        if(estadoSiguiente === "Aplicaciones") {
            const fechaDeAplicaciones = this.api.Utilities.GetDateFromString(votacion.fecha_de_aplicaciones);
            const fechaActual = new Date();
            if(fechaActual < fechaDeAplicaciones) {
                throw new Error("Se requiere que la fecha actual sea posterior a la «fecha_de_aplicaciones» de la votación en el controlador «ProgresarEstadoDeVotacion»");
            }
        }
        return estadoSiguiente;
    }

    async updateEstadoDeVotacion(idVotacion, siguienteEstado) {
        let sql = "";
        sql += "UPDATE Votacion SET estado = ";
        sql += sqlstring.escape(siguienteEstado);
        sql += " WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        await this.api.Utilities.QueryDatabase(sql);
    }

};