const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Logger_1 = __importDefault(require('../loggers/Logger'));
exports.default = (_req, res, next) => {
    process.on('unhandledRejection', err => {
        Logger_1.default.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    process.on('uncaughtException', err => {
        Logger_1.default.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    next();
};
// # sourceMappingURL=ErrorHandler.js.map
