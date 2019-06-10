/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "209c8727e54b02787f39"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor","theme"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.jsx":
/*!*******************!*\
  !*** ./index.jsx ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _App = __webpack_require__(/*! ./src/App */ "./src/App.jsx");

var _whyDidYouUpdate = __webpack_require__(/*! why-did-you-update */ "./node_modules/why-did-you-update/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render(_react.default.createElement(_App.App, null), document.getElementById('root'));

module.hot.accept();

window.whyUpdated = function () {
  window.devtools.whyDidYouUpdate = true;
  window.dispatchEvent(new CustomEvent('devtoolschange', {
    detail: window.devtools
  }));
};

window.addEventListener('devtoolschange', function (e) {
  if (e.detail.whyDidYouUpdate) {
    (0, _whyDidYouUpdate.whyDidYouUpdate)(_react.default, {
      exclude: [/^Route/, /^Link/, /^Switch/, /^Button/, /^BreadcrumbSection/, /^Label/],
      groupByComponent: true
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/App.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/App.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nbody {\n  padding: 20px;\n  background: #424242; }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/App.scss"],"names":[],"mappings":"AAAA;EACE,uBAAuB,EAAE;;AAE3B;EACE,cAAc;EACd,oBAAoB,EAAE","file":"App.scss","sourcesContent":["* {\n  box-sizing: border-box; }\n\nbody {\n  padding: 20px;\n  background: #424242; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/board/Board.Item.scss":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/board/Board.Item.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".root--3_JnjjZK {\n  min-height: 100px !important; }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/components/board/Board.Item.scss"],"names":[],"mappings":"AAAA;EACE,6BAA6B,EAAE","file":"Board.Item.scss","sourcesContent":[".root {\n  min-height: 100px !important; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "root--3_JnjjZK"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/card/Card.Item.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/card/Card.Item.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".card--3pzx_QxM {\n  width: 100%;\n  margin: 0 !important;\n  margin-top: 5px !important; }\n  .card--3pzx_QxM.dragging--2yH6JkXe {\n    opacity: 0;\n    z-index: 2002;\n    cursor: move !important; }\n\n.card_header--29qg_QSA {\n  display: flex !important;\n  justify-content: space-between !important; }\n\n.card_title--TMkN1B4M {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap; }\n\n.card_labels--3wl2qBRr {\n  max-width: 21%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.card_preview--1jhzOLJw {\n  user-select: none;\n  opacity: 0.8;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2002;\n  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.3); }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/components/card/Card.Item.scss"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,qBAAqB;EACrB,2BAA2B,EAAE;EAC7B;IACE,WAAW;IACX,cAAc;IACd,wBAAwB,EAAE;;AAE9B;EACE,yBAAyB;EACzB,0CAA0C,EAAE;;AAE9C;EACE,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB,EAAE;;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB,EAAE;;AAExB;EACE,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,cAAc;EACd,8CAA8C,EAAE","file":"Card.Item.scss","sourcesContent":[".card {\n  width: 100%;\n  margin: 0 !important;\n  margin-top: 5px !important; }\n  .card.dragging {\n    opacity: 0;\n    z-index: 2002;\n    cursor: move !important; }\n\n.card_header {\n  display: flex !important;\n  justify-content: space-between !important; }\n\n.card_title {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap; }\n\n.card_labels {\n  max-width: 21%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.card_preview {\n  user-select: none;\n  opacity: 0.8;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2002;\n  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.3); }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"card": "card--3pzx_QxM",
	"dragging": "dragging--2yH6JkXe",
	"card_header": "card_header--29qg_QSA",
	"card_title": "card_title--TMkN1B4M",
	"card_labels": "card_labels--3wl2qBRr",
	"card_preview": "card_preview--1jhzOLJw"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/list/List.List.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/list/List.List.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".root--VsLHWFQ2 {\n  height: 100%;\n  display: flex; }\n\n.mainSegment--1ve3bJNa {\n  display: flex;\n  flex: 1 1 auto;\n  background: #eee !important; }\n\n.mainSegment_content--T0iegDp3 {\n  display: flex;\n  flex: 1 1 auto;\n  overflow: auto; }\n\n.list--10DhBVZI {\n  display: flex;\n  margin: 5px !important;\n  flex: 1 1 auto;\n  min-width: 250px !important;\n  width: 400px;\n  max-width: 400px; }\n  .list--10DhBVZI:first-child {\n    margin-left: 0 !important; }\n  .list--10DhBVZI:last-child {\n    margin-right: 0 !important; }\n\n.list_header--1VReKMfc {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between; }\n\n.list_content--28ItlOB4 {\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  background: #eee !important;\n  flex: 1 1 auto; }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/components/list/List.List.scss"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,cAAc;EACd,eAAe;EACf,4BAA4B,EAAE;;AAEhC;EACE,cAAc;EACd,eAAe;EACf,eAAe,EAAE;;AAEnB;EACE,cAAc;EACd,uBAAuB;EACvB,eAAe;EACf,4BAA4B;EAC5B,aAAa;EACb,iBAAiB,EAAE;EACnB;IACE,0BAA0B,EAAE;EAC9B;IACE,2BAA2B,EAAE;;AAEjC;EACE,cAAc;EACd,sBAAsB;EACtB,+BAA+B,EAAE;;AAEnC;EACE,eAAe;EACf,cAAc;EACd,uBAAuB;EACvB,4BAA4B;EAC5B,eAAe,EAAE","file":"List.List.scss","sourcesContent":[".root {\n  height: 100%;\n  display: flex; }\n\n.mainSegment {\n  display: flex;\n  flex: 1 1 auto;\n  background: #eee !important; }\n\n.mainSegment_content {\n  display: flex;\n  flex: 1 1 auto;\n  overflow: auto; }\n\n.list {\n  display: flex;\n  margin: 5px !important;\n  flex: 1 1 auto;\n  min-width: 250px !important;\n  width: 400px;\n  max-width: 400px; }\n  .list:first-child {\n    margin-left: 0 !important; }\n  .list:last-child {\n    margin-right: 0 !important; }\n\n.list_header {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between; }\n\n.list_content {\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  background: #eee !important;\n  flex: 1 1 auto; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "root--VsLHWFQ2",
	"mainSegment": "mainSegment--1ve3bJNa",
	"mainSegment_content": "mainSegment_content--T0iegDp3",
	"list": "list--10DhBVZI",
	"list_header": "list_header--1VReKMfc",
	"list_content": "list_content--28ItlOB4"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Board.Page.scss":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Board.Page.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".root--1--OvXwc {\n  height: 100%;\n  display: flex; }\n\n.main_segment--3dWSZE56 {\n  display: flex;\n  flex: 1 1 auto;\n  background: #eee !important;\n  padding: 15px; }\n\n.main_segment_scroller--3sptUs8j {\n  display: flex;\n  flex: 1 1 auto;\n  overflow: auto; }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/views/Board.Page.scss"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,cAAc;EACd,eAAe;EACf,4BAA4B;EAC5B,cAAc,EAAE;;AAElB;EACE,cAAc;EACd,eAAe;EACf,eAAe,EAAE","file":"Board.Page.scss","sourcesContent":[".root {\n  height: 100%;\n  display: flex; }\n\n.main_segment {\n  display: flex;\n  flex: 1 1 auto;\n  background: #eee !important;\n  padding: 15px; }\n\n.main_segment_scroller {\n  display: flex;\n  flex: 1 1 auto;\n  overflow: auto; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "root--1--OvXwc",
	"main_segment": "main_segment--3dWSZE56",
	"main_segment_scroller": "main_segment_scroller--3sptUs8j"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Boards.Page.scss":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Boards.Page.scss ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".root--HXDxOvFx {\n  height: 100%;\n  display: flex; }\n\n.main_segment--oP9kjcKG {\n  flex: 1 1 auto;\n  overflow: auto;\n  background: #eee !important; }\n", "", {"version":3,"sources":["D:/projects/kanban-test-fe/src/views/Boards.Page.scss"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,eAAe;EACf,eAAe;EACf,4BAA4B,EAAE","file":"Boards.Page.scss","sourcesContent":[".root {\n  height: 100%;\n  display: flex; }\n\n.main_segment {\n  flex: 1 1 auto;\n  overflow: auto;\n  background: #eee !important; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "root--HXDxOvFx",
	"main_segment": "main_segment--oP9kjcKG"
};

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

__webpack_require__(/*! ./App.scss */ "./src/App.scss");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactDnd = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/index.js");

var _reactDndTouchBackend = _interopRequireDefault(__webpack_require__(/*! react-dnd-touch-backend */ "./node_modules/react-dnd-touch-backend/dist/Touch.js"));

var _Boards = __webpack_require__(/*! ./views/Boards.Page */ "./src/views/Boards.Page.jsx");

var _Board = __webpack_require__(/*! ./views/Board.Page */ "./src/views/Board.Page.jsx");

var _ConversationsList = _interopRequireDefault(__webpack_require__(/*! ./components/ConversationsList */ "./src/components/ConversationsList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = () => _react.default.createElement(_reactDnd.DragDropContextProvider, {
  backend: (0, _reactDndTouchBackend.default)({
    enableMouseEvents: true
  })
}, _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Redirect, {
  from: "/",
  exact: true,
  to: "/boards"
}), _react.default.createElement(_reactRouter.Route, {
  path: "/boards",
  component: _Boards.BoardsPage
}), _react.default.createElement(_reactRouter.Route, {
  path: "/board/:boardId",
  component: _Board.BoardPage
}))));

exports.App = App;

/***/ }),

/***/ "./src/App.scss":
/*!**********************!*\
  !*** ./src/App.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader??ref--7-1!../node_modules/sass-loader/lib/loader.js??ref--7-2!./App.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/App.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader??ref--7-1!../node_modules/sass-loader/lib/loader.js??ref--7-2!./App.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/App.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader??ref--7-1!../node_modules/sass-loader/lib/loader.js??ref--7-2!./App.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/App.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/api.js":
/*!************************!*\
  !*** ./src/app/api.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urls = exports.refetch = exports.api = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _urlJoin = _interopRequireDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var _reactRefetch = __webpack_require__(/*! react-refetch */ "./node_modules/react-refetch/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _axios.default.create({
  baseURL: "http://192.168.25.7:3000"
});

exports.api = api;

const refetch = _reactRefetch.connect.defaults({
  buildRequest: function (mapping) {
    const options = {
      method: mapping.method,
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      mode: mapping.mode,
      body: mapping.body
    };
    return new Request((0, _urlJoin.default)(api.defaults.baseURL, mapping.url), options);
  }
});

exports.refetch = refetch;
const urls = {
  boards: `/boards`,
  board: boardId => `/boards/${boardId}`,
  lists: boardId => `/boards/${boardId}/lists`,
  list: (boardId, id) => `/boards/${boardId}/lists/${id}`,
  cards: boardId => `/boards/${boardId}/cards`,
  card: (boardId, id) => `/boards/${boardId}/cards/${id}`
};
exports.urls = urls;

/***/ }),

