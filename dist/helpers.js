Object.defineProperty(exports, '__esModule', { value: true });
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
            aboartEarly: false,
            allowUnknown: false
        });
        if (error && error.isJoi) {
            res.status(400).json(exports.errorResponse(error.details));
        } else {
            return next();
        }
    };
};
// # sourceMappingURL=helpers.js.map
