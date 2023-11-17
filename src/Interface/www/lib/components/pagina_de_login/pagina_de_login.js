
window.PaginaDeLogin = Castelog.metodos.un_componente_vue2("PaginaDeLogin",
  "<div class=\"PaginaDeLogin Component\">"
 + "    <div class=\"pagina_de_login_caja_1\" style=\"background-color: #333;\">"
 + "      <h5>🌐 Login</h5>"
 + "      <div class=\"pagina_de_login_caja_2\">"
 + "        <div class=\"pagina_de_login_caja_3\">"
 + "          <div class=\"pagina_de_login_caja_4\">"
 + "            <div class=\"pagina_de_login_caja_5\">"
 + "              <div class=\"window\">"
 + "                <div class=\"title-bar\">"
 + "                  <div class=\"title-bar-text\">Se requiere login.</div>"
 + "                  <div class=\"title-bar-controls\"></div>"
 + "                </div>"
 + "                <div class=\"window-body\">"
 + "                  <div class=\"padding_1\">"
 + "                    <div class=\"etiqueta_de_formulario_1\">Introduce el usuario:</div>"
 + "                    <input class=\"width_100\" type=\"text\" v-model=\"nombre\" name=\"user\" />"
 + "                  </div>"
 + "                  <div class=\"padding_1\">"
 + "                    <div class=\"etiqueta_de_formulario_1\">Introduce la contraseña:</div>"
 + "                    <input class=\"width_100\" type=\"password\" v-model=\"contrasenya\" name=\"password\" />"
 + "                  </div>"
 + "                  <div class=\"etiqueta_de_boton_1 text_align_right\">"
 + "                    <div class=\"padding_1 padding_top_0\">"
 + "                      <button class=\"\" v-on:click=\"() => login()\">Entrar</button>"
 + "                    </div>"
 + "                  </div>"
 + "                </div>"
 + "              </div><!-- window -->"
 + "            </div>"
 + "          </div>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { nombre:"",
contrasenya:""
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ login() {try {
return this.root.login( this.nombre,
this.contrasenya );
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
mounted() {
}
};},
  null);