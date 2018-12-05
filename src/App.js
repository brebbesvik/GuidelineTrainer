/*import React, { Component } from 'react';
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
}*/

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './Reducers/index';

export function registerScreens() {
    Navigation.registerComponentWithRedux(
        'game.Quiz',
        () => require('./Components/CounterComponent').default,
        Provider,
        store
        );
    Navigation.registerComponent(
        'game.MainMenu',
        () => require('./Components/MainMenuComponent').default
    );
/*    Navigation.registerComponentWithRedux(
        'game.QuizSummary',
        () => require('./Components/SummaryComponent.js').default,
        Provider,
        store
    );*/
}