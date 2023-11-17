module.exports = class {
    action() {
        this.api.Utilities.Trace("api.Utilities.GetDatabaseConnection");
        return this.api.Database.Connection;
    }
};