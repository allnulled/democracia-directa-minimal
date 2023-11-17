
// [castelog:html5izable] ACTIVADO con: {"autor":"allnulled","nombre":"index","version":"1","contenido":{"head":"<head>\n    <title>🌐 Democracia Directa</title>\n    <meta charset=\"utf8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/win7/win7.scoped.2.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/simple-grid/simple-grid.2.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/framework/framework.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"lib/theme/theme.css\" />\n    <script src=\"lib/calo/calo.js\"></script>\n    <script src=\"lib/utilidades/utilidades.js\"></script>\n    <script src=\"lib/components/migas_de_pan/migas_de_pan.js\"></script>\n    <script src=\"lib/components/explorador_de_datos/explorador_de_datos.js\"></script>\n    <script src=\"lib/components/visor_de_dato/visor_de_dato.js\"></script>\n    <script src=\"lib/components/win_ventana/win_ventana.js\"></script>\n    <script src=\"lib/components/pagina_de_inicio/pagina_de_inicio.js\"></script>\n    <script src=\"lib/components/pagina_de_login/pagina_de_login.js\"></script>\n    <script src=\"lib/components/pagina_de_crear_votacion/pagina_de_crear_votacion.js\"></script>\n    <script src=\"lib/components/pagina_de_crear_problema/pagina_de_crear_problema.js\"></script>\n    <script src=\"lib/components/pagina_de_crear_solucion/pagina_de_crear_solucion.js\"></script>\n    <script src=\"lib/components/pagina_de_crear_implementacion/pagina_de_crear_implementacion.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_sesion/pagina_de_ver_sesion.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_votaciones/pagina_de_ver_votaciones.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_votacion/pagina_de_ver_votacion.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_problemas/pagina_de_ver_problemas.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_problema/pagina_de_ver_problema.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_soluciones/pagina_de_ver_soluciones.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_solucion/pagina_de_ver_solucion.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_implementaciones/pagina_de_ver_implementaciones.js\"></script>\n    <script src=\"lib/components/pagina_de_ver_implementacion/pagina_de_ver_implementacion.js\"></script>\n</head>","body":"<body><div id=\"app\"></div></body>"}}

