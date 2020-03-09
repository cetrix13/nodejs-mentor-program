const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('@hapi/joi'));
exports.createUserSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    login: joi_1.default.string().required(),
    password: joi_1.default.string().alphanum().required(),
    age: joi_1.default.number().min(4).max(130).required(),
    isDeleted: joi_1.default.boolean().required()
});
exports.updateUserSchema = joi_1.default.object().keys({
    id: joi_1.default.number(),
    login: joi_1.default.string(),
    password: joi_1.default.string().alphanum(),
    age: joi_1.default.number().min(4).max(130),
    isDeleted: joi_1.default.boolean()
});
// # sourceMappingURL=UserSchema.js.map
