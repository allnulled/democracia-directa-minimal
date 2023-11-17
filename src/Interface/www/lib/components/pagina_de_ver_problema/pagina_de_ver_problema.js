
window.PaginaDeVerProblema = Castelog.metodos.un_componente_vue2("PaginaDeVerProblema",
  "<div class=\"PaginaDeVerProblema Component\">"
 + "    <WinVentana titulo=\"🌐 Ver problema\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver problemas',link:'/VerProblemas'},{texto: 'Ver problema',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Problema\" :id-prop=\"this.$route.params.id_problema\" />"
 + "      <div class=\"padding_1 padding_top_0\">"
 + "        <div class=\"text_align_center\">"
 + "          <div class=\"\">"
 + "            <table class=\"tabla_de_votos\">"
 + "              <tr>"
 + "                <td class=\"text_align_center\">"
 + "                  <div class=\"etiqueta_de_votos\">"
 + "                  {{ votosTotales.negativos }} negativo{{ votosTotales.positivos === 1 ? '' : 's' }}"
 + "                  </div>"
 + "                </td>"
 + "                <td class=\"text_align_center\">"
 + "                  <div class=\"etiqueta_de_votos\">"
 + "                  {{ votosTotales.positivos }} positivo{{ votosTotales.positivos === 1 ? '' : 's' }}"
 + "                  </div>"
 + "                </td>"
 + "              </tr>"
 + "            </table>"
 + "          </div>"
 + "        </div>"
 + "      </div>"
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
 + "          <button class=\"width_100 danger_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarEnContra('id_problema', this.$route.params.id_problema)\">Votar en contra</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 neutral_button\" :disabled=\"!haVotadoYa\" v-on:click=\"() => retirarVoto(votoPrevio.id)\">Retirar voto</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 success_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarAFavor('id_problema', this.$route.params.id_problema)\">Votar a favor</button>"
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
return { votoPrevio:undefined,
votosTotales:0,
haVotadoYa:false,
busqueda:{ filtros:JSON.stringify([ [ "id_problema",
"=",
this.$route.params.id_problema ] ], null, 2)
}
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async votarEnContra( propiedad,
valor ) {try {
(await this.root.votarEnContra( propiedad,
valor ));
(await this.obtenerVoto(  ));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async retirarVoto( propiedad,
valor ) {try {
(await this.root.retirarVoto( propiedad,
valor ));
(await this.obtenerVoto(  ));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async votarAFavor( propiedad,
valor ) {try {
(await this.root.votarAFavor( propiedad,
valor ));
(await this.obtenerVoto(  ));
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
async obtenerTotalDeVotos() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarVotos", "POST", { id_problema:parseInt( this.$route.params.id_problema )
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
this.votosTotales = respuesta_1.data.data.datos;
} catch(error) {
console.log(error);
throw error;
}

},
async obtenerVoto() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:"Voto",
filtros:[ [ "id_problema",
"=",
parseInt( this.$route.params.id_problema ) ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La consulta fue realizada correctamente")) throw new Error("Error en fichero [-] en posición [4788-4895=115:59-116:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La consulta fue realizada correctamente\"");
if(respuesta_1.data.data.datos.length > 0) {
this.haVotadoYa = true;
this.votoPrevio = respuesta_1.data.data.datos[ 0 ];
}
else {
this.haVotadoYa = false;
this.votoPrevio = undefined;
}
(await this.obtenerTotalDeVotos(  ));
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
(await this.obtenerVoto(  ));
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);