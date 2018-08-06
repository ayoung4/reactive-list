"use strict";
exports.__esModule = true;
var chai = require("chai");
var faker = require("faker");
var _ = require("lodash");
var reactive_list_1 = require("../src/reactive-list");
if (Meteor.isClient) {
    describe('ReactiveList', function () {
        var getRandomList = function () {
            return _.map(_.range(_.random(2, 10)), faker.lorem.word);
        };
        describe('constructor', function () {
            it('constructs from list', function () {
                var list = new reactive_list_1.ReactiveList([]);
                chai.expect(list).to.not.be.undefined;
                chai.expect(list.length).to.equal(0);
            });
            it('constructs from random list', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                chai.expect(list).to.not.be.undefined;
                chai.expect(list.length).to.equal(randomList.length);
            });
        });
        describe('push', function () {
            it('appends a value', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                var val = faker.lorem.word();
                list.push(val);
                var arr = list.get();
                chai.expect(list.length).to.equal(randomList.length + 1);
                chai.expect(arr[arr.length - 1]).to.equal(val);
            });
        });
        describe('set', function () {
            it('sets a value by index', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                var newVal = faker.lorem.word();
                var index = _.random(randomList.length - 1);
                list.set(index, newVal);
                randomList.splice(index, 1, newVal);
                var arr = list.get();
                chai.expect(list.length).to.equal(randomList.length);
                _.forEach(arr, function (val, i) {
                    chai.expect(val).to.equal(randomList[i]);
                });
            });
            it('throws an error if passed a bad index', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                var newVal = faker.lorem.word();
                var badSet = function () { return list.set(list.length, newVal); };
                chai.expect(badSet).to["throw"](RangeError);
            });
        });
        describe('remove', function () {
            it('removes elements from the list by index', function () {
                var randomList = getRandomList();
                var index = _.random(randomList.length - 1);
                var list = new reactive_list_1.ReactiveList(randomList);
                list.remove(index);
                randomList.splice(index, 1);
                var arr = list.get();
                chai.expect(arr.length, 'length').to.equal(randomList.length);
                _.forEach(arr, function (val, i) {
                    chai.expect(val, "value of index " + i).to.equal(randomList[i]);
                });
            });
            it('pushes and removes consecutively', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList([]);
                var record = [];
                while (randomList.length > 0) {
                    if (!!_.random(1)) {
                        var val = randomList.pop();
                        list.push(val);
                        record.push(val);
                    }
                    else if (list.length > 0) {
                        var index = _.random(list.length - 1);
                        list.remove(index);
                        record.splice(index, 1);
                    }
                }
                chai.expect(list.length, 'length').to.equal(record.length);
                var arr = list.get();
                _.forEach(arr, function (val, i) {
                    chai.expect(val, "value of index " + i).to.equal(record[i]);
                });
            });
            it('throws an error if passed a bad index', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                var badRemove = function () { return list.remove(list.length); };
                chai.expect(badRemove).to["throw"](RangeError);
            });
        });
        describe('clear', function () {
            it('clears the list', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                list.clear();
                var arr = list.get();
                chai.expect(arr.length, 'length').to.equal(0);
            });
        });
        describe('toArray', function () {
            it('dumps values to array', function () {
                var randomList = getRandomList();
                var list = new reactive_list_1.ReactiveList(randomList);
                var arr = list.get();
                chai.expect(arr.length).to.equal(randomList.length);
                _.forEach(arr, function (val, i) {
                    chai.expect(val).to.equal(randomList[i]);
                });
            });
        });
    });
}
