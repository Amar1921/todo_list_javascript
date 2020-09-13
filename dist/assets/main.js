/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// DOM selection\nconst list = document.getElementById('list')\nconst input = document.getElementById('input')\nconst add = document.getElementById('add')\nconst clear = document.getElementById('clear')\nconst url = document.getElementById('url')\nconst load = document.getElementById('load')\n\n// Nouvelle instance pour la clé 'tasks'\nconst storage = new ArrayStorage('tasks')\n\n// On récupère le tableau des tâches déjà existantes ou bien un tableau vide\nconst tasks = storage.list\n\n// Une fonction qui ajoute les tâches au DOM avec un bouton de suppression auquel on attache un évènement\nfunction taskToDOM(task) {\n  // Si on a une chaîne non-vide\n  if (typeof task === 'string' && task) {\n    const li = document.createElement('li')\n    const remove = document.createElement('button')\n\n    li.textContent = task\n    remove.textContent = 'REMOVE'\n\n    remove.addEventListener('click', () => {\n      const value = remove.parentNode.firstChild.textContent\n      storage.remove(value)\n      list.removeChild(remove.parentNode)\n    })\n\n    li.appendChild(remove)\n\n    list.insertBefore(li, list.firstChild)\n\n    return true\n  }\n  return false\n}\n\n// On ajoute chaque tâche à la liste à puces\ntasks.forEach(task => taskToDOM(task))\n\n// On gère l'ajout de tâche avec le bouton ADD et la touche 'Enter'\nfunction newTask() {\n  if (storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)) {\n    storage.set(input.value)\n    input.value = ''\n  }\n  input.focus()\n}\n\nadd.addEventListener('click', newTask)\ninput.addEventListener('keydown', e => {\n  if (e.key === 'Enter') {\n    newTask()\n  }\n})\n\n// On supprime la liste du DOM et du navigateur\nclear.addEventListener('click', () => {\n  storage.clear()\n  list.innerHTML = ''\n})\n\n// On gère l'importation de tâches\nload.addEventListener('click', () => {\n  fetch(url.value)\n    .then(response => {\n      if (response.ok) {\n        return response.json()\n      }\n      throw new Error(`${response.statusText} (${response.status})`)\n    })\n    .then(tasks => {\n      if (Array.isArray(tasks)) {\n        tasks.forEach(task => {\n          if (storage.list.indexOf(task) === -1 && taskToDOM(task)) {\n            storage.set(task)\n          }\n        })\n        return\n      }\n      throw new TypeError(`La réponse n'est pas un tableau JSON (type: ${typeof tasks})`)\n    })\n})\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });