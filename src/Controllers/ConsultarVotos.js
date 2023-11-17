const sqlstring = require("sqlstring");

module.exports = class {

    method = "use";

    route = "/ConsultarVotos";

    getMiddleware() { return []; }

    tiposDisponibles = [
        "Problema",
        "Solucion",
        "Implementacion"
    ];

    operacionesDisponibles = [
        "<",
        "<=",
        "=",
        "!=",
        ">",
        ">=",
        "LIKE",
        "NOT LIKE",
        "IN",
        "NOT IN",
        "IS NULL",
        "IS NOT NULL"
    ];

    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.ConsultarDatos");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            this.getFormattedParametros(request);
            await this.getVotosRelacionados();
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La consulta fue realizada correctamente",
                datos: this.selectData,
                consulta: {
                    tablas: ["Voto", this.parametros.modelo_objetivo],
                    filtros: [this.parametros.modelo_objetivo + ".id", "=", this.parametros.valor_objetivo]
                }
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getFormattedParametros(request) {
        this.parametros = {};
        let tipo = undefined;
        let valor = undefined;
        const id_implementacion = this.api.Utilities.GetRequestParameter(request, "id_implementacion", false);
        const id_solucion = this.api.Utilities.GetRequestParameter(request, "id_solucion", false);
        const id_problema = this.api.Utilities.GetRequestParameter(request, "id_problema", false);
        if(id_implementacion) {
            tipo = "Implementacion";
            valor = id_implementacion;
        } else if(id_solucion) {
            tipo = "Solucion";
            valor = id_solucion;
        } else if(id_problema) {
            tipo = "Problema";
            valor = id_problema;
        } else {
            throw new Error("Se requiere alguno de los parámetros «id_implementacion», «id_solucion», «id_problema» en el controlador «ConsultarVotos»");
        }
        this.parametros.modelo_objetivo = tipo;
        this.parametros.valor_objetivo = valor;
    }

    async getVotosRelacionados() {
        const modeloObjetivo = this.parametros.modelo_objetivo;
        const fields = [
            modeloObjetivo + ".id",
            modeloObjetivo + ".id_votacion",
            "Voto.id",
            "Voto.id_usuario",
            "Voto.sentido"
        ];
        let sql = "";
        sql += "SELECT ";
        for(let index=0; index<fields.length; index++) {
          const field = fields[index];
          if(index !== 0) {
            sql += ", ";
          }
          sql += "\n    ";
          sql += sqlstring.escapeId(field);
          sql += " AS ";
          sql += sqlstring.escape(field);
        }
        sql += "\n  FROM ";
        sql += sqlstring.escapeId(this.parametros.modelo_objetivo);
        sql += "\n  JOIN Voto ON ";
        sql += sqlstring.escapeId(this.parametros.modelo_objetivo + ".id");
        sql += " = ";
        sql += sqlstring.escapeId("Voto.id_" + this.parametros.modelo_objetivo.toLowerCase());
        sql += "\n WHERE ";
        sql += sqlstring.escapeId(this.parametros.modelo_objetivo + ".id");
        sql += " = ";
        sql += sqlstring.escape(this.parametros.valor_objetivo);
        sql += ";";
        const resultados = await this.api.Utilities.QueryDatabase(sql);
        const votos = resultados.reduce((salida, resultado) => {
            if(resultado["Voto.sentido"] === "1") {
                salida.positivos++;
            } else if(resultado["Voto.sentido"] === "-1") {
                salida.negativos++;
            }
            return salida;
        }, {
            positivos: 0,
            negativos: 0
        });
        this.selectData = votos;
    }

};