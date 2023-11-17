module.exports = class {
    action(response, error) {
        this.api.Utilities.Trace("api.Utilities.DispatchError");
        return response.status(500).json({
            app: process.env.APP_IDENTIFIER,
            time: this.api.Utilities.GetDateToString(new Date()),
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        });
    }
};