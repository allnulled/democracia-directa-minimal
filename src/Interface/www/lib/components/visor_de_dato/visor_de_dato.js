
window.VisorDeDato = Castelog.metodos.un_componente_vue2("VisorDeDato",
  "<div class=\"VisorDeDato Component\">"
 + "    <div class=\"visor_de_dato\">"
 + "      <div class=\"item_de_campo\" v-for=\"prop, propIndex in dato\" v-bind:key=\"'campo-de-visor-de-dato-' + propIndex\">"
 + "        <span class=\"etiqueta_de_campo\">{{ root.$utilidades.humanizarTexto(propIndex) }}:</span>"
 + "        <span class=\"valor_de_campo\">{{ prop }}</span>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
},
tablaProp:{ type:String,
required:true
},
idProp:{ type:[ String,
Number ],
required:true
}
},
data() {try {
return { dato:undefined
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async obtenerDato() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:this.tablaProp,
filtros:[ [ "id",
"=",
this.idProp ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(respuesta_1.data.data.datos.length === 0) {
throw new Error( "No se encontró ninguna instancia de «" + this.tablaProp + "» por el identificador proporcionado" );
}
this.dato = respuesta_1.data.data.datos[ 0 ];
} catch(error) {
this.root.gestionarError( error );}
}
},
watch:{ 
},
beforeMount() {
},
async mounted() {try {
(await this.obtenerDato(  ));
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);