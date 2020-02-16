Object.defineProperty(exports, '__esModule', { value: true });
exports.default = (req, _res, next) => {
    const { url = '', method = '' } = req;
    console.log(`Logged ${method} ${url} -- ${new Date().toUTCString()}`);
    next();
};
// # sourceMappingURL=CustomLogger.js.map
