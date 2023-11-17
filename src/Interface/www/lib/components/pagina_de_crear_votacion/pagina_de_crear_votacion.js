
window.PaginaDeCrearVotacion = Castelog.metodos.un_componente_vue2("PaginaDeCrearVotacion",
  "<div class=\"PaginaDeCrearVotacion Component\">"
 + "    <WinVentana titulo=\"🌐 Crear votación\">"
 + "      <MigasDePan :root=\"root\" :migas=\"[{texto: 'Inicio',link:'/'},{texto: 'Ver votaciones', link: '/VerVotaciones'},{texto: 'Crear votación',link: false}]\" />"
 + "      <div class=\"\">"
 + "        <div class=\"padding_1 visor_de_dato\">"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Presentación:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <textarea class=\"\" v-model=\"presentacion\"></textarea>"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Estado:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <select disabled=\"true\" v-model=\"estado\">"
 + "                <option value=\"Presentación\">Presentación</option>"
 + "                <option value=\"Problemas\">Problemas</option>"
 + "                <option value=\"Soluciones\">Soluciones</option>"
 + "                <option value=\"Implementaciones\">Implementaciones</option>"
 + "                <option value=\"Aplicaciones\">Aplicaciones</option>"
 + "                <option value=\"Histórico\">Histórico</option>"
 + "              </select>"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Fecha de presentación:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"date\" v-model=\"fecha_de_presentacion\" />"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Fecha de problemas:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"date\" v-model=\"fecha_de_problemas\" />"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Fecha de soluciones:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"date\" v-model=\"fecha_de_soluciones\" />"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Fecha de implementaciones:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"date\" v-model=\"fecha_de_implementaciones\" />"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <div class=\"item_de_campo\">"
 + "            <div class=\"etiqueta_de_campo\">"
 + "              <span>Fecha de aplicaciones:</span>"
 + "            </div>"
 + "            <div class=\"valor_de_campo\">"
 + "              <input type=\"date\" v-model=\"fecha_de_aplicaciones\" />"
 + "            </div>"
 + "          </div>"
 + ""
 + "          <hr />"
 + ""
 + "          <div class=\"padding_1 padding_top_0 padding_bottom_0\">"
 + "            <button class=\"width_100\" v-on:click=\"() => crearVotacion()\">Crear votación</button>"
 + "          </div>"
 + ""
 + "        </div>"
 + "      </div>"
 + "    </WinVentana>"
 + "  </div>",
  function(component) {return { props:{ root:{ type:Object,
required:true
}
},
data() {try {
return { presentacion:"",
estado:"Presentación",
fecha_de_presentacion:undefined,
fecha_de_problemas:undefined,
fecha_de_soluciones:undefined,
fecha_de_implementaciones:undefined,
fecha_de_aplicaciones:undefined
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ async crearVotacion() {try {
const respuesta_1 = (await Castelog.metodos.una_peticion_http("/CrearVotacion", "POST", { presentacion:this.presentacion,
estado:this.estado,
fecha_de_presentacion:this.fecha_de_presentacion,
fecha_de_problemas:this.fecha_de_problemas,
fecha_de_soluciones:this.fecha_de_soluciones,
fecha_de_implementaciones:this.fecha_de_implementaciones,
fecha_de_aplicaciones:this.fecha_de_aplicaciones
}, { authorization:this.root.tokenDeSesion
}, null, error => {
this.root.gestionarError( error );}));
if(!(respuesta_1.data.data.mensaje === "La votación fue insertada correctamente")) throw new Error("Error en fichero [-] en posición [4409-4516=124:59-125:107] cuando: " + "compruebo que respuesta_1.data.data.mensaje es igual que \"La votación fue insertada correctamente\"");
const idVotacion = respuesta_1.data.data.id;
this.$router.history.push( "/VerVotacion/" + idVotacion );
} catch(error) {
this.root.gestionarError( error );}
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