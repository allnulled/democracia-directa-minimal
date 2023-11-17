
window.WinVentana = Castelog.metodos.un_componente_vue2("WinVentana",
  "<div class=\"WinVentana Component\">"
 + "    <div class=\"win_ventana width_100\">"
 + "      <div class=\"window\">"
 + "        <div class=\"title-bar\">"
 + "          <div class=\"title-bar-text\">{{ titulo }}</div>"
 + "        </div>"
 + "        <div class=\"window-body\">"
 + "          <slot></slot>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { props:{ titulo:{ type:String,
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