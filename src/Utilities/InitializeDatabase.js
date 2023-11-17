const fs = require("fs");

module.exports = class {
    async action() {
        this.api.Utilities.Trace("api.Utilities.InitializeDatabase");
        await this.parseCreationScript();
        await this.applyCreationScript();
        await this.applyMigrationScript();
    }
    parseCreationScript() {
      const creationScript = fs.readFileSync(__dirname + "/../Database/scripts/creation.sql").toString();
      const ast = this.api.Utilities.ParseHql(creationScript);
      this.api.Database.Schema = ast;
    }
    async applyCreationScript() {
      const creationScript = fs.readFileSync(__dirname + "/../Database/scripts/creation.sql").toString();
      const creationSentences = creationScript.split(/;[ \t]*(\n)/g).filter(text => text.trim().length !== 0);
      for(let index=0; index<creationSentences.length; index++) {
        const creationSentence = creationSentences[index].trim();
        await this.api.Database.Connection.Execute(creationSentence);
      }
    }
    async applyMigrationScript() {
      const migrationScript = fs.readFileSync(__dirname + "/../Database/scripts/migration.sql").toString();
      const migrationSentences = migrationScript.split(/;[ \t]*(\n)/g).filter(text => text.trim().length !== 0);
      for(let index=0; index<migrationSentences.length; index++) {
        const migrationSentence = migrationSentences[index].trim();
        await this.api.Database.Connection.Execute(migrationSentence);
      }
    }
}