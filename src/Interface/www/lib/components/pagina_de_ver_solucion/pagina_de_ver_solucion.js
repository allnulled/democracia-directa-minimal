
window.PaginaDeVerSolucion = Castelog.metodos.un_componente_vue2("PaginaDeVerSolucion",
  "<div class=\"PaginaDeVerSolucion Component\">"
 + "    <WinVentana titulo=\"🌐 Ver solución\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver soluciones',link:'/VerSoluciones'},{texto: 'Ver solución',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Solucion\" :id-prop=\"this.$route.params.id_solucion\" />"
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
 + "        <router-link class=\"col-6\" :to=\"'/CrearImplementacion/' + $route.params.id_solucion\">"
 + "          <button class=\"width_100\">Crear implementación</button>"
 + "        </router-link>"
 + "        <router-link class=\"col-6\" :to=\"'/VerImplementaciones?' + root.$utilidades.crearParametrosQuerystring(busqueda)\">"
 + "          <button class=\"width_100\">Ver implementaciones</button>"
 + "        </router-link>"
 + "      </div>"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 danger_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarEnContra('id_solucion', this.$route.params.id_solucion)\">Votar en contra</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 neutral_button\" :disabled=\"!haVotadoYa\" v-on:click=\"() => retirarVoto(votoPrevio.id)\">Retirar voto</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 success_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarAFavor('id_solucion', this.$route.params.id_solucion)\">Votar a favor</button>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { votosTotales:0,
votoPrevio:undefined,
haVotadoYa:false,
busqueda:{ filtros:JSON.stringify([ [ "id_solucion",
"=",
this.$route.params.id_solucion ] ], null, 2)
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
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarVotos", "POST", { id_solucion:parseInt( this.$route.params.id_solucion )
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
this.votosTotales = respuesta_1.data.data.datos;
} catch(error) {
this.gestionarError( error );}
},
async obtenerVoto() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:"Voto",
filtros:[ [ "id_solucion",
"=",
parseInt( this.$route.params.id_solucion ) ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La consulta fue realizada correctamente")) throw new Error("Error en fichero [-] en posición [4605-4712=111:59-112:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La consulta fue realizada correctamente\"");
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
this.gestionarError( error );}
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