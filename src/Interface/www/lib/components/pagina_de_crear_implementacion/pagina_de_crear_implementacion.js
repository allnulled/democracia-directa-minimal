
window.PaginaDeCrearImplementacion = Castelog.metodos.un_componente_vue2("PaginaDeCrearImplementacion",
  "<div class=\"PaginaDeCrearImplementacion Component\">"
 + "    <WinVentana titulo=\"🌐 Crear implementación\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver soluciones', link: '/VerSoluciones'},{texto: 'Solución',link:'/VerSolucion/' + this.$route.query.id_solucion},{texto: 'Crear implementación',link: false}]\" />"
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
 + "            <button class=\"width_100\" v-on:click=\"() => crearImplementacion()\">Crear implementación</button>"
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
id_problema:undefined,
id_solucion:parseInt( this.$route.params.id_solucion )
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async crearImplementacion() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/CrearImplementacion", "POST", { titulo:this.titulo,
descripcion:this.descripcion,
contenido:this.contenido,
id_votacion:this.id_votacion,
id_problema:this.id_problema,
id_solucion:this.id_solucion
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La implementación fue creada correctamente")) throw new Error("Error en fichero [-] en posición [2750-2860=79:59-80:110] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La implementación fue creada correctamente\"");
this.$router.history.push( "/VerImplementacion/" + respuesta_1.data.data.id );
} catch(error) {
console.log(error);
throw error;
}

},
async obtenerDatosPrevios() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:"Solucion",
filtros:[ [ "id",
"=",
parseInt( this.$route.params.id_solucion ) ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La consulta fue realizada correctamente")) throw new Error("Error en fichero [-] en posición [3457-3564=96:59-97:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La consulta fue realizada correctamente\"");
console.log(respuesta_1.data.data);
const solucion = respuesta_1.data.data.datos[ 0 ];
this.id_problema = parseInt( solucion.id_problema );
this.id_votacion = parseInt( solucion.id_votacion );
} catch(error) {
console.log(error);
throw error;
}

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