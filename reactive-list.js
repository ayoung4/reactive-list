"use strict";
exports.__esModule = true;
var reactive_dict_1 = require("meteor/reactive-dict");
var ReactiveList = /** @class */ (function () {
    function ReactiveList(arr) {
        this._list = new reactive_dict_1.ReactiveDict();
        this._length = 0;
        this.fromArray(arr);
    }
    ReactiveList.prototype.set = function (index, val) {
        if (index >= this._length || index < 0) {
            throw new RangeError('ReactiveVar.set: index out of bounds');
        }
        else {
            var arr = this.get();
            arr.splice(index, 1, val);
            this.fromArray(arr);
        }
    };
    ReactiveList.prototype.push = function (val) {
        this._list.set(String(this._length), val);
        this._length++;
    };
    ReactiveList.prototype.remove = function (index) {
        if (index >= this._length || index < 0) {
            throw new RangeError('ReactiveVar.remove: index out of bounds');
        }
        else {
            var arr = this.get();
            arr.splice(index, 1);
            this.fromArray(arr);
        }
    };
    ReactiveList.prototype.clear = function () {
        this._list.clear();
        this._length = 0;
    };
    ReactiveList.prototype.get = function () {
        var entries = this._list.all();
        return Object.keys(entries).map(function (k) { return entries[k]; });
    };
    ReactiveList.prototype.fromArray = function (arr) {
        var _this = this;
        if (!Array.isArray(arr)) {
            throw new TypeError("ReactiveVar.fromArray: expected argument of type Array, but received " + typeof arr);
        }
        this.clear();
        arr.forEach(function (val, i) { return _this._list.set(String(i), val); });
        this._length = arr.length;
    };
    Object.defineProperty(ReactiveList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    return ReactiveList;
}());
exports.ReactiveList = ReactiveList;
