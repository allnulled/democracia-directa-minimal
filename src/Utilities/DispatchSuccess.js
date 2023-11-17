module.exports = class {
    action(response, data) {
        this.api.Utilities.Trace("api.Utilities.DispatchSuccess");
        return response.status(200).json({
            app: process.env.APP_IDENTIFIER,
            time: this.api.Utilities.GetDateToString(new Date()),
            data
        });
    }
};