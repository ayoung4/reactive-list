import { ReactiveDict } from 'meteor/reactive-dict';

export class ReactiveList<T> {

    private _list: ReactiveDict<T>;
    private _length: number;

    constructor(arr: T[]) {
        this._list = new ReactiveDict<T>();
        this._length = 0;
        this.fromArray(arr);
    }

    set(index: number, val: T): void {
        if (index >= this._length || index < 0) {
            throw new RangeError('ReactiveVar.set: index out of bounds');
        } else {
            const arr = this.get();
            arr.splice(index, 1, val);
            this.fromArray(arr);
        }
    }

    push(val: T): void {
        this._list.set(String(this._length), val);
        this._length++;
    }

    remove(index: number): void {
        if (index >= this._length || index < 0) {
            throw new RangeError('ReactiveVar.remove: index out of bounds');
        } else {
            const arr = this.get();
            arr.splice(index, 1);
            this.fromArray(arr);
        }
    }

    clear(): void {
        this._list.clear();
        this._length = 0;
    }

    get(): T[] {
        const entries = this._list.all();
        return Object.keys(entries).map((k) => entries[k]);
    }

    private fromArray(arr: T[]) {
        if(!Array.isArray(arr)) {
            throw new TypeError(`ReactiveVar.fromArray: expected argument of type Array, but received ${typeof arr}`);
        }
        this.clear();
        arr.forEach((val, i) => this._list.set(String(i), val));
        this._length = arr.length;
    }

    get length(): number {
        return this._length;
    }
}
