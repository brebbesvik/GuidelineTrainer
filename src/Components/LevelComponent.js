import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

const mapStateToProps = (state) => ({
    allLevels: state.disciplineReducer.allLevels
});

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
                                text: 'Asthma Quiz Level 1',
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
        const levelList = this.props.allLevels[this.props.discipline].map((level, index) => {
            return <View key={index}><TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}><Text key={index} style={{fontSize: 18}}>{level}</Text></TouchableOpacity></View>
        });
        return (
        <View>
            {levelList}
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
export default connect(mapStateToProps)(LevelComponent);