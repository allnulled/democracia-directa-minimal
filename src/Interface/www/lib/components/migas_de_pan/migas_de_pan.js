
window.MigasDePan = Castelog.metodos.un_componente_vue2("MigasDePan",
  "<div class=\"MigasDePan Component\">"
 + "    <h5>"
 + "      <table>"
 + "        <tr>"
 + "          <td class=\"width_100\">"
 + "            <span>🌐 </span>"
 + "            <template v-for=\"miga, miga_index in migasData\">"
 + "              <span class=\"miga\" v-bind:key=\"'migas-de-pan-item-' + miga_index\">"
 + "                <span v-if=\"miga_index !== 0\">"
 + "                  » "
 + "                </span>"
 + "                <router-link v-if=\"miga.link\" :to=\"miga.link\">{{ miga.texto }}</router-link>"
 + "                <span v-else=\"\">{{ miga.texto }}</span>"
 + "              </span>"
 + "            </template>"
 + "          </td>"
 + "          <td>"
 + "            <button class=\"width_auto min_width_auto\" :class=\"{active: parametrosSeleccionadosData}\" v-on:click=\"() => alternarParametrosSeleccionados()\">...</button>"
 + "          </td>"
 + "        </tr>"
 + "      </table>"
 + "    </h5>"
 + "    <template v-if=\"parametrosSeleccionadosData && Object.keys(parametrosData).length\">"
 + "      <h5 style=\"border-top: 1px solid #CCC;\">"
 + "        <table>"
 + "          <tr v-for=\"parametro, parametro_index in parametrosData\" v-bind:key=\"'parametro-' + parametro_index\">"
 + "            <td colspan=\"100\">"
 + "              <span class=\"migas_de_pan_parametros_1\"><span class=\"etiqueta_de_parametro_1\">{{ parametro_index }}=</span>{{ parametro }}</span>"
 + "            </td>"
 + "          </tr>"
 + "        </table>"
 + "      </h5>"
 + "    </template>"
 + "  </div>",
  function(component) {return { props:{ migas:{ type:Array,
required:true
}
},
data() {try {
return { parametrosSeleccionadosData:false,
parametrosData:this.$route.query,
migasData:this.migas
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ alternarParametrosSeleccionados() {try {
this.parametrosSeleccionadosData = (!(this.parametrosSeleccionadosData));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
obtenerDatos() {try {
this.parametrosData = this.$route.query;
this.migasData = this.$route.path;
console.log(this.$route);
} catch(error) {
console.log(error);
throw error;
}

}
},
watch:{ $route( valor ) {try {
this.obtenerDatos(  );
} catch(error) {
console.log(error);
throw error;
}

}
},
beforeMount() {
},
mounted() {
}
};},
  null);