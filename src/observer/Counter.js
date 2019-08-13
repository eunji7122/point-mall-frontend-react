export default class Counter {

    constructor() {
        this._observers = [];
        this._reactionSubscribers = [];
        this._count = 0;
    }

    addObserver(observer){
        this._observers.push(observer);
    }

    get count() {
        console.log('get count');
        return this._count;
    }

    set count(count) {
        this._count = count;
        for (let observer of this._observers) {
            observer.forceUpdate();
        }
        // const subscriber = function (value) {
        //     console.log('reaction : ' + value);
        // };
        // subscriber(this.count);
        for (let subscriber of this._reactionSubscribers) {
            subscriber(this.count);
        }
    }

    reaction(func) {
        this._reactionSubscribers.push(func);
    }
}
