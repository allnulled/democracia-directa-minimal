
window.PaginaDeVerImplementaciones = Castelog.metodos.un_componente_vue2("PaginaDeVerImplementaciones",
  "<div class=\"PaginaDeVerImplementaciones Component\">"
 + "    <WinVentana titulo=\"🌐 Ver implementaciones\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver implementaciones',link:false}]\" />"
 + "      <div class=\"padding_1\">"
 + "        <ExploradorDeDatos ref=\"explorador\""
 + "          :root=\"root\""
 + "          tabla-prop=\"Implementacion\""
 + "          :filtros-prop=\"filtros\""
 + "          :orden-prop=\"orden\""
 + "          :pagina-prop=\"pagina\""
 + "          :items-prop=\"items\""
 + "          :al-clicar-prop=\"(componente, dato) => $router.history.push('/VerImplementacion/' + dato.id)\""
 + "        />"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
console.log('[DEBUG]', "PaginaDeVerImplementaciones.data");
const filtrosJson = this.$route.query.filtros;
const filtros = JSON.parse( filtrosJson || "[]" );
const ordenJson = this.$route.query.orden;
const orden = JSON.parse( ordenJson || '[["id","DESC"]]' );
return { filtros,
orden,
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
mounted() {
}
};},
  null);