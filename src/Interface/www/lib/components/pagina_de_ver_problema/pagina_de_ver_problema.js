
window.PaginaDeVerProblema = Castelog.metodos.un_componente_vue2("PaginaDeVerProblema",
  "<div class=\"PaginaDeVerProblema Component\">"
 + "    <WinVentana titulo=\"🌐 Ver problema\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver problemas',link:'/VerProblemas'},{texto: 'Ver problema',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Problema\" :id-prop=\"this.$route.params.id_problema\" />"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <router-link class=\"col-4\" :to=\"'/CrearSolucion/' + $route.params.id_problema\">"
 + "          <button class=\"width_100\">Crear solución</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-4\" :to=\"'/VerSoluciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver soluciones</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-4\" :to=\"'/VerImplementaciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver implementaciones</button>"
 + "        </router-link>"
 + "      </div>"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 danger_button\" v-on:click=\"() => root.votarEnContra('id_problema', $route.params.id_problema)\">Votar en contra</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 neutral_button\" v-on:click=\"() => root.retirarVoto('id_problema', $route.params.id_problema)\">Retirar voto</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 success_button\" v-on:click=\"() => root.votarAFavor('id_problema', $route.params.id_problema)\">Votar a favor</button>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
console.log('[DEBUG]', "PaginaDeVerProblema.data");
return { busqueda:{ filtros:JSON.stringify([ [ "id_problema",
"=",
this.$route.params.id_problema ] ], null, 2)
}
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ 
},
watch:{ 
},
beforeMount() {
},
async mounted() {
}
};},
  null);