/***/ "./src/components/Cables.js":
/*!**********************************!*\
  !*** ./src/components/Cables.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactActioncableProvider = __webpack_require__(/*! react-actioncable-provider */ "./node_modules/react-actioncable-provider/lib/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Cable = ({
  conversations,
  handleReceivedMessage
}) => {
  return _react.default.createElement(_react.Fragment, null, conversations.map(conversation => {
    return _react.default.createElement(_reactActioncableProvider.ActionCable, {
      key: conversation.id,
      channel: {
        channel: 'MessagesChannel',
        conversation: conversation.id
      },
      onReceived: handleReceivedMessage
    });
  }));
};

var _default = Cable;
exports.default = _default;

/***/ }),

/***/ "./src/components/ConversationsList.js":
/*!*********************************************!*\
  !*** ./src/components/ConversationsList.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactActioncableProvider = __webpack_require__(/*! react-actioncable-provider */ "./node_modules/react-actioncable-provider/lib/index.js");

var _constants = __webpack_require__(/*! ../constants */ "./src/constants/index.js");

var _NewConversationForm = _interopRequireDefault(__webpack_require__(/*! ./NewConversationForm */ "./src/components/NewConversationForm.js"));

var _MessagesArea = _interopRequireDefault(__webpack_require__(/*! ./MessagesArea */ "./src/components/MessagesArea.js"));

var _Cables = _interopRequireDefault(__webpack_require__(/*! ./Cables */ "./src/components/Cables.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConversationsList extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      conversations: [],
      activeConversation: null
    });

    _defineProperty(this, "componentDidMount", () => {
      fetch(`${_constants.API_ROOT}/conversations`).then(res => res.json()).then(conversations => this.setState({
        conversations
      }));
    });

    _defineProperty(this, "handleClick", id => {
      this.setState({
        activeConversation: id
      });
    });

    _defineProperty(this, "handleReceivedConversation", response => {
      const {
        conversation
      } = response;
      this.setState({
        conversations: [...this.state.conversations, conversation]
      });
    });

    _defineProperty(this, "handleReceivedMessage", response => {
      const {
        message
      } = response;
      const conversations = [...this.state.conversations];
      const conversation = conversations.find(conversation => conversation.id === message.conversation_id);
      conversation.messages = [...conversation.messages, message];
      this.setState({
        conversations
      });
    });

    _defineProperty(this, "render", () => {
      const {
        conversations,
        activeConversation
      } = this.state;
      return _react.default.createElement("div", {
        className: "conversationsList"
      }, _react.default.createElement(_reactActioncableProvider.ActionCable, {
        channel: {
          channel: 'ConversationsChannel'
        },
        onReceived: this.handleReceivedConversation
      }), this.state.conversations.length ? _react.default.createElement(_Cables.default, {
        conversations: conversations,
        handleReceivedMessage: this.handleReceivedMessage
      }) : null, _react.default.createElement("h2", null, "Conversations"), _react.default.createElement("ul", null, mapConversations(conversations, this.handleClick)), _react.default.createElement(_NewConversationForm.default, null), activeConversation ? _react.default.createElement(_MessagesArea.default, {
        conversation: findActiveConversation(conversations, activeConversation)
      }) : null);
    });
  }

}

