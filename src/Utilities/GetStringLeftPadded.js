module.exports = class {
    action(text, spaces = 2, padding = "0") {
        this.api.Utilities.Trace("api.Utilities.GetStringLeftPadded");
        let output = "" + text;
        while(output.length < spaces) {
            output = padding + output;
        }
        return output;
    }
};