window.App = Castelog.metodos.una_aplicacion_vue2(
  "App",
  "<div class=\"App Component Castelog-app win7\">"
 + "    <router-view v-if=\"typeof tokenDeSesion === 'string'\" :root=\"this\"></router-view>"
 + "    <PaginaDeLogin v-else :root=\"this\"></PaginaDeLogin>"
 + "    <div class=\"caja_de_error_1\" v-if=\"errores.length\">"
 + "      <div class=\"caja_de_error_2\">"
 + "        <div class=\"caja_de_error_3\">"
 + "          <div class=\"caja_de_error_4\">"
 + "            <WinVentana titulo=\"Errores de aplicación\">"
 + "              <div style=\"overflow: scroll\">"
 + "                <div class=\"caja_de_error_particular_1\" v-for=\"error, errorIndex in errores\" v-bind:key=\"'notificaciones-de-error-' + errorIndex\">"
 + "                  <div class=\"padding_2 padding_bottom_0 texto_de_error_1\">"
 + "                    <hr />"
 + "                    <span>[{{ error.name }}] {{ error.message }} {{ error.stack }}</span>"
 + "                  </div>"
 + "                  <div class=\"padding_2 padding_top_0\">"
 + "                    <div class=\"texto_de_error_1\" v-if=\"error.response\">"
 + "                      <hr />"
 + "                      <div class=\"text_align_center\"><b>Error de servidor:</b></div>"
 + "                      <hr />"
 + "                      <div><b>Error:</b> {{ error.response.data.error.name }}</div>"
 + "                      <hr />"
 + "                      <div><b>Mensaje:</b> {{ error.response.data.error.message }}</div>"
 + "                      <div v-if=\"error.verDetalles\">"
 + "                        <hr />"
 + "                        <div><b>Traza:</b> {{ error.response.data.error.stack }}</div>"
 + "                      </div>"
 + "                    </div>"
 + "                    <hr />"
 + "                    <div class=\"text_align_right\">"
 + "                      <button v-if=\"error.response\" v-on:click=\"() => verDetallesDeError(errorIndex)\">{{ error.verDetalles ? \"Ocultar\" : \"Ver\" }} detalles</button>"
 + "                      <button v-on:click=\"() => limpiarError(errorIndex)\">Aceptar</button>"
 + "                    </div>"
 + "                  </div>"
 + "                </div>"
 + "              </div>"
 + "            </WinVentana>"
 + "          </div>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { data() {try {
return { root:this,
errores:[  ],
esquema:undefined,
tokenDeSesion:undefined,
permisos:[  ]
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ verDetallesDeError( indice ) {try {
this.errores[ indice ].verDetalles = (!((!((!(this.errores[ indice ].verDetalles))))));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
limpiarError( indice ) {try {
this.errores.splice( indice,
1 );
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
gestionarError( error ) {try {
console.log(error);
this.errores.push(error)
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async login( nombre,
contrasenya ) {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/Login", "POST", { nombre,
contrasenya
}, { 
}, null, error => {
this.gestionarError( error );}));
if(typeof respuesta_1 === 'undefined') {
return;
}
this.tokenDeSesion = respuesta_1.data.data.sesion.token;
this.permisos = respuesta_1.data.data.permisos;
this.$forceUpdate( true );
} catch(error) {
this.gestionarError( error );}
},
async votarAFavor( propiedad,
valor ) {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/DarVoto", "POST", { sentido:1,
[ propiedad ]:parseInt( valor )
}, { authorization:this.tokenDeSesion
}, null, error => {
this.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "El voto fue asignado correctamente")) throw new Error("Error en fichero [-] en posición [9073-9175=211:54-212:102] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"El voto fue asignado correctamente\"");
} catch(error) {
console.log(error);
throw error;
}

},
async votarEnContra( propiedad,
valor ) {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/DarVoto", "POST", { sentido:0 - 1,
[ propiedad ]:parseInt( valor )
}, { authorization:this.tokenDeSesion
}, null, error => {
this.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "El voto fue asignado correctamente")) throw new Error("Error en fichero [-] en posición [9613-9715=225:54-226:102] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"El voto fue asignado correctamente\"");
} catch(error) {
console.log(error);
throw error;
}

},
async retirarVoto( id_voto ) {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/RetirarVoto", "POST", { id_voto:parseInt( id_voto )
}, { authorization:this.tokenDeSesion
}, null, error => {
this.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "El voto fue eliminado correctamente")) throw new Error("Error en fichero [-] en posición [10096-10199=236:54-237:103] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"El voto fue eliminado correctamente\"");
} catch(error) {
console.log(error);
throw error;
}

}
},
watch:{ 
},
beforeMount() {try {
this.$window = window;
this.$utilidades = window.DemocraciaDirectaMinimal_utilidades;
} catch(error) {
console.log(error);
throw error;
}

},
mounted() {
}
};},
  "html {}\n    body {}\n    .Component {}\n    .App {}\n",
  {},
  [ { path:"/Login",
name:"PaginaDeLogin",
component:PaginaDeLogin,
props:{ 
}
},
{ path:"/VerVotaciones",
name:"PaginaDeVerVotaciones",
component:PaginaDeVerVotaciones,
props:{ 
}
},
{ path:"/VerVotacion/:id_votacion",
name:"PaginaDeVerVotacion",
component:PaginaDeVerVotacion,
props:{ 
}
},
{ path:"/CrearVotacion",
name:"PaginaDeCrearVotacion",
component:PaginaDeCrearVotacion,
props:{ 
}
},
{ path:"/VerProblemas",
name:"PaginaDeVerProblemas",
component:PaginaDeVerProblemas,
props:{ 
}
},
{ path:"/VerProblema/:id_problema",
name:"PaginaDeVerProblema",
component:PaginaDeVerProblema,
props:{ 
}
},
{ path:"/CrearProblema/:id_votacion",
name:"PaginaDeCrearProblema",
component:PaginaDeCrearProblema,
props:{ 
}
},
{ path:"/VerSoluciones",
name:"PaginaDeVerSoluciones",
component:PaginaDeVerSoluciones,
props:{ 
}
},
{ path:"/VerSolucion/:id_solucion",
name:"PaginaDeVerSolucion",
component:PaginaDeVerSolucion,
props:{ 
}
},
{ path:"/CrearSolucion/:id_problema",
name:"PaginaDeCrearSolucion",
component:PaginaDeCrearSolucion,
props:{ 
}
},
{ path:"/VerImplementaciones",
name:"PaginaDeVerImplementaciones",
component:PaginaDeVerImplementaciones,
props:{ 
}
},
{ path:"/VerImplementacion/:id_implementacion",
name:"PaginaDeVerImplementacion",
component:PaginaDeVerImplementacion,
props:{ 
}
},
{ path:"/CrearImplementacion/:id_solucion",
name:"PaginaDeCrearImplementacion",
component:PaginaDeCrearImplementacion,
props:{ 
}
},
{ path:"/VerSesion",
name:"PaginaDeVerSesion",
component:PaginaDeVerSesion,
props:{ 
}
},
{ path:"/",
name:"PaginaDeInicio",
component:PaginaDeInicio,
props:{ 
}
} ],
  { es:{ 
},
en:{ 
},
ca:{ 
}
},
  "#app");