import { Random } from 'meteor/random';

import * as chai from 'chai';
import * as faker from 'faker';
import * as _ from 'lodash';

import { ReactiveList } from '../src/reactive-list';

if (Meteor.isClient) {
    describe('ReactiveList', () => {
        const getRandomList = () => {
            return _.map(_.range(_.random(2, 10)), faker.lorem.word);
        };
        describe('constructor', () => {
            it('constructs from list', () => {
                const list = new ReactiveList([]);
                chai.expect(list).to.not.be.undefined;
                chai.expect(list.length).to.equal(0);
            });
            it('constructs from random list', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                chai.expect(list).to.not.be.undefined;
                chai.expect(list.length).to.equal(randomList.length);
            });
        });
        describe('push', () => {
            it('appends a value', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                const val = faker.lorem.word();
                list.push(val);
                const arr = list.get();
                chai.expect(list.length).to.equal(randomList.length + 1);
                chai.expect(arr[arr.length - 1]).to.equal(val);
            });
        });
        describe('set', () => {
            it('sets a value by index', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                const newVal = faker.lorem.word();
                const index = _.random(randomList.length - 1);
                list.set(index, newVal);
                randomList.splice(index, 1, newVal);

                const arr = list.get();
                chai.expect(list.length).to.equal(randomList.length);
                _.forEach(arr, (val, i) => {
                    chai.expect(val).to.equal(randomList[i]);
                });
            });
            it('throws an error if passed a bad index', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                const newVal = faker.lorem.word();
                const badSet = () => list.set(list.length, newVal);
                chai.expect(badSet).to.throw(RangeError);
            });
        });
        describe('remove', () => {
            it('removes elements from the list by index', () => {
                const randomList = getRandomList();
                const index = _.random(randomList.length - 1);
                const list = new ReactiveList(randomList);
                list.remove(index);
                randomList.splice(index, 1);

                const arr = list.get();
                chai.expect(arr.length, 'length').to.equal(randomList.length);
                _.forEach(arr, (val, i) => {
                    chai.expect(val, `value of index ${i}`).to.equal(randomList[i]);
                });
            });
            it('pushes and removes consecutively', () => {
                const randomList = getRandomList();
                const list = new ReactiveList([]);
                const record = [];
                while (randomList.length > 0) {
                    if (!!_.random(1)) {
                        const val = randomList.pop();
                        list.push(val);
                        record.push(val);
                    } else if (list.length > 0) {
                        const index = _.random(list.length - 1);
                        list.remove(index);
                        record.splice(index, 1);
                    }
                }
                chai.expect(list.length, 'length').to.equal(record.length);
                const arr = list.get();
                _.forEach(arr, (val, i) => {
                    chai.expect(val, `value of index ${i}`).to.equal(record[i]);
                });
            });
            it('throws an error if passed a bad index', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                const badRemove = () => list.remove(list.length);
                chai.expect(badRemove).to.throw(RangeError);
            });
        });
        describe('clear', () => {
            it('clears the list', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                list.clear();
                const arr = list.get();
                chai.expect(arr.length, 'length').to.equal(0);
            });
        });
        describe('toArray', () => {
            it('dumps values to array', () => {
                const randomList = getRandomList();
                const list = new ReactiveList(randomList);
                const arr = list.get();
                chai.expect(arr.length).to.equal(randomList.length);
                _.forEach(arr, (val, i) => {
                    chai.expect(val).to.equal(randomList[i]);
                });
            });
        });
    });
}