var _default = ConversationsList; // helpers

exports.default = _default;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(conversation => conversation.id === activeConversation);
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return _react.default.createElement("li", {
      key: conversation.id,
      onClick: () => handleClick(conversation.id)
    }, conversation.title);
  });
};

/***/ }),

/***/ "./src/components/MessagesArea.js":
/*!****************************************!*\
  !*** ./src/components/MessagesArea.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _NewMessageForm = _interopRequireDefault(__webpack_require__(/*! ./NewMessageForm */ "./src/components/NewMessageForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MessagesArea = ({
  conversation: {
    id,
    title,
    board_id,
    list_id,
    position
  }
}) => {
  return _react.default.createElement("div", {
    className: "messagesArea"
  }, _react.default.createElement("h2", null, title), _react.default.createElement("ul", null, orderedMessages(messages)), _react.default.createElement(_NewMessageForm.default, {
    conversation_id: id
  }));
};

var _default = MessagesArea; // helpers

exports.default = _default;

const orderedMessages = messages => {
  const sortedMessages = messages.sort((a, b) => a.position - b.position);
  return sortedMessages.map(message => {
    return _react.default.createElement("li", {
      key: message.id
    }, (message.title, message.board_id, message.list.id, message.position));
  });
};

/***/ }),

/***/ "./src/components/NewConversationForm.js":
/*!***********************************************!*\
  !*** ./src/components/NewConversationForm.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _constants = __webpack_require__(/*! ../constants */ "./src/constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewConversationForm extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      title: ''
    });

    _defineProperty(this, "handleChange", e => {
      this.setState({
        title: e.target.value
      });
    });

    _defineProperty(this, "handleSubmit", e => {
      e.preventDefault();
      fetch(`${_constants.API_ROOT}/conversations`, {
        method: 'POST',
        headers: _constants.HEADERS,
        body: JSON.stringify(this.state)
      });
      this.setState({
        title: ''
      });
    });

    _defineProperty(this, "render", () => {
      return _react.default.createElement("div", {
        className: "newConversationForm"
      }, _react.default.createElement("form", {
        onSubmit: this.handleSubmit
      }, _react.default.createElement("label", null, "New Conversation:"), _react.default.createElement("br", null), _react.default.createElement("input", {
        name: "board_id",
        type: "string",
        value: this.state.title,
        onChange: this.handleChange
      }), _react.default.createElement("br", null), _react.default.createElement("input", {
        type: "string",
        name: "list_id",
        value: this.state.title,
        onChange: this.handleChange
      }), _react.default.createElement("br", null), _react.default.createElement("input", {
        type: "string",
        name: "position",
        value: this.state.title,
        onChange: this.handleChange
      }), _react.default.createElement("input", {
        type: "submit"
      })));
    });
  }

}

var _default = NewConversationForm;
exports.default = _default;

/***/ }),

/***/ "./src/components/NewMessageForm.js":
/*!******************************************!*\
  !*** ./src/components/NewMessageForm.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _constants = __webpack_require__(/*! ../constants */ "./src/constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewMessageForm extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      text: '',
      conversation_id: this.props.conversation_id
    });

    _defineProperty(this, "componentWillReceiveProps", nextProps => {
      this.setState({
        conversation_id: nextProps.conversation_id
      });
    });

    _defineProperty(this, "handleChange", e => {
      this.setState({
        text: e.target.value
      });
    });

    _defineProperty(this, "handleSubmit", e => {
      e.preventDefault();
      fetch(`${_constants.API_ROOT}/messages`, {
        method: 'POST',
        headers: _constants.HEADERS,
        body: JSON.stringify(this.state)
      });
      this.setState({
        text: ''
      });
    });

    _defineProperty(this, "render", () => {
      return _react.default.createElement("div", {
        className: "newMessageForm"
      }, _react.default.createElement("form", {
        onSubmit: this.handleSubmit
      }, _react.default.createElement("label", null, "New Message:"), _react.default.createElement("br", null), _react.default.createElement("input", {
        type: "string",
        name: "board_id",
        value: this.state.text,
        onChange: this.handleChange
      }), _react.default.createElement("br", null), _react.default.createElement("input", {
        type: "string",
        name: "list_id",
        value: this.state.text,
        onChange: this.handleChange
      }), _react.default.createElement("br", null), _react.default.createElement("input", {
        type: "string",
        name: "position",
        value: this.state.text,
        onChange: this.handleChange
      }), _react.default.createElement("input", {
        type: "submit"
      })));
    });
  }

}

var _default = NewMessageForm;
exports.default = _default;

/***/ }),

/***/ "./src/components/board/Board.Form.jsx":
/*!*********************************************!*\
  !*** ./src/components/board/Board.Form.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _shared = __webpack_require__(/*! components/shared */ "./src/components/shared/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const BoardForm = (_ref) => {
  var _props$errors;

  let {
    dirty,
    handleSubmit,
    handleChange,
    values
  } = _ref,
      props = _objectWithoutProperties(_ref, ["dirty", "handleSubmit", "handleChange", "values"]);

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_semantic.Form, {
    onSubmit: handleSubmit
  }, _react.default.createElement(_semantic.Form.Group, {
    widths: "equal"
  }, _react.default.createElement(_semantic.Form.Input, {
    name: "title",
    fluid: true,
    label: "Title",
    placeholder: "Title",
    value: values.title,
    onChange: handleChange
  }), _react.default.createElement(_semantic.Form.Field, {
    width: "3"
  }, _react.default.createElement("label", null, "Color"), _react.default.createElement(_shared.ColorSelect, {
    value: values.color,
    onChange: handleChange
  }))), _react.default.createElement(_semantic.Form.TextArea, {
    name: "description",
    label: "Description",
    placeholder: "Description...",
    value: values.description,
    onChange: handleChange
  })), _react.default.createElement("p", {
    style: {
      color: 'red'
    }
  }, props === null || props === void 0 ? void 0 : (_props$errors = props.errors) === null || _props$errors === void 0 ? void 0 : _props$errors.message), _react.default.createElement(_reactRouterDom.Prompt, {
    when: dirty,
    message: "Are you sure you want to leave?"
  }));
};

exports.BoardForm = BoardForm;

/***/ }),

/***/ "./src/components/board/Board.Item.jsx":
/*!*********************************************!*\
  !*** ./src/components/board/Board.Item.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardItem = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _BoardItem = _interopRequireDefault(__webpack_require__(/*! ./Board.Item.scss */ "./src/components/board/Board.Item.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BoardItem = ({
  id,
  color,
  title,
  description,
  href
}) => _react.default.createElement(_semantic.Card, {
  key: id,
  color: color,
  className: _BoardItem.default.root,
  href: href
}, _react.default.createElement(_semantic.Card.Content, null, _react.default.createElement(_semantic.Card.Header, null, title), _react.default.createElement(_semantic.Card.Description, null, description)));

