Object.defineProperty(exports, '__esModule', { value: true });
class Service {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return this.model.findAll({ where: { isDeleted: false } });
    }
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
    create(entity) {
        return this.model.create(entity);
    }
    update(id, fields) {
        return this.model.update(fields, { where: { id } });
    }
    delete(id) {
        return this.model.destroy({ where: { id } });
    }
}
exports.default = Service;
// # sourceMappingURL=Service.js.map
