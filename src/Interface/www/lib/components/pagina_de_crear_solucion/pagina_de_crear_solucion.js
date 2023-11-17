
window.PaginaDeCrearSolucion = Castelog.metodos.un_componente_vue2("PaginaDeCrearSolucion",
  "<div class=\"PaginaDeCrearSolucion Component\">"
 + "    <WinVentana titulo=\"🌐 Crear solución\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver problemas', link:'/VerProblemas'},{texto: 'Problema',link:'/VerProblema/' + this.$route.query.id_problema},{texto: 'Crear solución',link: false}]\" />"
 + "      <div class=\"\">"
 + "        <div class=\"padding_1 visor_de_dato\">"
 + "        "
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Título:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"text\" class=\"\" v-model=\"titulo\" />"
 + "            </div>"
 + "          </div>"
 + "        "
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Descripción:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <textarea type=\"text\" class=\"\" v-model=\"descripcion\"></textarea>"
 + "            </div>"
 + "          </div>"
 + "        "
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Contenido:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <textarea type=\"text\" class=\"\" v-model=\"contenido\"></textarea>"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <hr />"
 + ""
 + "          <div class=\"padding_1 padding_top_0 padding_bottom_0\">"
 + "            <button class=\"width_100\" v-on:click=\"() => crearSolucion()\">Crear solución</button>"
 + "          </div>"
 + ""
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { titulo:"",
descripcion:"",
contenido:"",
id_votacion:undefined,
id_problema:parseInt( this.$route.params.id_problema )
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async crearSolucion() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/CrearSolucion", "POST", { titulo:this.titulo,
descripcion:this.descripcion,
contenido:this.contenido,
id_votacion:this.id_votacion,
id_problema:this.id_problema
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(typeof respuesta_1 === 'undefined') {
return;
}
if(!(respuesta_1.data.data.mensaje === "La solución fue creada correctamente")) throw new Error("Error en fichero [-] en posición [2669-2773=78:51-79:104] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La solución fue creada correctamente\"");
const idSolucion = respuesta_1.data.data.id;
this.$router.history.push( "/VerSolucion/" + idSolucion );
} catch(error) {
this.root.gestionarError( error );}
},
async obtenerDatosPrevios() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:"Problema",
filtros:[ [ "id",
"=",
this.id_problema ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La consulta fue realizada correctamente")) throw new Error("Error en fichero [-] en posición [3429-3536=96:59-97:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La consulta fue realizada correctamente\"");
const problema = respuesta_1.data.data.datos[ 0 ];
this.id_votacion = problema.id_votacion;
} catch(error) {
this.root.gestionarError( error );}
}
},
watch:{ 
},
beforeMount() {
},
async mounted() {try {
(await this.obtenerDatosPrevios(  ));
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);