exports.BoardItem = BoardItem;

/***/ }),

/***/ "./src/components/board/Board.Item.scss":
/*!**********************************************!*\
  !*** ./src/components/board/Board.Item.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/board/Board.Item.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/board/Board.Item.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/board/Board.Item.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/board/index.js":
/*!***************************************!*\
  !*** ./src/components/board/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Board = __webpack_require__(/*! ./Board.Form */ "./src/components/board/Board.Form.jsx");

Object.keys(_Board).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Board[key];
    }
  });
});

var _Board2 = __webpack_require__(/*! ./Board.Item */ "./src/components/board/Board.Item.jsx");

Object.keys(_Board2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Board2[key];
    }
  });
});

/***/ }),

/***/ "./src/components/card/Card.Form.jsx":
/*!*******************************************!*\
  !*** ./src/components/card/Card.Form.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _shared = __webpack_require__(/*! components/shared */ "./src/components/shared/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const CardForm = (_ref) => {
  var _props$errors;

  let {
    dirty,
    handleSubmit,
    handleChange,
    values
  } = _ref,
      props = _objectWithoutProperties(_ref, ["dirty", "handleSubmit", "handleChange", "values"]);

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_semantic.Form, {
    onSubmit: handleSubmit
  }, _react.default.createElement(_semantic.Form.Group, {
    widths: "equal"
  }, _react.default.createElement(_semantic.Form.Input, {
    name: "title",
    tabIndex: 0,
    fluid: true,
    label: "Title",
    placeholder: "Title",
    value: values.title,
    onChange: handleChange
  }), _react.default.createElement(_semantic.Form.Field, {
    width: "3"
  }, _react.default.createElement("label", null, "Color"), _react.default.createElement(_shared.ColorSelect, {
    tabIndex: 1,
    value: values.color,
    onChange: handleChange
  }))), _react.default.createElement(_semantic.Form.TextArea, {
    tabIndex: 2,
    name: "description",
    label: "Description",
    placeholder: "Description...",
    value: values.description,
    onChange: handleChange
  })), _react.default.createElement("p", {
    style: {
      color: 'red'
    }
  }, props === null || props === void 0 ? void 0 : (_props$errors = props.errors) === null || _props$errors === void 0 ? void 0 : _props$errors.message), _react.default.createElement(_reactRouterDom.Prompt, {
    when: dirty,
    message: "Are you sure you want to leave?"
  }));
};

exports.CardForm = CardForm;

/***/ }),

/***/ "./src/components/card/Card.Item.Drag.jsx":
/*!************************************************!*\
  !*** ./src/components/card/Card.Item.Drag.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardItemPreview = exports.CardItemDraggable = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _fp = __webpack_require__(/*! lodash/fp */ "./node_modules/lodash/fp.js");

var _reactDnd = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/index.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _Card = __webpack_require__(/*! ./Card.Item */ "./src/components/card/Card.Item.jsx");

var _CardItem = _interopRequireDefault(__webpack_require__(/*! ./Card.Item.scss */ "./src/components/card/Card.Item.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardDragName = "CARD";
const target = (0, _reactDnd.DropTarget)(CardDragName, {
  //throttle for prevent call in exceeed.
  hover: (0, _fp.throttle)(100, (target, monitor, component) => {
    const source = monitor.getItem();

    if (source == null) {
      return; //prevent bug
    }

    if (source.listId !== target.listId) {
      return;
    } // Prevent change position unnecessarily


    if (source.position == target.position) {
      return;
    } // Determine mouse position


    const mouseOffset = monitor.getClientOffset(); // Determine rectangle on screen

    const targetBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect(); // Get vertical middle

    const targetMiddleY = (targetBoundingRect.bottom - targetBoundingRect.top) / 2; // Pegar a posição Y do [Card Alvo]
    // Get pixels to the top

    const targetClientY = mouseOffset.y - targetBoundingRect.top; // Quando o [Card de Drag] está acima e tambem está acima do centro do [Card Alvo].
    // When [source card] is above and also is above the center [Target Card].

    if (source.position < target.position && targetClientY < targetMiddleY) {
      return;
    } // Quando o [Card de Drag] está abaixo e tambem está abaixo do centro do [Card Alvo].
    // When [Source Card] is below and also is below the center of the [Target Card]


    if (source.position > target.position && targetClientY > targetMiddleY) {
      return;
    }

    const sourcePosition = source.position; // to prevent calling the setState() of the component multiple times, I make the mutation passing the new position to the source element

    source.position = target.position;
    target.onCardMoving(_objectSpread({}, source, {
      position: sourcePosition
    }), target);
  }),

  drop(props) {
    props.onEndDrag && props.onEndDrag(props.id);
  }

}, connect => ({
  connectDropTarget: connect.dropTarget()
}));
const source = (0, _reactDnd.DragSource)(CardDragName, {
  beginDrag(props, _, component) {
    const boundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
    props.onBeginDrag && props.onBeginDrag(props.id);
    return _objectSpread({}, props, {
      boundingRect
    });
  },

  endDrag(props) {
    props.onEndDrag && props.onEndDrag(props.id);
  }

}, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}));
const CardItemDraggable = (0, _recompose.compose)(source, target)(class Card extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      connectDragSource,
      connectDropTarget,
      isDragging,
      className
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["connectDragSource", "connectDropTarget", "isDragging", "className"]);

    return connectDropTarget(connectDragSource(_react.default.createElement("div", {
      style: {
        width: '100%'
      }
    }, _react.default.createElement(_Card.CardItem, _extends({
      className: (0, _classnames.default)(className, {
        [_CardItem.default.dragging]: isDragging
      })
    }, props)))));
  }

});
exports.CardItemDraggable = CardItemDraggable;

function getItemStyles(x, y) {
  if (!x) {
    return {
      display: 'none'
    };
  }

  return {
    pointerEvents: 'none',
    transform: `translate(${x}px, ${y}px) rotate(0.01turn)`
  };
}

const CardItemPreview = (0, _recompose.compose)((0, _reactDnd.DragLayer)(monitor => {
  const item = monitor.getItem();
  const offset = monitor.getSourceClientOffset() || {};
  return _objectSpread({}, item, {
    x: offset.x,
    y: offset.y
  });
}), (0, _recompose.mapProps)((_ref) => {
  let {
    x,
    y
  } = _ref,
      props = _objectWithoutProperties(_ref, ["x", "y"]);

  return _objectSpread({}, props, {
    style: getItemStyles(x, y)
  });
}))(class Preview extends _react.default.PureComponent {
  render() {
    const _this$props2 = this.props,
          {
      currentOffset,
      boundingRect,
      style
    } = _this$props2,
          props = _objectWithoutProperties(_this$props2, ["currentOffset", "boundingRect", "style"]);

    return _react.default.createElement("div", {
      className: _CardItem.default.card_preview,
      style: style
    }, _react.default.createElement(_Card.CardItem, _extends({}, props, {
      style: {
        width: boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width
      }
    })));
  }

});
exports.CardItemPreview = CardItemPreview;

