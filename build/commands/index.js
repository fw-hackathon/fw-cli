// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../components/header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _inkGradient = _interopRequireDefault(require("ink-gradient"));

var _inkBigText = _interopRequireDefault(require("ink-big-text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = () => {
  return /*#__PURE__*/_react.default.createElement(_inkGradient.default, {
    name: "pastel"
  }, /*#__PURE__*/_react.default.createElement(_inkBigText.default, {
    text: "FW-CLI"
  }));
};

var _default = Header;
exports.default = _default;
},{}],"../components/topic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _axios = _interopRequireDefault(require("axios"));

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const parseRepos = repos => {
  const parse = 'fw-testing-';
  const data = [];
  repos.forEach(repo => {
    if (repo.name.includes(parse)) {
      repo.label = repo.name.split(parse)[1];
      data.push(repo);
    }
  });
  return data;
};

const Select = ({
  handleSelect
}) => {
  const [topics, setTopics] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    /**
     * 	{
    		"name": "master",
    		"commit": {
    		"sha": "b71ca551ba164f5f049eeafd8bbd0605c1325227",
    		"url": "https://api.github.com/repos/kentcdodds/testing-node-apps/commits/b71ca551ba164f5f049eeafd8bbd0605c1325227"
    		},
    		"protected": false
    		 },
     */
    async function getTopics() {
      const baseUrl = 'https://api.github.com/orgs/fw-hackathon/repos';
      const {
        data
      } = await _axios.default.get(baseUrl);
      /**
       * {
      	label: 'First',
      	value: 'first',
      	},
       */

      const topics = parseRepos(data).map(({
        name,
        label
      }) => ({
        label,
        value: name
      }));
      setTopics(topics);
      setLoading(false);
    }

    getTopics();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ink.Box, null, "Welcome to the tutorial, please select which topic you want to learn."), loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, {
    type: "dots"
  })), ' Fetching'), /*#__PURE__*/_react.default.createElement(_inkSelectInput.default, {
    items: topics,
    onSelect: handleSelect
  }));
};

var _default = Select;
exports.default = _default;
},{}],"../components/branch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _axios = _interopRequireDefault(require("axios"));

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Branch = ({
  topic,
  handleSelect,
  handleHighlight
}) => {
  const [branches, setBranches] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    /**
     * 	{
    		"name": "master",
    		"commit": {
    		"sha": "b71ca551ba164f5f049eeafd8bbd0605c1325227",
    		"url": "https://api.github.com/repos/kentcdodds/testing-node-apps/commits/b71ca551ba164f5f049eeafd8bbd0605c1325227"
    		},
    		"protected": false
    		 },
     */
    async function getBranches() {
      const baseUrl = `https://api.github.com/repos/fw-hackathon/${topic}/branches`;
      const {
        data
      } = await _axios.default.get(baseUrl);
      /**
       * {
      	label: 'First',
      	value: 'first',
      	},
       */

      const branches = data.map(({
        name
      }) => ({
        label: name,
        value: name
      }));
      const back = {
        label: '⏮  back to topics',
        value: 'back'
      };
      setBranches([...branches, back]);
      setLoading(false);
    }

    getBranches();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ink.Box, null, "Please select which lesson you want to start challenging."), loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, {
    type: "dots"
  })), ' Fetching'), branches.length === 1 && /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    red: true
  }, "No Lesson Yet..."), /*#__PURE__*/_react.default.createElement(_ink.Text, null, "please go back to topics")), /*#__PURE__*/_react.default.createElement(_inkSelectInput.default, {
    items: branches,
    onSelect: handleSelect,
    onHighlight: handleHighlight
  }));
};

var _default = Branch;
exports.default = _default;
},{}],"../components/readme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _inkMarkdown = _interopRequireDefault(require("ink-markdown"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BACK = 'back';

const Readme = ({
  topic,
  branch
}) => {
  const [md, setMd] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    async function getReadme() {
      const readme = await _axios.default.get(`https://raw.githubusercontent.com/fw-hackathon/${topic}/${branch}/README.md`);
      setMd(readme.data);
    }

    if (branch === BACK) {
      setMd('');
      return;
    }

    if (topic && branch) {
      getReadme();
    }
  }, [branch]);
  return /*#__PURE__*/_react.default.createElement(_inkMarkdown.default, null, md);
};

var _default = Readme;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _inkDivider = _interopRequireDefault(require("ink-divider"));

var _header = _interopRequireDefault(require("../components/header"));

var _topic = _interopRequireDefault(require("../components/topic"));

var _branch = _interopRequireDefault(require("../components/branch"));

var _readme = _interopRequireDefault(require("../components/readme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Index = () => {
  const [step, setStep] = (0, _react.useState)({
    index: 0,
    payload: []
  }); // go back

  const back = () => {
    // let payload = [...step.payload];
    // payload.pop();
    // payload.pop();
    // setStep({ index: step.index - 2, payload });
    setStep({
      index: 0,
      payload: []
    });
  }; // step 0


  const handleTopic = topic => {
    const {
      value
    } = topic;
    setStep({
      index: 1,
      payload: [...step.payload, value]
    });
  }; // step 1


  const handleBranch = branch => {
    const {
      value
    } = branch;

    if (value === 'back') {
      console.log(step.payload);
      back();
    } // checkout branch

  };

  const handleBranchHighlight = branch => {
    const {
      value
    } = branch;

    if (step.payload.length === 1) {
      setStep({
        index: 2,
        payload: [...step.payload, value]
      });
    } else if (step.payload.length === 2) {
      const originPayload = [...step.payload];
      originPayload.pop();
      setStep({
        index: 2,
        payload: [...originPayload, value]
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_header.default, null), step.index === 0 && /*#__PURE__*/_react.default.createElement(_topic.default, {
    handleSelect: handleTopic
  }), (step.index === 1 || step.index === 2) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_branch.default, {
    topic: step.payload[0],
    handleSelect: handleBranch,
    handleHighlight: handleBranchHighlight
  })), step.index === 2 && /*#__PURE__*/_react.default.createElement(_readme.default, {
    topic: step.payload[0],
    branch: step.payload[1]
  }), /*#__PURE__*/_react.default.createElement(_inkDivider.default, {
    title: '🚀🚀🚀'
  }));
};

var _default = Index;
exports.default = _default;
},{"../components/header":"../components/header.js","../components/topic":"../components/topic.js","../components/branch":"../components/branch.js","../components/readme":"../components/readme.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map