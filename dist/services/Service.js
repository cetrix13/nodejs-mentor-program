const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Logger_1 = __importDefault(require('../loggers/Logger'));
class Service {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return this.model.findAll({ where: { isDeleted: false } })
            .catch(err => Logger_1.default.error(err.message));
    }
    getById(id) {
        return this.model.findAll({ where: { id } })
            .catch(err => Logger_1.default.error(err.message));
    }
    create(entity) {
        return this.model.create(entity)
            .catch(err => Logger_1.default.error(err.message));
    }
    update(id, fields) {
        return this.model.update(fields, { where: { id } })
            .catch(err => Logger_1.default.error(err.message));
    }
    delete(id) {
        return this.model.destroy({ where: { id } })
            .catch(err => Logger_1.default.error(err.message));
    }
}
exports.default = Service;
// # sourceMappingURL=Service.js.map
