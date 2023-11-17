
module.exports = async function() {try {
let authorization = undefined;
let idVotacionCreada = undefined;
let idProblemaCreado = undefined;
let idSolucionCreada = undefined;
let idImplementacionCreada = undefined;
let idVotoInsertado = undefined;
let esquemaDeDatos = undefined;
const Login = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/Login", "POST", { nombre:"admin",
contrasenya:"admin"
}, { 
}, null, null));
if(!(typeof respuesta.data.data.sesion.token === 'string')) throw new Error("Error en fichero [-] en posición [740-809=17:30-18:69] cuando: " + "compruebo que respuesta.data.data.sesion.token es tipo texto");
authorization = respuesta.data.data.sesion.token;
console.log(respuesta.data.data.mensaje);
} catch(error) {
console.log(error);
throw error;
}

};
const CrearVotacion = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/CrearVotacion", "POST", { presentacion:"ok",
fecha_de_presentacion:"2023-05-01",
fecha_de_problemas:"2023-05-02",
fecha_de_soluciones:"2023-05-03",
fecha_de_implementaciones:"2023-05-04",
fecha_de_aplicaciones:"2023-05-05"
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
console.log(respuesta.data.data.mensaje);
if(!(respuesta.data.data.mensaje === "La votación fue insertada correctamente")) throw new Error("Error en fichero [-] en posición [1655-1760=38:45-39:105] cuando: " + "compruebo que respuesta.data.data.mensaje es igual que \"La votación fue insertada correctamente\"");
idVotacionCreada = respuesta.data.data.id;
} catch(error) {
console.log(error);
throw error;
}

};
const ProgresarEstadoDeVotacion = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/ProgresarEstadoDeVotacion", "POST", { id_votacion:idVotacionCreada
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [2280-2344=52:15-53:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
} catch(error) {
console.log(error);
throw error;
}

};
const CrearProblema = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/CrearProblema", "POST", { titulo:"Titulo del problema",
descripcion:"Descripcion del problema",
contenido:"Cotenido del problema",
id_votacion:idVotacionCreada
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [2980-3044=69:15-70:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
idProblemaCreado = respuesta.data.data.id;
} catch(error) {
console.log(error);
throw error;
}

};
const CrearSolucion = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/CrearSolucion", "POST", { titulo:"Titulo de la solucion",
descripcion:"Descripcion de la solucion",
contenido:"Cotenido de la solucion",
id_votacion:idVotacionCreada,
id_problema:idProblemaCreado
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [3794-3858=88:15-89:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
idSolucionCreada = respuesta.data.data.id;
} catch(error) {
console.log(error);
throw error;
}

};
const CrearImplementacion = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/CrearImplementacion", "POST", { titulo:"Titulo de la implementacion",
descripcion:"Descripcion de la implementacion",
contenido:"Cotenido de la implementacion",
id_votacion:idVotacionCreada,
id_problema:idProblemaCreado,
id_solucion:idSolucionCreada
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [4685-4749=108:15-109:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
idImplementacionCreada = respuesta.data.data.id;
} catch(error) {
console.log(error);
throw error;
}

};
const DarVoto = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/DarVoto", "POST", { sentido:0 - 1,
id_implementacion:idImplementacionCreada
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [5326-5390=124:15-125:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
idVotoInsertado = respuesta.data.data.id;
} catch(error) {
console.log(error);
throw error;
}

};
const ConsultarVoto = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/ConsultarDatos", "POST", { tabla:"Voto",
filtros:[  ]
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [5944-6008=140:15-141:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
if(!(Array.isArray(respuesta.data.data.datos))) throw new Error("Error en fichero [-] en posición [6009-6071=141:65-142:62] cuando: " + "compruebo que respuesta.data.data.datos es tipo lista");
if(!(typeof respuesta.data.data.datos[ 0 ] === 'object')) throw new Error("Error en fichero [-] en posición [6072-6138=142:63-143:66] cuando: " + "compruebo que respuesta.data.data.datos[0] es tipo objeto");
console.log(respuesta.data.data.mensaje);
} catch(error) {
console.log(error);
throw error;
}

};
const RetirarVoto = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/RetirarVoto", "POST", { id_voto:idVotoInsertado
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [6609-6673=156:15-157:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
} catch(error) {
console.log(error);
throw error;
}

};
const MostrarEsquema = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/MostrarEsquema", "POST", { 
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [7096-7160=168:15-169:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
esquemaDeDatos = respuesta.data.data.esquema;
if(!(Array.isArray(esquemaDeDatos))) throw new Error("Error en fichero [-] en posición [7270-7321=171:64-172:51] cuando: " + "compruebo que esquemaDeDatos es tipo lista");
} catch(error) {
console.log(error);
throw error;
}

};
const Logout = async function() {try {
const respuesta = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/Logout", "POST", { 
}, { authorization
}, null, error => {
console.log(error.response.data.error);}));
if(!(typeof respuesta.data.data.mensaje === 'string')) throw new Error("Error en fichero [-] en posición [7683-7747=182:15-183:64] cuando: " + "compruebo que respuesta.data.data.mensaje es tipo texto");
console.log(respuesta.data.data.mensaje);
} catch(error) {
console.log(error);
throw error;
}

};
(await Login(  ));
(await CrearVotacion(  ));
(await ProgresarEstadoDeVotacion(  ));
(await CrearProblema(  ));
(await ProgresarEstadoDeVotacion(  ));
(await CrearSolucion(  ));
(await ProgresarEstadoDeVotacion(  ));
(await CrearImplementacion(  ));
(await DarVoto(  ));
(await ConsultarVoto(  ));
(await RetirarVoto(  ));
(await MostrarEsquema(  ));
(await Logout(  ));
} catch(error) {
console.log(error.response.data.error);}
}