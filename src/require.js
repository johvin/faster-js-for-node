function myRequire(cwd, realRequire) {
  if (cwd == undefined) {
    throw new Error('cwd is required');
  }
  if (realRequire == undefined) {
    throw new Error('require is required');
  }
  this.realRequire = realRequire;
  this.paths = this.getModulePaths(this.cwd = cwd);
}

myRequire.prototype.getModulePaths = function getModulePaths(cwd) {
  var mPaths = [];
  var path = this.realRequire('path');
  var cur = cwd, prev;
  while( cur !== prev ) {
    mPaths.push(path.join(cur, 'node_modules'));
    prev = cur;
    cur = path.dirname(prev);
  }
  return mPaths;
};

myRequire.prototype.customRequire = function customRequire(module) {
  // if module is a babel plugin, return plugin's name
  if (module.indexOf('babel-plugin-') === 0) return module;

  // if module is neither a babel plugin nor preset,
  // use system require to load the module
  //
  // note: modules like this actually do not contain preset or plugin
  // if this assumption is proved to be wrong,
  // this function should be rewrited.
  if (module.indexOf('babel-preset-') === -1) {
    return this.realRequire(module);
  }

  // deal with babel preset
  var entryPath = this.getModuleEntryFilePath(module);
  var mContent = this.getFileContent(entryPath);
  return this.getPresetExport(entryPath, mContent);
};

myRequire.prototype.getPresetExport = function getPresetExport(presetPath, presetCode) {
  var m = {
    exports: {}
  };
  var f = new Function('exports', 'require', 'module', '__filename', '__dirname', presetCode);
  f.call(m.exports, m.exports, this.customRequire.bind(this), m, presetPath, this.realRequire('path').dirname(presetPath));
  return m.exports;
};

myRequire.prototype.getFileContent = function getFileContent(filepath) {
  return this.realRequire('fs').readFileSync(filepath, 'utf8');
};

myRequire.prototype.getModuleEntryFilePath = function getModuleEntryFilePath(moduleName) {
  var path = this.realRequire('path');
  var fs = this.realRequire('fs');
  var entryFileName, pjson, pkgPath, moduleDir;
  var findRoot;
  var paths = this.paths.slice();
  while(findRoot = paths.shift()) {
    moduleDir = path.join(findRoot, moduleName);
    try {
      fs.statSync(moduleDir);
    } catch(e) {
      // moduleDir 不存在
      continue;
    }

    pkgPath = path.join(moduleDir, 'package.json');
    try {
      pjson = JSON.parse(this.getFileContent(pkgPath));
    } catch (e) {}

    entryFileName = pjson && pjson.main || 'index.js';
    break;
  }

  if ( !entryFileName ) {
    throw new Error(`can't not find module ${moduleName} or its entry file`);
  }

  return path.join(findRoot, moduleName, entryFileName);
};

module.exports = myRequire;