
window.ExploradorDeDatos = Castelog.metodos.un_componente_vue2("ExploradorDeDatos",
  "<div class=\"ExploradorDeDatos Component\">"
 + "    <div class=\"visor_de_tabla_1\" v-if=\"datos && datos.length\">"
 + "      <table class=\"tabla_de_paginacion\">"
 + "        <tr>"
 + "          <td>"
 + "            <button class=\"min_width_auto\" v-on:click=\"() => irAPaginaPrimera()\" :disabled=\"pagina === 1\"> «« </button>"
 + "          </td>"
 + "          <td>"
 + "            <button class=\"min_width_auto\" v-on:click=\"() => irAPaginaAnterior()\" :disabled=\"pagina === 1\"> « </button>"
 + "          </td>"
 + "          <td class=\"width_100 text_align_center\">"
 + "            <span>Página </span>"
 + "            <span>{{ pagina }}</span>"
 + "          </td>"
 + "          <td>"
 + "            <button class=\"min_width_auto\" v-on:click=\"() => irAPaginaSiguiente()\"> » </button>"
 + "          </td>"
 + "        </tr>"
 + "      </table>"
 + "      <table class=\"tabla\">"
 + "        <thead>"
 + "          <tr>"
 + "            <template v-for=\"prop, propIndex in datos[0]\">"
 + "              <th :style=\"propIndex === 'id' ? 'width: 1%;' : ''\" v-bind:key=\"'tabla-de-datos-fila-cabecera-' + propIndex\">"
 + "                <div class=\"\">{{ root.$utilidades.humanizarTexto(propIndex) }}</div>"
 + "              </th>"
 + "            </template>"
 + "          </tr>"
 + "        </thead>"
 + "        <tbody v-for=\"dato, datoIndex in datos\" v-bind:key=\"'tabla-de-datos-fila-' + datoIndex\">"
 + "          <tr>"
 + "            <td v-for=\"prop, propIndex in dato\" v-bind:key=\"'tabla-de-datos-fila-' + datoIndex + '-celda-' + propIndex\">"
 + "              <div v-if=\"propIndex === 'id'\">"
 + "                <div v-if=\"modo === 'navegador'\">"
 + "                  <button class=\"boton_de_tabla_1\" v-on:click=\"() => alClicar(this, dato, datoIndex, prop, propIndex)\">"
 + "                    Ir a {{ prop }}"
 + "                  </button>"
 + "                </div>"
 + "                <div v-if=\"modo === 'selector'\">"
 + "                  <button class=\"boton_de_tabla_1\" v-on:click=\"() => this.seleccionarItem(dato)\">"
 + "                    {{ seleccion === dato ? \"x\" : \"\" }}"
 + "                  </button>"
 + "                  <span>{{ root.$utilidades.abreviarTexto(prop, 50) }}</span>"
 + "                </div>"
 + "                <div v-if=\"modo === 'selector múltiple'\">"
 + "                  <button class=\"boton_de_tabla_1\" v-on:click=\"() => seleccionarItem(dato)\">"
 + "                    {{ seleccion.indexOf(dato) !== -1 ? \"x\" : \"\" }}"
 + "                  </button>"
 + "                  <span>{{ root.$utilidades.abreviarTexto(prop, 50) }}</span>"
 + "                </div>"
 + "              </div>"
 + "              <div v-else>"
 + "              {{ root.$utilidades.abreviarTexto(prop, 50) }}"
 + "              </div>"
 + "            </td>"
 + "          </tr>"
 + "        </tbody>"
 + "      </table>"
 + "    </div>"
 + "    <div v-else>"
 + "      No se encontraron instancias de «{{ tabla }}» con los parámetros actuales."
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
},
tablaProp:{ type:String,
required:true
},
filtrosProp:{ type:Array,
default:() => {try {
return [  ];
} catch(error) {
console.log(error);
throw error;
}

}
},
ordenProp:{ type:Array,
default:() => {try {
return [ [ "id",
"DESC" ] ];
} catch(error) {
console.log(error);
throw error;
}

}
},
paginaProp:{ type:Number,
default:1
},
itemsProp:{ type:Number,
default:20
},
modoProp:{ type:String,
default:"navegador"
},
alClicarProp:{ type:Function,
default:function() {
}
}
},
data() {try {
return { seleccion:undefined,
datos:undefined,
tabla:this.tablaProp,
filtros:this.filtrosProp,
orden:this.ordenProp,
pagina:this.paginaProp,
items:this.itemsProp,
modo:this.modoProp,
alClicar:this.alClicarProp
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async irAPaginaPrimera() {try {
this.pagina = 1;
(await this.obtenerDatos(  ));
} catch(error) {
console.log(error);
throw error;
}

},
async irAPaginaAnterior() {try {
if(this.pagina < 1) {
this.pagina = 1;
}
if(this.pagina === 1) {
return;
}
this.pagina -= 1;
(await this.obtenerDatos(  ));
} catch(error) {
console.log(error);
throw error;
}

},
async irAPaginaSiguiente() {try {
if((!(this.datos.length === 20))) {
return;
}
this.pagina += 1;
(await this.obtenerDatos(  ));
if(this.datos.length === 0) {
(await this.irAPaginaAnterior(  ));
}
} catch(error) {
console.log(error);
throw error;
}

},
seleccionarItem( dato ) {try {
if(this.modo === "selector múltiple") {
if((!(Array.isArray(this.seleccion)))) {
this.seleccion = [ dato ];
}
else {
const posicionActual = this.seleccion.indexOf( dato );
if(posicionActual === 0 - 1) {
this.seleccion.push( dato );
}
else {
this.seleccion.splice( posicionActual,
1 );
}
}
}
if(this.modo === "selector") {
if(typeof this.seleccion === 'object' && this.seleccion === dato) {
this.seleccion = undefined;
}
else {
this.seleccion = dato;
}
}
} catch(error) {
console.log(error);
throw error;
}

},
async obtenerDatos() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("http://127.0.0.1:5054/ConsultarDatos", "POST", { tabla:this.tabla,
filtros:this.filtros,
orden:this.orden,
pagina:this.pagina,
items:this.items
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
this.datos = respuesta_1.data.data.datos;
this.$forceUpdate( true );
} catch(error) {
this.root.gestionarError( error );}
}
},
watch:{ 
},
beforeMount() {
},
async mounted() {try {
(await this.obtenerDatos(  ));
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);