declare var ReactiveDict: ReactiveDictStatic;

interface ReactiveDictStatic {
    new <T>(equalsFunc?: Function): ReactiveDict<T>;
}
interface ReactiveDict<T> {
    get(key: string): T;
    set(key: string, newValue: T): void;
    clear(): void;
    all(): {
        [key: string]: T
    };
}

declare module "meteor/reactive-dict" {
    var ReactiveDict: ReactiveDictStatic;
    interface ReactiveDictStatic {
        new <T>(equalsFunc?: Function): ReactiveDict<T>;
    }
    interface ReactiveDict<T> {
        get(key: string): T;
        set(key: string, newValue: T): void;
        clear(): void;
        all(): {
            [key: string]: T
        };
    }
}
