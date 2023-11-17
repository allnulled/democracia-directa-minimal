const DEFAULT_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

module.exports = class {
    action(len = 100, alphabet = DEFAULT_ALPHABET) {
        this.api.Utilities.Trace("api.Utilities.GetRandomString");
        let output = "";
        while(output.length < len) {
            output += alphabet[Math.floor(Math.random()*alphabet.length)];;
        }
        return output;
    }
};