
window.PaginaDeVerVotaciones = Castelog.metodos.un_componente_vue2("PaginaDeVerVotaciones",
  "<div class=\"PaginaDeVerVotaciones Component\">"
 + "    <WinVentana titulo=\"🌐 Ver votaciones\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver votaciones',link:false}]\" />"
 + "      <div class=\"padding_1\">"
 + "        <ExploradorDeDatos ref=\"explorador\""
 + "          :root=\"root\""
 + "          tabla-prop=\"Votacion\""
 + "          :filtros-prop=\"filtros\""
 + "          :orden-prop=\"orden\""
 + "          :pagina-prop=\"pagina\""
 + "          :items-prop=\"items\""
 + "          :al-clicar-prop=\"(componente, dato) => $router.history.push('/VerVotacion/' + dato.id)\""
 + "        />"
 + "        <div class=\"padding_top_1 row\" v-if=\"esAdministrador\">"
 + "          <router-link class=\"col-12\" :to=\"'/CrearVotacion'\">"
 + "            <button class=\"width_100\">Crear votación</button>"
 + "          </router-link>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { esAdministrador:false,
filtros:[  ],
orden:[ [ "id",
"DESC" ] ],
pagina:1,
items:20
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