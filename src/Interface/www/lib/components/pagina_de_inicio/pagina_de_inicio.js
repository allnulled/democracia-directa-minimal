
window.PaginaDeInicio = Castelog.metodos.un_componente_vue2("PaginaDeInicio",
  "<div class=\"PaginaDeInicio Component\">"
 + "    <WinVentana titulo=\"🌐 Inicio\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:false}]\" />"
 + "      <div class=\"\">"
 + "        <div class=\"padding_1\">"
 + "          <ul class=\"row lista_grande_1\">"
 + "            <li class=\"col-6\">"
 + "              <router-link class=\"boton_grande_1\" to='/VerVotaciones?filtros=[[\"estado\", \"!=\", \"Histórico\"]]'>"
 + "                <span>Votaciones</span>"
 + "              </router-link>"
 + "            </li>"
 + "            <li class=\"col-6\">"
 + "              <router-link class=\"boton_grande_1\" to=\"/VerProblemas\">"
 + "                <span>Problemas</span>"
 + "              </router-link>"
 + "            </li>"
 + "            <li class=\"col-6\">"
 + "              <router-link class=\"boton_grande_1\" to=\"/VerSoluciones\">"
 + "                <span>Soluciones</span>"
 + "              </router-link>"
 + "            </li>"
 + "            <li class=\"col-6\">"
 + "              <router-link class=\"boton_grande_1\" to=\"/VerImplementaciones\">"
 + "                <span>Implementaciones</span>"
 + "              </router-link>"
 + "            </li>"
 + "            <li class=\"col-6\">"
 + "              <router-link class=\"boton_grande_1\" to=\"/VerSesion\">"
 + "                <span>Sesión</span>"
 + "              </router-link>"
 + "            </li>"
 + "          </ul>"
 + "        </div>"
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