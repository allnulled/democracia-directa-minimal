const sqlstring = require("sqlstring");

module.exports = class {
    
    method = "use";
    
    route = "/RetirarVoto";
    
    getMiddleware() {
        return [];
    }
    
    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.RetirarVoto");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            const parametrosFormateados = await this.getFormattedParameters(request);
            await this.getVoto(parametrosFormateados);
            await this.getVotacion(parametrosFormateados);
            await this.validateEstadoDeVotacion(parametrosFormateados);
            await this.deleteVoto(parametrosFormateados);
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "El voto fue eliminado correctamente",
                id: parametrosFormateados.idVoto
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getFormattedParameters(request) {
        const idVoto = this.api.Utilities.GetRequestParameter(request, "id_voto", false);
        if(typeof idVoto !== "number") {
            throw new Error("Se requiere parámetro «id_voto» ser un número en el controlador «RetirarVoto»");
        }
        return { idVoto };
    }
    
    async getVoto(parametros) {
        let sql = "";
        sql += "SELECT * FROM Voto\n WHERE id = ";
        sql += sqlstring.escape(parametros.idVoto);
        sql += ";";
        const votosCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votosCoincidentes.length === 0) {
            throw new Error("No se encontraron votos coincidentes con los parámetros proporcionados en el controlador «RetirarVoto»");
        }
        parametros.voto = votosCoincidentes[0];
    }
    
    async getVotacion(parametros) {
        const idVotacion = parametros.voto.id_votacion;
        let sql = "";
        sql += "SELECT * FROM Votacion\n WHERE id = ";
        sql += sqlstring.escape(idVotacion);
        sql += ";";
        const votacionesCoincidentes = await this.api.Utilities.QueryDatabase(sql);
        if(votacionesCoincidentes.length === 0) {
            throw new Error("No se encontraron votaciones coincidentes con los parámetros proporcionados en el controlador «RetirarVoto»");
        }
        parametros.votacion = votacionesCoincidentes[0];
    }
    
    validateEstadoDeVotacion(parametros) {
        const idProblema = parametros.voto.id_problema;
        const idSolucion = parametros.voto.id_solucion;
        const idImplementacion = parametros.voto.id_implementacion;
        if(idProblema) {
            if(parametros.votacion.estado !== "Problemas") {
                throw new Error("No se puede retirar el voto porque la votación no está en el plazo de «Problemas» en el controlador «RetirarVoto»");
            }
        } else if(idSolucion) {
            if(parametros.votacion.estado !== "Soluciones") {
                throw new Error("No se puede retirar el voto porque la votación no está en el plazo de «Soluciones» en el controlador «RetirarVoto»");
            }
        } else if(idImplementacion) {
            if(parametros.votacion.estado !== "Implementaciones") {
                throw new Error("No se puede retirar el voto porque la votación no está en el plazo de «Implementaciones» en el controlador «RetirarVoto»");
            }
        }
    }
    
    async deleteVoto(parametros) {
        let sql = "";
        sql += "DELETE FROM Voto\n WHERE id = ";
        sql += parametros.voto.id;
        sql += ";";
        await this.api.Utilities.QueryDatabase(sql);
    }

};