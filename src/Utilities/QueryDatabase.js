module.exports = class {
    action(query) {
        this.api.Utilities.Trace("api.Utilities.QueryDatabase");
        return this.api.Database.Connection.Execute(query);
    }
}