import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

class LevelComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const navigateTo = () => {
            Navigation.push(this.props.component, {
                component: {
                    name: 'game.Quiz',
                    passProps: {
                    },
                    options: {
                        topBar: {
                            title: {
                                text: 'Asthma Quiz',
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
        const levelList = this.props.levels.map((level, index, arr)=> {
            return (
                <View key={index}>
            <TouchableOpacity style={(arr.length-1 === index)? styles.button : styles.buttonCompleted} onPress={() => {navigateTo()}} disabled={true}>
                <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
            </TouchableOpacity>
                </View>
            );
        });
        const lockedLevelList = this.props.locked.map((level, index)=> {
            return (
                <View key={index}>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
                    </TouchableOpacity>
                </View>
            );
        });
        return (
        <View style={styles.buttonContainer}>
            {levelList}
            {lockedLevelList}
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
        backgroundColor: '#848415',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonCompleted: {
        alignItems: 'center',
        backgroundColor: '#dadab8',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonDisabled: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});
export default LevelComponent;