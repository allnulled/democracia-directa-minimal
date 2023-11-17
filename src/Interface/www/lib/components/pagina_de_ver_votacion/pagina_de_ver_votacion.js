
window.PaginaDeVerVotacion = Castelog.metodos.un_componente_vue2("PaginaDeVerVotacion",
  "<div class=\"PaginaDeVerVotacion Component\">"
 + "    <WinVentana titulo=\"🌐 Ver votación\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver votaciones',link:'/VerVotaciones'},{texto: 'Ver votación',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Votacion\" :id-prop=\"this.$route.params.id_votacion\" />"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <router-link class=\"col-6\" :to=\"'/CrearProblema/' + $route.params.id_votacion\">"
 + "          <button class=\"width_100\">Crear problema</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-6\" :to=\"'/VerProblemas?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver problemas</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-6\" :to=\"'/VerSoluciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver soluciones</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-6\" :to=\"'/VerImplementaciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver implementaciones</button>"
 + "        </router-link>"
 + "        <div class=\"col-12\" v-if=\"esAdministrador\">"
 + "          <button class=\"width_100\" v-on:click=\"() => progresarEstadoDeVotacion()\">Progresar estado</button>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
console.log('[DEBUG]', "PaginaDeVerVotacion.data");
return { esAdministrador:false,
busqueda:{ filtros:JSON.stringify([ [ "id_votacion",
"=",
this.$route.params.id_votacion ] ], null, 2)
}
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async progresarEstadoDeVotacion() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ProgresarEstadoDeVotacion", "POST", { id_votacion:parseInt( this.$route.params.id_votacion )
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
console.log(respuesta_1);
console.log(respuesta_1.data);
this.$router.history.push( "/VerVotaciones" );
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
this.esAdministrador = this.root.permisos.reduce( ( salida,
permiso ) => {try {
if(permiso.nombre === "permiso de administración") {
salida = true;
}
return salida;
} catch(error) {
console.log(error);
throw error;
}

},
false );
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);