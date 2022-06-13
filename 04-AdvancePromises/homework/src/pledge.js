'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError("The executor is not a function");
        }
        this._state = "pending";
        this._handlerGroups = []
        this._internalResolve = function () {
            if (this._state === "pending") {
                this._state = "fulfilled";
                this._value = arguments[0];
                this._callHandlers();
            }
        };
        this._internalReject = function () {
            if (this._state === "pending") {
                this._state = "rejected";
                this._value = arguments[0];
                this._callHandlers();
            }
        };
        
        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    }
    then(successCb, errorCb) {
        if (typeof successCb !== 'function') {
            successCb = false;
        }
        if (typeof errorCb !== 'function') {
            errorCb = false;
        }
        const downstreamPromise = new $Promise(() => {});
        this._handlerGroups.push({
            successCb: successCb,
            errorCb: errorCb,
            downstreamPromise: downstreamPromise
        });
        if (this._state !== "pending") this._callHandlers();
        return downstreamPromise;
    }
    _callHandlers() {
        while (this._handlerGroups.length) {
            const cb = this._handlerGroups.shift();
            if (this._state === "fulfilled") {
                if (cb.successCb) {
                    try {
                        const result = cb.successCb(this._value);
                        if (result instanceof $Promise) {
                            return result.then(
                                value => cb.downstreamPromise._internalResolve(value),
                                error => cb.downstreamPromise._internalReject(error)
                            );
                        } else {
                            cb.downstreamPromise._internalResolve(result);
                        }
                    } catch (err) {
                        cb.downstreamPromise._internalReject(err);
                    }
                } else {
                    return cb.downstreamPromise._internalResolve(this._value);
                }
            } else if (this._state === "rejected") {
                if (cb.errorCb) {
                    try {
                        const result = cb.errorCb(this._value);
                        if (result instanceof $Promise) {
                            return result.then(
                                value => cb.downstreamPromise._internalResolve(value),
                                error => cb.downstreamPromise._internalReject(error)
                            );
                        } else {
                            cb.downstreamPromise._internalResolve(result);
                        }
                    } catch (err) {
                        cb.downstreamPromise._internalReject(err);
                    }
                } else {
                    return cb.downstreamPromise._internalReject(this._value);
                }
            }
        }
    }
    catch(errorCb){
        return this.then(null, errorCb);
    }
    static resolve(value){
        if (value instanceof $Promise) {
            return value;
        }
        return new $Promise(resolve => resolve(value));
    }
    static all(array){
        if (!Array.isArray(array)) {
            throw new TypeError("The argument is not an array");
        }
        const promises = array.map(value => $Promise.resolve(value));
        return new $Promise((resolve, reject) => {
            let resolved = 0;
            const results = [];
            promises.forEach((promise, index) => {
                promise.then(
                    value => {
                        results[index] = value;
                        resolved++;
                        if (resolved === promises.length) {
                            resolve(results);
                        }
                    }
                ).catch(error => reject(error));
            });
        });

    }
  
}



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
