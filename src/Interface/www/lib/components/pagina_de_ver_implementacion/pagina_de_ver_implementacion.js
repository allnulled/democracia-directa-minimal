
window.PaginaDeVerImplementacion = Castelog.metodos.un_componente_vue2("PaginaDeVerImplementacion",
  "<div class=\"PaginaDeVerImplementacion Component\">"
 + "    <WinVentana titulo=\"🌐 Ver implementación\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver implementaciones',link:'/VerImplementaciones'},{texto: 'Ver implementación',link:false}]\" />"
 + "      <VisorDeDato :root=\"root\" tabla-prop=\"Implementacion\" :id-prop=\"this.$route.params.id_implementacion\" />"
 + "      <div class=\"padding_1 padding_top_0 row\">"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 danger_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarEnContra('id_implementacion', this.$route.params.id_implementacion)\">Votar en contra</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 neutral_button\" :disabled=\"!haVotadoYa\" v-on:click=\"() => retirarVoto(votoPrevio.id)\">Retirar voto</button>"
 + "        </div>"
 + "        <div class=\"col-4\">"
 + "          <button class=\"width_100 success_button\" :disabled=\"haVotadoYa\" v-on:click=\"() => votarAFavor('id_implementacion', this.$route.params.id_implementacion)\">Votar a favor</button>"
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { votoPrevio:undefined,
haVotadoYa:false
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
async obtenerVoto() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/ConsultarDatos", "POST", { tabla:"Voto",
filtros:[ [ "id_implementacion",
"=",
parseInt( this.$route.params.id_implementacion ) ] ]
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La consulta fue realizada correctamente")) throw new Error("Error en fichero [-] en posición [2753-2860=62:59-63:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La consulta fue realizada correctamente\"");
if(respuesta_1.data.data.datos.length > 0) {
this.haVotadoYa = true;
this.votoPrevio = respuesta_1.data.data.datos[ 0 ];
}
else {
this.haVotadoYa = false;
this.votoPrevio = undefined;
}
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