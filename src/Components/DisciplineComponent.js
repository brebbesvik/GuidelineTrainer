import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";
import PropTypes from "prop-types";

import LevelComponent from './LevelComponent';

const mapStateToProps = (state) => ({
    disciplines: state.disciplineReducer.disciplines,
    allLevels: state.disciplineReducer.allLevels,
    unlockedLevels: state.disciplineReducer.unlockedLevels
});

class DisciplineComponent extends Component{
    constructor(props) {
        super(props);
    };
    static propTypes = {
        componentId: PropTypes.string
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
        const disciplineList = this.props.disciplines.map((discipline, index) => {
            if (this.props.allLevels[index].length === 0)
                return <View key={index}><Text key={index} style={{fontSize: 30, margin:10}}>{discipline}</Text></View>;
            else
                return <View key={index}><Text key={index} style={{fontSize: 30, margin:10}}>{discipline}</Text><LevelComponent discipline={index} component={this.props.componentId}/></View>
        });

        return (
            <View>
                {disciplineList}
                {/*
                <View>
                    <Text style={{fontSize: 30, margin:10}}>Choosing medical tests</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize: 30, margin:10}}>Diagnosis</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize: 30, margin:10}}>Treatment</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize: 30, margin:10}}>Evaluation</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text style={{fontSize: 18}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => {navigateTo()}} disabled={true}>
                        <Text style={{fontSize: 18}}>3</Text>
                    </TouchableOpacity>
                </View>*/}
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



export default connect(mapStateToProps)(DisciplineComponent);