/***/ }),

/***/ "./src/components/card/Card.Item.jsx":
/*!*******************************************!*\
  !*** ./src/components/card/Card.Item.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardItem = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _CardItem = _interopRequireDefault(__webpack_require__(/*! ./Card.Item.scss */ "./src/components/card/Card.Item.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CardItem = ({
  className,
  title,
  description,
  color,
  style
}) => _react.default.createElement(_semantic.Card, {
  color: color,
  className: (0, _classnames.default)(_CardItem.default.card, className),
  style: style
}, _react.default.createElement(_semantic.Card.Content, null, _react.default.createElement(_semantic.Card.Header, {
  className: _CardItem.default.card_header
}, _react.default.createElement("h4", {
  className: _CardItem.default.card_title
}, title)), _react.default.createElement(_semantic.Card.Description, null, description)));

exports.CardItem = CardItem;

/***/ }),

/***/ "./src/components/card/Card.Item.scss":
/*!********************************************!*\
  !*** ./src/components/card/Card.Item.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Card.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/card/Card.Item.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Card.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/card/Card.Item.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Card.Item.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/card/Card.Item.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/card/index.js":
/*!**************************************!*\
  !*** ./src/components/card/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Card = __webpack_require__(/*! ./Card.Form */ "./src/components/card/Card.Form.jsx");

Object.keys(_Card).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Card[key];
    }
  });
});

var _Card2 = __webpack_require__(/*! ./Card.Item */ "./src/components/card/Card.Item.jsx");

Object.keys(_Card2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Card2[key];
    }
  });
});

/***/ }),

/***/ "./src/components/list/List.DropAndSort.jsx":
/*!**************************************************!*\
  !*** ./src/components/list/List.DropAndSort.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableSortableCardList = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _CardItem = __webpack_require__(/*! components/card/Card.Item.Drag */ "./src/components/card/Card.Item.Drag.jsx");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _reactDnd = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DroppableSortableCardList = (0, _recompose.compose)((0, _recompose.defaultProps)({
  cardStyle: {
    width: '100%'
  }
}), (0, _reactDnd.DropTarget)('CARD', {
  hover: (target, monitor) => {
    const source = monitor.getItem();

    if (source == null) {
      return; //prevent bug
    }

    if (source.listId !== target.listId) {
      target.onCardMovingToList && target.onCardMovingToList(source, target);
      source.listId = target.listId;
      source.position = target.cards.length + 1;
    }
  }
}, connect => ({
  connectDropTarget: connect.dropTarget()
})))(class WrapperDroppableSortableCardList extends _react.default.PureComponent {
  render() {
    const {
      connectDropTarget,
      cards,
      onCardMoving,
      onBeginDrag,
      cardStyle,
      onEndDrag,
      draggingId
    } = this.props;
    return connectDropTarget(_react.default.createElement("div", {
      style: {
        flex: "1 1 auto"
      }
    }, cards === null || cards === void 0 ? void 0 : cards.map(card => _react.default.createElement(_CardItem.CardItemDraggable, _extends({}, card, {
      key: card.id,
      isDragging: card.id == draggingId,
      style: cardStyle,
      onCardMoving: onCardMoving,
      onBeginDrag: onBeginDrag,
      onEndDrag: onEndDrag
    }))), _react.default.createElement(_CardItem.CardItemPreview, {
      key: "__preview",
      name: "CARD"
    })));
  }

});
exports.DroppableSortableCardList = DroppableSortableCardList;

/***/ }),

/***/ "./src/components/list/List.Form.jsx":
/*!*******************************************!*\
  !*** ./src/components/list/List.Form.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _shared = __webpack_require__(/*! components/shared */ "./src/components/shared/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const ListForm = (_ref) => {
  var _props$errors;

  let {
    dirty,
    handleSubmit,
    handleChange,
    values
  } = _ref,
      props = _objectWithoutProperties(_ref, ["dirty", "handleSubmit", "handleChange", "values"]);

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_semantic.Form, {
    onSubmit: handleSubmit
  }, _react.default.createElement(_semantic.Form.Group, {
    widths: "equal"
  }, _react.default.createElement(_semantic.Form.Input, {
    name: "title",
    fluid: true,
    label: "Title",
    placeholder: "Title",
    value: values.title,
    onChange: handleChange
  }), _react.default.createElement(_semantic.Form.Field, {
    width: "3"
  }, _react.default.createElement("label", null, "Color"), _react.default.createElement(_shared.ColorSelect, {
    value: values.color,
    onChange: handleChange
  }))), _react.default.createElement(_semantic.Form.TextArea, {
    name: "description",
    label: "Description",
    placeholder: "Description...",
    value: values.description,
    onChange: handleChange
  })), _react.default.createElement("p", {
    style: {
      color: 'red'
    }
  }, props === null || props === void 0 ? void 0 : (_props$errors = props.errors) === null || _props$errors === void 0 ? void 0 : _props$errors.message), _react.default.createElement(_reactRouterDom.Prompt, {
    when: dirty,
    message: "Are you sure you want to leave?"
  }));
};

exports.ListForm = ListForm;

/***/ }),

/***/ "./src/components/list/List.List.jsx":
/*!*******************************************!*\
  !*** ./src/components/list/List.List.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListList = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _ListList = _interopRequireDefault(__webpack_require__(/*! ./List.List.scss */ "./src/components/list/List.List.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ListList = ({
  loading,
  children,
  title,
  color,
  hrefNewCard
}) => _react.default.createElement(_semantic.Segment.Group, {
  raised: true,
  className: _ListList.default.list
}, _react.default.createElement(_semantic.Segment, {
  color: color,
  className: _ListList.default.list_header,
  inverted: true
}, _react.default.createElement("h4", null, title), hrefNewCard && _react.default.createElement(_reactRouterDom.Link, {
  to: hrefNewCard
}, _react.default.createElement(_semantic.Button, {
  circular: true,
  compact: true,
  icon: "add"
}))), _react.default.createElement(_semantic.Segment, {
  className: _ListList.default.list_content,
  loading: loading
}, children));

exports.ListList = ListList;

/***/ }),

/***/ "./src/components/list/List.List.scss":
/*!********************************************!*\
  !*** ./src/components/list/List.List.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./List.List.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/list/List.List.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./List.List.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/list/List.List.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./List.List.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/list/List.List.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/list/index.js":
/*!**************************************!*\
  !*** ./src/components/list/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = __webpack_require__(/*! ./List.Form */ "./src/components/list/List.Form.jsx");

Object.keys(_List).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _List[key];
    }
  });
});

var _List2 = __webpack_require__(/*! ./List.List */ "./src/components/list/List.List.jsx");

Object.keys(_List2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _List2[key];
    }
  });
});

var _List3 = __webpack_require__(/*! ./List.DropAndSort */ "./src/components/list/List.DropAndSort.jsx");

