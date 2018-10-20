import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './Reducers/index';
import CounterComponent from './Components/CounterComponent';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <CounterComponent />
            </Provider>
        );
    }
}