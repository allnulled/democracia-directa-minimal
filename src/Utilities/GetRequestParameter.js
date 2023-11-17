module.exports = class {
    action(request, name, defaultValue = undefined) {
        this.api.Utilities.Trace("api.Utilities.GetRequestParameter");
        const bodyParameter = request.body[name];
        if(bodyParameter) {
            return bodyParameter;
        }
        const queryParameter = request.query[name];
        if(queryParameter) {
            return queryParameter;
        }
        const headerParameter = request.headers[name];
        if(headerParameter) {
            return headerParameter;
        }
        return defaultValue;
    }
};