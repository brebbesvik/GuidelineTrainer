import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

class MainMenuComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const navigateTo = () => {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'game.Quiz',
                    passProps: {
                    },
                    options: {
                        topBar: {
                            title: {
                                text: 'Quiz',
                                color: '#FFFFFF'
                            },
                            background: {
                                color: '#841584'
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
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>Tuberculosis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
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
    buttonContainer: {
        flexDirection: 'row'
    },
});



export default MainMenuComponent;