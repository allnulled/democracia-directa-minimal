
window.PaginaDeVerSolucion = Castelog.metodos.un_componente_vue2("PaginaDeVerSolucion",
  "<div class=\"PaginaDeVerSolucion Component\">"
 + "    <WinVentana titulo=\"🌐 Ver solución\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver soluciones',link:'/VerSoluciones'},{texto: 'Ver solución',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Solucion\" :id-prop=\"this.$route.params.id_solucion\" />"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <router-link class=\"col-6\" :to=\"'/CrearImplementacion/' + $route.params.id_solucion\">"
 + "          <button class=\"width_100\">Crear implementación</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-6\" :to=\"'/VerImplementaciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver implementaciones</button>"
 + "        </router-link>"
 + "      </div>"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 danger_button\" v-on:click=\"() => root.votarEnContra('id_solucion', $route.params.id_solucion)\">Votar en contra</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 neutral_button\" v-on:click=\"() => root.retirarVoto('id_solucion', $route.params.id_solucion)\">Retirar voto</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 success_button\" v-on:click=\"() => root.votarAFavor('id_solucion', $route.params.id_solucion)\">Votar a favor</button>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { busqueda:{ filtros:JSON.stringify([ [ "id_solucion",
"=",
this.$route.params.id_solucion ] ], null, 2)
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