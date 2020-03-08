var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.reversedStr = (input) => (input.split('').reverse().join(''));
exports.uniqueID = (() => {
    let count = 0;
    return () => ++count;
})();
exports.errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};
exports.validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error && error.isJoi) {
            res.status(400).json(exports.errorResponse(error.details));
        }
        else {
            return next();
        }
    };
};
exports.showMainPage = () => {
    return (_req, res) => {
        res.sendFile(path_1.default.join(__dirname + '/../src/index.html'));
    };
};
//# sourceMappingURL=helpers.js.map