Object.keys(_List3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _List3[key];
    }
  });
});

/***/ }),

/***/ "./src/components/shared/Color.Select.jsx":
/*!************************************************!*\
  !*** ./src/components/shared/Color.Select.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorSelect = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const colorOptions = _semantic.COLORS.map(color => ({
  key: color,
  text: color,
  value: color,
  label: {
    color: color,
    empty: true,
    circular: true
  }
}));

const ColorSelect = (0, _recompose.withHandlers)({
  handleChange: ({
    onChange
  }) => (ev, el) => {
    ev.target.name = "color";
    ev.target.value = el.value;
    onChange && onChange(ev);
  }
})(({
  handleChange,
  value
}) => _react.default.createElement(_semantic.Button.Group, {
  fluid: true,
  color: value
}, _react.default.createElement(_semantic.Dropdown, {
  name: "color",
  value: value,
  button: true,
  fluid: true,
  onChange: handleChange,
  options: colorOptions
})));
exports.ColorSelect = ColorSelect;

/***/ }),

/***/ "./src/components/shared/index.js":
/*!****************************************!*\
  !*** ./src/components/shared/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Color = __webpack_require__(/*! ./Color.Select */ "./src/components/shared/Color.Select.jsx");

Object.keys(_Color).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Color[key];
    }
  });
});

/***/ }),

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HEADERS = exports.API_WS_ROOT = exports.API_ROOT = void 0;
const API_ROOT = 'http://localhost:3000';
exports.API_ROOT = API_ROOT;
const API_WS_ROOT = 'ws://localhost:3000/cable';
exports.API_WS_ROOT = API_WS_ROOT;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
exports.HEADERS = HEADERS;

/***/ }),

/***/ "./src/lib/semantic/index.js":
/*!***********************************!*\
  !*** ./src/lib/semantic/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  COLORS: true
};
Object.defineProperty(exports, "COLORS", {
  enumerable: true,
  get: function () {
    return _SUI.COLORS;
  }
});

var _SUI = __webpack_require__(/*! semantic-ui-react/dist/es/lib/SUI */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");

var _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");

Object.keys(_semanticUiReact).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _semanticUiReact[key];
    }
  });
});

/***/ }),

/***/ "./src/views/Board.Form.jsx":
/*!**********************************!*\
  !*** ./src/views/Board.Form.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _formik = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.es6.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _board = __webpack_require__(/*! components/board */ "./src/components/board/index.js");

var _api = __webpack_require__(/*! app/api */ "./src/app/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

async function saveBoard(board, {
  setSubmitting,
  setErrors,
  resetForm,
  props
}) {
  const {
    history,
    backTo,
    onSaveSuccess
  } = props;

  try {
    const {
      data
    } = await _api.api.post(_api.urls.boards, board);
    resetForm();
    history.goBack(backTo);
    onSaveSuccess && onSaveSuccess(data);
  } catch (error) {
    setSubmitting(false);
    setErrors(error);
  }
}

const BoardForm = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _formik.withFormik)({
  mapPropsToValues: () => ({
    color: 'grey'
  }),
  handleSubmit: saveBoard
}))((_ref) => {
  var _location$query;

  let {
    location,
    handleSubmit,
    isSubmitting
  } = _ref,
      props = _objectWithoutProperties(_ref, ["location", "handleSubmit", "isSubmitting"]);

  return _react.default.createElement(_semantic.Modal, {
    open: true,
    style: {
      top: 30
    }
  }, _react.default.createElement(_semantic.Modal.Header, {
    icon: "browser",
    content: "New Board"
  }), _react.default.createElement(_semantic.Modal.Content, null, _react.default.createElement(_board.BoardForm, props)), _react.default.createElement(_semantic.Modal.Actions, null, _react.default.createElement(_reactRouterDom.Link, {
    to: (location === null || location === void 0 ? void 0 : (_location$query = location.query) === null || _location$query === void 0 ? void 0 : _location$query.backTo) || '..'
  }, _react.default.createElement(_semantic.Button, null, _react.default.createElement(_semantic.Icon, {
    name: "close"
  }), " Cancel")), _react.default.createElement(_semantic.Button, {
    type: "submit",
    onClick: handleSubmit,
    positive: true,
    disabled: isSubmitting
  }, _react.default.createElement(_semantic.Icon, {
    name: "checkmark"
  }), " Save")));
});
exports.BoardForm = BoardForm;

/***/ }),

/***/ "./src/views/Board.Page.jsx":
/*!**********************************!*\
  !*** ./src/views/Board.Page.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardPage = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _fp = __webpack_require__(/*! lodash/fp */ "./node_modules/lodash/fp.js");

var _api = __webpack_require__(/*! app/api */ "./src/app/api.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _seamlessImmutable = __webpack_require__(/*! seamless-immutable */ "./node_modules/seamless-immutable/seamless-immutable.development.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _list = __webpack_require__(/*! components/list */ "./src/components/list/index.js");

var _BoardPage = _interopRequireDefault(__webpack_require__(/*! ./Board.Page.scss */ "./src/views/Board.Page.scss"));

var _Card = __webpack_require__(/*! ./Card.Form */ "./src/views/Card.Form.jsx");

var _List = __webpack_require__(/*! ./List.Form */ "./src/views/List.Form.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Lists = ({
  sort,
  boardId,
  lists,
  cards,
  draggingId,
  onCardMoving,
  onCardMovingToList,
  onBeginDrag,
  onEndDrag
}) => {
  var _lists$value;

  const cardsOfList = listId => (0, _fp.filter)(card => card.listId == listId);

  return (0, _fp.map)(list => {
    const hrefNewCard = {
      pathname: `/board/${boardId}/cards/new`,
      query: {
        listId: list.id
      }
    };
    const filteredCards = sort(cardsOfList(list.id)(cards));
    return _react.default.createElement(_list.ListList, _extends({
      key: list.id
    }, list, {
      hrefNewCard: hrefNewCard,
      loading: cards === null || cards === void 0 ? void 0 : cards.pending
    }), _react.default.createElement(_list.DroppableSortableCardList, {
      draggingId: draggingId,
      listId: list.id,
      cards: filteredCards,
      onBeginDrag: onBeginDrag,
      onEndDrag: onEndDrag,
      onCardMoving: onCardMoving,
      onCardMovingToList: onCardMovingToList
    }));
  })((_lists$value = lists.value) === null || _lists$value === void 0 ? void 0 : _lists$value.data);
};

