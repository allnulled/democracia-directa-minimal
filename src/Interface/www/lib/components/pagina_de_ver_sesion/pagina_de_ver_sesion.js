
window.PaginaDeVerSesion = Castelog.metodos.un_componente_vue2("PaginaDeVerSesion",
  "<div class=\"PaginaDeVerSesion Component\">"
 + "    <WinVentana titulo=\"🌐 Ver sesión\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver sesión',link:false}]\" />"
 + "      <div class=\"padding_1\">"
 + "        <div class=\"etiqueta_de_formulario_1\">"
 + "          Token de sesión actual:"
 + "        </div>"
 + "        <textarea class=\"width_100\" style=\"min-height: 70px;\" :value=\"root.tokenDeSesion\" disabled=\"true\"></textarea>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { 
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