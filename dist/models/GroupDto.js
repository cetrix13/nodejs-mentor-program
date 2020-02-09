Object.defineProperty(exports, '__esModule', { value: true });
const helpers_1 = require('../helpers');
class Group {
    constructor(id, name, permissions) {
        this.id = id || helpers_1.uniqueID();
        this.name = name;
        this.permissions = permissions;
    }
}
exports.default = Group;
// # sourceMappingURL=GroupDto.js.map