const BoardPage = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _recompose.mapProps)(({
  match,
  location
}) => ({
  location,
  boardId: match.params.boardId,
  listId: match.params.boardId,
  sortProperty: (0, _fp.prop)("position")
})), (0, _recompose.mapProps)((_ref) => {
  let {
    sortProperty
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["sortProperty"]);

  return _objectSpread({}, rest, {
    sortProperty,
    sort: (0, _fp.sortBy)(sortProperty)
  });
}), (0, _api.refetch)(({
  boardId
}) => ({
  board: _api.urls.board(boardId),
  lists: _api.urls.lists(boardId),
  cardsFetched: _api.urls.cards(boardId),
  refreshLists: () => ({
    lists: {
      url: _api.urls.lists(boardId),
      force: true
    }
  }),
  refreshCards: () => ({
    cards: {
      url: _api.urls.cards(boardId),
      force: true
    }
  })
})), (0, _recompose.withState)('cards', 'setCards', (0, _seamlessImmutable.from)({
  pending: true
})), (0, _recompose.lifecycle)({
  componentWillReceiveProps: ({
    cards,
    cardsFetched,
    setCards
  }) => {
    if (cards.pending && !cardsFetched.pending) {
      setCards((0, _seamlessImmutable.from)(cardsFetched.value.data));
    }
  }
}), (0, _recompose.withState)('draggingId', 'setDraggingId', 0), (0, _recompose.withHandlers)({
  handleCardMoving: (0, _fp.throttle)(100, ({
    cards,
    setCards,
    sortProperty
  }) => (source, target) => {
    const sourcePosition = sortProperty(source);
    const targetPosition = sortProperty(target);

    if (sourcePosition == targetPosition) {
      return;
    }

    const op = sourcePosition < targetPosition ? -1 : 1;
    const minPos = Math.min(sourcePosition, targetPosition);
    const maxPos = Math.max(sourcePosition, targetPosition);
    const cardsUpdated = cards.map(el => {
      if (el.listId == target.listId) {
        if (el.position == sourcePosition) {
          return el.set('position', targetPosition);
        } else if (el.position >= minPos && el.position <= maxPos) {
          return el.set('position', el.position + op);
        }
      }

      return el;
    });
    setCards(cardsUpdated);
  }),
  handleCardMovingToList: (0, _fp.throttle)(100, ({
    cards,
    setCards
  }) => (source, target) => {
    if (source.listId == target.listId) {
      return;
    }

    const newCards = cards.map(card => {
      if (card.listId == source.listId && card.position > source.position) {
        return card.set('position', card.position - 1);
      }

      if (card.id == source.id) {
        return card.set('listId', target.listId).set('position', target.cards.length + 1);
      }

      return card;
    });
    setCards(newCards);
  }),
  handleBeginDrag: ({
    setDraggingId
  }) => setDraggingId,
  handleEndDrag: ({
    setDraggingId
  }) => () => setDraggingId(0)
}))(({
  sort,
  boardId,
  board,
  lists,
  cards,
  draggingId,
  refreshLists,
  refreshCards,
  handleCardMoving,
  handleCardMovingToList,
  handleBeginDrag,
  handleEndDrag
}) => {
  var _board$value, _board$value2, _board$value3;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_semantic.Segment.Group, {
    raised: true,
    className: _BoardPage.default.root
  }, _react.default.createElement(_semantic.Segment, {
    loading: board.pending
  }, _react.default.createElement(_semantic.Grid, null, _react.default.createElement(_semantic.Grid.Column, {
    width: "12",
    verticalAlign: "middle"
  }, _react.default.createElement(_semantic.Label, {
    size: "large",
    color: (_board$value = board.value) === null || _board$value === void 0 ? void 0 : _board$value.color,
    ribbon: true,
    basic: true
  }, _react.default.createElement(_semantic.Breadcrumb, null, _react.default.createElement(_semantic.Breadcrumb.Section, null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Home")), _react.default.createElement(_semantic.Breadcrumb.Divider, {
    icon: "right angle"
  }), _react.default.createElement(_semantic.Breadcrumb.Section, null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/boards"
  }, "Boards")), _react.default.createElement(_semantic.Breadcrumb.Divider, {
    icon: "right angle"
  }), _react.default.createElement(_semantic.Breadcrumb.Section, {
    active: true
  }, (_board$value2 = board.value) === null || _board$value2 === void 0 ? void 0 : _board$value2.title)))), _react.default.createElement(_semantic.Grid.Column, {
    width: "4",
    verticalAlign: "middle",
    textAlign: "right"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: `/board/${boardId}/lists/new`
  }, _react.default.createElement(_semantic.Button, {
    circular: true,
    icon: "add",
    color: board === null || board === void 0 ? void 0 : (_board$value3 = board.value) === null || _board$value3 === void 0 ? void 0 : _board$value3.color,
    floated: "right"
  }))))), _react.default.createElement(_semantic.Segment, {
    raised: true,
    loading: lists.pending,
    className: _BoardPage.default.main_segment
  }, _react.default.createElement("div", {
    className: _BoardPage.default.main_segment_scroller
  }, _react.default.createElement(Lists, {
    sort: sort,
    boardId: boardId,
    lists: lists,
    cards: cards,
    draggingId: draggingId,
    onBeginDrag: handleBeginDrag,
    onEndDrag: handleEndDrag,
    onCardMoving: handleCardMoving,
    onCardMovingToList: handleCardMovingToList
  })))), _react.default.createElement(_reactRouterDom.Route, {
    path: "/board/:boardId/lists/new",
    render: () => _react.default.createElement(_List.ListForm, {
      backTo: `/board/${boardId}`,
      boardId: boardId,
      onSaveSuccess: refreshLists
    })
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/board/:boardId/cards/new",
    render: ({
      location
    }) => {
      var _location$query;

      return _react.default.createElement(_Card.CardForm, {
        backTo: `/board/${boardId}`,
        boardId: boardId,
        listId: (_location$query = location.query) === null || _location$query === void 0 ? void 0 : _location$query.listId,
        onSaveSuccess: refreshCards
      });
    }
  }));
});
exports.BoardPage = BoardPage;

/***/ }),

/***/ "./src/views/Board.Page.scss":
/*!***********************************!*\
  !*** ./src/views/Board.Page.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Board.Page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Board.Page.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Board.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Board.Page.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/views/Boards.Page.jsx":
/*!***********************************!*\
  !*** ./src/views/Boards.Page.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardsPage = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _fp = __webpack_require__(/*! lodash/fp */ "./node_modules/lodash/fp.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _board = __webpack_require__(/*! components/board */ "./src/components/board/index.js");

var _api = __webpack_require__(/*! app/api */ "./src/app/api.js");

var _Board = __webpack_require__(/*! ./Board.Form */ "./src/views/Board.Form.jsx");

var _BoardsPage = _interopRequireDefault(__webpack_require__(/*! ./Boards.Page.scss */ "./src/views/Boards.Page.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BoardList = ({
  boards
}) => (0, _fp.map)(board => _react.default.createElement(_board.BoardItem, _extends({}, board, {
  key: board.id,
  href: `#/board/${board.id}`
})))(boards);

