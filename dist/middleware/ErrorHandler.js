Object.defineProperty(exports, '__esModule', { value: true });
exports.default = (_req, res, next) => {
    process.on('unhandledRejection', err => {
        console.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    process.on('uncaughtException', err => {
        console.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    next();
};
// # sourceMappingURL=ErrorHandler.js.map
