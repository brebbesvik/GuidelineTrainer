import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

import ChartComponent from './ChartComponent';

class MainMenuComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
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
                    <Text style={{fontSize: 30, margin:10}}>Modules</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>Asthma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>Tuberculosis</Text>
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
        padding: 20,
        margin: 10,
    },
    buttonDisabled: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});



export default MainMenuComponent;