const BoardsPage = (0, _recompose.compose)((0, _api.refetch)(() => ({
  boards: _api.urls.boards,
  refreshBoards: () => ({
    boards: {
      url: _api.urls.boards,
      force: true
    }
  })
})))(({
  boards,
  match,
  refreshBoards
}) => {
  var _boards$value;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_semantic.Segment.Group, {
    raised: true,
    className: _BoardsPage.default.root
  }, _react.default.createElement(_semantic.Segment, null, _react.default.createElement(_semantic.Grid, null, _react.default.createElement(_semantic.Grid.Column, {
    width: "12",
    verticalAlign: "middle"
  }, _react.default.createElement(_semantic.Label, {
    size: "large",
    ribbon: true,
    basic: true
  }, _react.default.createElement(_semantic.Breadcrumb, null, _react.default.createElement(_semantic.Breadcrumb.Section, null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Home")), _react.default.createElement(_semantic.Breadcrumb.Divider, {
    icon: "right angle"
  }), _react.default.createElement(_semantic.Breadcrumb.Section, {
    active: true
  }, "Boards")))), _react.default.createElement(_semantic.Grid.Column, {
    width: "4",
    verticalAlign: "middle",
    textAlign: "right"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/boards/new"
  }, _react.default.createElement(_semantic.Button, {
    circular: true,
    icon: "add",
    primary: true
  }))))), _react.default.createElement(_semantic.Segment, {
    raised: true,
    className: _BoardsPage.default.main_segment,
    loading: boards.pending
  }, _react.default.createElement(_semantic.Card.Group, {
    className: _BoardsPage.default.card_group
  }, _react.default.createElement(BoardList, {
    boards: (_boards$value = boards.value) === null || _boards$value === void 0 ? void 0 : _boards$value.data
  })))), _react.default.createElement(_reactRouterDom.Route, {
    path: "/boards/new",
    render: () => _react.default.createElement(_Board.BoardForm, {
      backTo: match.path,
      onSaveSuccess: refreshBoards
    })
  }));
});
exports.BoardsPage = BoardsPage;

/***/ }),

/***/ "./src/views/Boards.Page.scss":
/*!************************************!*\
  !*** ./src/views/Boards.Page.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Boards.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Boards.Page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Boards.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Boards.Page.scss", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader??ref--7-1!../../node_modules/sass-loader/lib/loader.js??ref--7-2!./Boards.Page.scss */ "./node_modules/css-loader/index.js??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/views/Boards.Page.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/views/Card.Form.jsx":
/*!*********************************!*\
  !*** ./src/views/Card.Form.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _formik = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.es6.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _card = __webpack_require__(/*! components/card */ "./src/components/card/index.js");

var _api = __webpack_require__(/*! app/api */ "./src/app/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const saveCard = async (card, {
  setSubmitting,
  setErrors,
  resetForm,
  props
}) => {
  const {
    history,
    backTo,
    onSaveSuccess
  } = props;

  try {
    const {
      data
    } = await _api.api.post(_api.urls.cards(card.boardId), card);
    resetForm();
    history.goBack(backTo);
    onSaveSuccess && onSaveSuccess(data);
  } catch (error) {
    setSubmitting(false);
    setErrors(error);
  }
};

const CardForm = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _formik.withFormik)({
  mapPropsToValues: ({
    boardId,
    listId
  }) => ({
    color: 'grey',
    boardId,
    listId
  }),
  handleSubmit: saveCard
}))((_ref) => {
  var _location$query;

  let {
    location,
    handleSubmit,
    isSubmitting
  } = _ref,
      props = _objectWithoutProperties(_ref, ["location", "handleSubmit", "isSubmitting"]);

  return _react.default.createElement(_semantic.Modal, {
    open: true,
    style: {
      top: 30
    }
  }, _react.default.createElement(_semantic.Modal.Header, {
    icon: "browser",
    content: "New Card"
  }), _react.default.createElement(_semantic.Modal.Content, null, _react.default.createElement(_card.CardForm, props)), _react.default.createElement(_semantic.Modal.Actions, null, _react.default.createElement(_reactRouterDom.Link, {
    to: (location === null || location === void 0 ? void 0 : (_location$query = location.query) === null || _location$query === void 0 ? void 0 : _location$query.backTo) || '../'
  }, _react.default.createElement(_semantic.Button, null, _react.default.createElement(_semantic.Icon, {
    name: "close"
  }), " Cancel")), _react.default.createElement(_semantic.Button, {
    type: "submit",
    onClick: handleSubmit,
    positive: true,
    disabled: isSubmitting
  }, _react.default.createElement(_semantic.Icon, {
    name: "checkmark"
  }), " Save")));
});
exports.CardForm = CardForm;

/***/ }),

/***/ "./src/views/List.Form.jsx":
/*!*********************************!*\
  !*** ./src/views/List.Form.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListForm = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _formik = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.es6.js");

var _recompose = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _semantic = __webpack_require__(/*! lib/semantic */ "./src/lib/semantic/index.js");

var _list = __webpack_require__(/*! components/list */ "./src/components/list/index.js");

var _api = __webpack_require__(/*! app/api */ "./src/app/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

async function saveList(list, {
  setSubmitting,
  setErrors,
  resetForm,
  props
}) {
  const {
    history,
    backTo,
    onSaveSuccess
  } = props;

  try {
    const {
      data
    } = await _api.api.post(_api.urls.lists(list.boardId), list);
    resetForm();
    history.goBack(backTo);
    onSaveSuccess && onSaveSuccess(data);
  } catch (error) {
    setSubmitting(false);
    setErrors(error);
  }
}

const ListForm = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _formik.withFormik)({
  mapPropsToValues: ({
    boardId
  }) => ({
    color: 'grey',
    boardId
  }),
  handleSubmit: saveList
}))((_ref) => {
  let {
    backTo,
    handleSubmit,
    isSubmitting
  } = _ref,
      props = _objectWithoutProperties(_ref, ["backTo", "handleSubmit", "isSubmitting"]);

  return _react.default.createElement(_semantic.Modal, {
    open: true,
    style: {
      top: 30
    }
  }, _react.default.createElement(_semantic.Modal.Header, {
    icon: "browser",
    content: "New List"
  }), _react.default.createElement(_semantic.Modal.Content, null, _react.default.createElement(_list.ListForm, props)), _react.default.createElement(_semantic.Modal.Actions, null, _react.default.createElement(_reactRouterDom.Link, {
    to: backTo || '..'
  }, _react.default.createElement(_semantic.Button, null, _react.default.createElement(_semantic.Icon, {
    name: "close"
  }), " Cancel")), _react.default.createElement(_semantic.Button, {
    type: "submit",
    onClick: handleSubmit,
    positive: true,
    disabled: isSubmitting
  }, _react.default.createElement(_semantic.Icon, {
    name: "checkmark"
  }), " Save")));
});
exports.ListForm = ListForm;

/***/ }),

/***/ 0:
/*!******************************************************************************!*\
  !*** multi react-hot-loader/patch @babel/polyfill ./vendor.scss ./index.jsx ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! react-hot-loader/patch */"./node_modules/react-hot-loader/patch.js");
__webpack_require__(/*! @babel/polyfill */"./node_modules/@babel/polyfill/lib/index.js");
__webpack_require__(/*! ./vendor.scss */"./vendor.scss");
module.exports = __webpack_require__(/*! ./index.jsx */"./index.jsx");


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map