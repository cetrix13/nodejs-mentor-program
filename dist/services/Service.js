Object.defineProperty(exports, '__esModule', { value: true });
class Service {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return this.model.findAll({ where: { isDeleted: false } })
            .catch(err => console.error(err));
    }
    getById(id) {
        return this.model.findAll({ where: { id } })
            .catch(err => console.error(err));
    }
    create(entity) {
        return this.model.create(entity)
            .catch(err => console.error(err));
    }
    update(id, fields) {
        return this.model.update(fields, { where: { id } })
            .catch(err => console.error(err));
    }
    delete(id) {
        return this.model.destroy({ where: { id } })
            .catch(err => console.error(err));
    }
}
exports.default = Service;
// # sourceMappingURL=Service.js.map
