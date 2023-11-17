const sqlstring = require("sqlstring");

module.exports = class {

    method = "use";

    route = "/ConsultarDatos";

    getMiddleware() { return []; }

    tablasDisponibles = [
        // "Usuario",
        // "Permiso",
        // "Permiso_de_usuario",
        // "Sesion",
        "Votacion",
        "Problema",
        "Solucion",
        "Implementacion",
        "Voto"
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
    ]

    async dispatch(request, response, next) {
        this.api.Utilities.Trace("api.Controllers.ConsultarDatos");
        try {
            await this.api.Utilities.AuthenticateRequest(request, true);
            this.getFormattedParameters(request);
            this.validateParameters();
            this.buildSelect();
            await this.runSelect();
            this.filterSelect();
            return this.api.Utilities.DispatchSuccess(response, {
                mensaje: "La consulta fue realizada correctamente",
                datos: this.selectData,
                consulta: {
                    tabla: this.parametros.tabla,
                    filtros: this.parametros.filtros,
                    orden: this.parametros.orden,
                    pagina: this.parametros.pagina,
                    items: this.parametros.items
                }
            });
        } catch (error) {
            return this.api.Utilities.DispatchError(response, error);
        }
    }

    getFormattedParameters(request) {
        const tabla = this.api.Utilities.GetRequestParameter(request, "tabla", []);
        const filtros = this.api.Utilities.GetRequestParameter(request, "filtros", []);
        const orden = this.api.Utilities.GetRequestParameter(request, "orden", []);
        const items = this.api.Utilities.GetRequestParameter(request, "items", 20);
        const pagina = this.api.Utilities.GetRequestParameter(request, "pagina", 1);
        if (!Array.isArray(filtros)) {
            throw new Error("Se requiere parámetro «filtros» ser un array en el controlador «ConsultarDatos»");
        }
        if (!Array.isArray(orden)) {
            throw new Error("Se requiere parámetro «orden» ser un array en el controlador «ConsultarDatos»");
        }
        if (typeof items !== "number") {
            throw new Error("Se requiere parámetro «items» ser un número en el controlador «ConsultarDatos»");
        }
        if (typeof pagina !== "number") {
            throw new Error("Se requiere parámetro «pagina» ser un número en el controlador «ConsultarDatos»");
        }
        if (items < 0) {
            throw new Error("Se requiere parámetro «items» ser un número entero positivo en el controlador «ConsultarDatos»");
        }
        if (pagina <= 0) {
            throw new Error("Se requiere parámetro «pagina» ser un número entero positivo en el controlador «ConsultarDatos»");
        }
        this.parametros = { tabla, filtros, orden, items, pagina };
    }

    validateParameters() {
        if (this.tablasDisponibles.indexOf(this.parametros.tabla) === -1) {
            throw new Error("Se requiere parámetro «tabla» ser una de las tablas válidas («" + this.tablasDisponibles.join("», «") + "» en el controlador «ConsultarDatos»");
        }
    }

    buildSelect() {
        let sql = "";
        sql += "SELECT * FROM ";
        sql += sqlstring.escapeId(this.parametros.tabla);
        sql += this.buildSelectWhere();
        sql += this.buildSelectOrder();
        sql += this.buildSelectLimitAndOffset();
        this.selectBuilt = sql;
    }

    buildSelectWhere() {
        let sql = "";
        if(this.parametros.filtros.length === 0) {
            return "";
        }
        sql += "\n WHERE (";
        for (let index = 0; index < this.parametros.filtros.length; index++) {
            const filtro = this.parametros.filtros[index];
            if (!Array.isArray(filtro)) {
                throw new Error("Se requiere parámetro en regla de filtro «" + index + "» ser un array en el controlador «ConsultarDatos»");
            }
            if(index !== 0) {
                sql += "\n   AND ";
            }
            const [subj, op, obj] = filtro;
            sql += sqlstring.escapeId(subj);
            if (typeof subj !== "string") {
                throw new Error("Se requiere parámetro «sujeto» en regla de filtro «" + index + "» ser un texto en el controlador «ConsultarDatos»");
            }
            if (typeof op !== "string") {
                throw new Error("Se requiere parámetro «operacion» en regla de filtro «" + index + "» ser un texto en el controlador «ConsultarDatos»");
            }
            if (this.operacionesDisponibles.indexOf(op) === -1) {
                throw new Error("Se requiere parámetro «operacion» en regla de filtro «" + index + "» ser una operación disponible en el controlador «ConsultarDatos»");
            }
            if ((op === "IN") || (op === "NOT IN")) {
                if (!Array.isArray(obj)) {
                    throw new Error("Se requiere parámetro «objeto» en regla de filtro «" + index + "» ser un array dada la «operacion» «IN/NOT IN»  en el controlador «ConsultarDato»");
                }
                if (obj.length) {
                    throw new Error("Se requiere parámetro «objeto» en regla de filtro «" + index + "» ser un array con 1 o más ítems dada la «operacion» «IN/NOT IN»  en el controlador «ConsultarDato»");
                }
                sql += " ";
                sql += op;
                sql += " (";
                for (let index2 = 0; index2 < obj.length; index2++) {
                    const objetoItem = obj[index2];
                    if (index2 !== 0) {
                        sql += ", ";
                    }
                    sql += sqlstring.escape(objetoItem);
                }
                sql += ")";
            } else if ((op === "IS NULL") || (op === "IS NOT NULL")) {
                sql += " ";
                sql += op;
            } else {
                sql += " ";
                sql += op;
                sql += " ";
                sql += sqlstring.escape(obj);
            }
        }
        sql += ")";
        return sql;
    }

    buildSelectOrder() {
        let sql = "";
        if(this.parametros.orden.length === 0) {
            return "";
        }
        sql += "\n ORDER BY ";
        for (let index = 0; index < this.parametros.orden.length; index++) {
            const ordenacion = this.parametros.orden[index];
            if (!Array.isArray(ordenacion)) {
                throw new Error("Se requiere parámetro en regla de orden «" + index + "» ser un array en el controlador «ConsultarDatos»");
            }
            const [columna, direccion] = ordenacion;
            if(["ASC", "DESC"].indexOf(direccion) === -1) {
                throw new Error("Se requiere parámetro «direccion» en regla de orden «" + index + "» ser un texto válido («ASC», «DESC») en el controlador «ConsultarDatos»");
            }
            if(index !== 0) {
                sql += ",\n    ";
            }
            sql += sqlstring.escapeId(columna);
            sql += " ";
            sql += direccion;
        }
        return sql;
    }

    buildSelectLimitAndOffset() {
        let sql = "";
        if(this.parametros.pagina === 0) {
            return "";
        }
        this.parametros.offset = this.parametros.items * (this.parametros.pagina-1);
        sql += "\n LIMIT ";
        sql += this.parametros.items;
        sql += "\n OFFSET ";
        sql += this.parametros.offset;
        return sql;
    }

    async runSelect() {
        const resultadosCoincidentes = await this.api.Utilities.QueryDatabase(this.selectBuilt);
        this.selectResult = resultadosCoincidentes;
    }

    async filterSelect() {
        this.selectData = this.selectResult;
    }

};