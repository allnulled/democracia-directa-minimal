
require(__dirname + "/lib/calo/calo.js");
const test_de_ciclo_democratico = require(__dirname + "/tests/ciclo_democratico/test_de_ciclo_democratico.js");
const main = async function() {try {
(await test_de_ciclo_democratico(  ));
} catch(error) {
console.log(error);
throw error;
}

};
main(  );