const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('@hapi/joi'));
exports.createGroupSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().required(),
    permissions: joi_1.default.array().items(joi_1.default.string()).required()
});
exports.updateGroupSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    name: joi_1.default.string(),
    permissions: joi_1.default.array().items(joi_1.default.string())
});
// # sourceMappingURL=GroupSchema.js.map
