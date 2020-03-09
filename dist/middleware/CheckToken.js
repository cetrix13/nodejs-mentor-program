const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const constants_1 = require('../constants');
exports.default = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ status: false, message: 'No token provided' });
    } else {
        return jsonwebtoken_1.default.verify(token, constants_1.SECRET_KEY, (err) => {
            if (err) {
                res.status(403).send({ status: false, message: 'Failed to authenticate token' });
            }
            next();
        });
    }
};
// # sourceMappingURL=CheckToken.js.map
