
( async () => {
try {
const utilidades = { 
};
utilidades.textosHumanizados = { "Descripcion":"Descripción",
"Presentacion":"Presentación",
"Fecha de presentacion":"Fecha de presentación",
"Id":"ID",
"Id votacion":"ID de votación",
"Id problema":"ID de problema",
"Id solucion":"ID de solución",
"Id implementacion":"ID de implementación",
"Id usuario":"ID de usuario",
"Titulo":"Título"
};
utilidades.humanizarTexto = function( texto ) {try {
let salida = texto;
salida = texto.replace( new RegExp( "[A-Z]",
"g" ),
function( match ) {try {
return "_" + match.toLowerCase(  );
} catch(error) {
console.log(error);
throw error;
}

} );
salida = texto.replace( new RegExp( "_",
"g" ),
" " );
salida = salida.substr( 0,
1 ).toUpperCase(  ) + salida.substr( 1 );
if(salida in utilidades.textosHumanizados) {
salida = utilidades.textosHumanizados[ salida ];
}
return salida;
} catch(error) {
console.log(error);
throw error;
}

};
utilidades.abreviarTexto = function( texto,
longitud = 50 ) {try {
if(typeof texto === 'number') {
return texto;
}
if(typeof texto === 'object') {
texto = JSON.stringify(texto, null, 2);
}
if(typeof texto === 'undefined') {
texto = "-";
}
if(texto === null) {
texto = "- (nulo)";
}
if(typeof texto === 'string') {
if(texto.length > longitud) {
return texto.substr( 0,
longitud ) + "...";
}
return texto;
}
} catch(error) {
console.log(error);
throw error;
}

};
utilidades.crearParametrosQuerystring = function( parametros ) {try {
const parametrosUrl = new URLSearchParams( parametros );
return parametrosUrl.toString(  );
} catch(error) {
console.log(error);
throw error;
}

};
window.DemocraciaDirectaMinimal_utilidades = utilidades;
} catch(error) {
console.log("Error al cargar utilidades:");
console.log(error);
throw error;}})();