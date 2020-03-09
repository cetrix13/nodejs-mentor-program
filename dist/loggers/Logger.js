const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const winston_1 = __importDefault(require('winston'));
exports.default = winston_1.default.createLogger({
    level: 'error',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' })
    ]
});
// # sourceMappingURL=Logger.js.map
