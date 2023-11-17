module.exports = class {
    action(dateString) {
        this.api.Utilities.Trace("api.Utilities.GetStringFromString");
        const date = new Date(dateString);
        if(isNaN(date)) {
            throw new Error("Required valid date format in «api.Utilities.GetStringFromString»");
        }
        return date;
    }
};