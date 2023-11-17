const hqlParser = require(__dirname + "/../Resources/hyper-query-language.js");

module.exports = class {
    action(text, options = {}) {
        this.api.Utilities.Trace("api.Utilities.ParseHql");
        const ast = hqlParser.parse(text, options);
        return ast;
    }
};