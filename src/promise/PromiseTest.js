import React from 'react';


export default class PromiseTest extends React.Component {

    callback(func) {
        for (let i = 0; i < 10; i++){
            func(i);
        }
    }

    callbackTest = () => {
        const callbackFunc = function(i) {
            console.log('callback' + i);
        }
        this.callback(callbackFunc);
    }

    promiseTest = () => {
        const promise = new Promise((resolve, reject) => {
            console.log(2)
            resolve();
            //reject();
            console.log(1)
        });

        promise.then(() => {
            console.log('promise then');
        }).catch(() => {
            console.log('promise reject');
        });
    }

    render() {
        return (
            <div>
                <h1>Promise Test</h1>
                <button onClick={this.callbackTest}>Callback</button>
                <button onClick={this.promiseTest}>Promise</button>
            </div>
        );
    }

}