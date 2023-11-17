
window.PaginaDeCrearProblema = Castelog.metodos.un_componente_vue2("PaginaDeCrearProblema",
  "<div class=\"PaginaDeCrearProblema Component\">"
 + "    <WinVentana titulo=\"🌐 Crear problema\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver votaciones', link:'/VerVotaciones'},{texto: 'Votación',link:'/VerVotacion/' + $route.params.id_votacion},{texto: 'Crear problema',link: false}]\" />"
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
 + "            <button class=\"width_100\" v-on:click=\"() => crearProblema()\">Crear problema</button>"
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
id_votacion:parseInt( this.$route.params.id_votacion )
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async crearProblema() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/CrearProblema", "POST", { titulo:this.titulo,
descripcion:this.descripcion,
contenido:this.contenido,
id_votacion:this.id_votacion
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "El problema fue creado correctamente")) throw new Error("Error en fichero [-] en posición [2541-2645=75:59-76:104] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"El problema fue creado correctamente\"");
const idProblema = respuesta_1.data.data.id;
this.$router.history.push( "/VerProblema/" + idProblema );
} catch(error) {
this.root.gesionarError( error );}
}
},
watch:{ 
},
beforeMount() {
},
mounted() {
}
};},
  null);