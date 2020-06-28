
            (function (modules) {
                const installedModules = []
                function __require__(moduleId) {
                    if (installedModules[moduleId]) {
                        return installedModules[moduleId].exports
                    }
                    const module = installedModules[moduleId] = {
                        i: moduleId,
                        exports: {},
                    }
                    modules[moduleId].call(module.exports, module, module.exports, __require__)
                    return module.exports
                }
                return __require__('./test/index.js')
            })({
                
                './test/index.js': function (module, exports, require) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = name;

var _a = _interopRequireDefault(require("./a.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

name('hello');

function name(params) {
  console.log("name:".concat(_a.default, "-").concat(params));
}
                },
            
                './a.js': function (module, exports, require) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 'cl';
exports.default = _default;
                },
            
            })
        