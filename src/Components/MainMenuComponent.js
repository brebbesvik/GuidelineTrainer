import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

import {getLockedLevels, getUnlockedLevels, initializeQuiz} from "../Actions/ActionThunks";
import store from "../Reducers";
import Game from "../GameEngine/Game";

class MainMenuComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const initializeApp = () => {

        };
        const navigateTo = () => {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'game.LevelsMenu',
                    passProps: {
                    },
                    options: {
                        topBar: {

                            title: {
                                text: 'Asthma Quiz Difficulties',
                                color: '#FFFFFF'
                            },
                            background: {
                                color: '#841584'
                            },
                            backButton: {
                                color: '#FFFFFF'
                            }
                        }
                    }
                }
            });
        };
        return (
            <View>
                <View>
                    <Text style={{fontSize: 25, margin:10}}>Modules</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        Game._skills = null;
                        Game._quiz = null;
                        Game._scores = null;
                        Game.createQuiz("Asthma");
                        store.dispatch(getUnlockedLevels());
                        store.dispatch(getLockedLevels());
                        store.dispatch(initializeQuiz());
                        navigateTo();
                    }
                    }>
                        <Text style={{fontSize: 18}}>Asthma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>Jaundice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>Malaria</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '3%',
        marginRight: '3%',
        width: '27%'
    },
    buttonDisabled: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '3%',
        marginRight: '3%',
        width: '27%'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});



export default MainMenuComponent;