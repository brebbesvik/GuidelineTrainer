import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from 'react-native';
import PropTypes from "prop-types";

import LevelComponent from './LevelComponent';
import {Navigation} from "react-native-navigation";

const mapStateToProps = (state) => ({
    disciplines: state.disciplineReducer.disciplines,
    lockedLevels: state.disciplineReducer.lockedLevels,
    unlockedLevels: state.disciplineReducer.unlockedLevels,
    testText: state.disciplineReducer.testText
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
            /*if (this.props.allLevels[index].length === 0)
                return (
                    <View key={index}>
                        <Text key={index} style={{fontSize: 30, margin:10}}>{discipline}</Text>
                    </View>
                );
            else*/
                return (
                    <View key={index}>
                        <Text key={index} style={{fontSize: 30, margin:10}}>{discipline}</Text>
                        <LevelComponent levels={this.props.unlockedLevels[discipline]} locked={this.props.lockedLevels[discipline]} component={this.props.componentId}/>
                    </View>
                );

        });

        return (
            <ScrollView>
                {disciplineList}
                {/*<Text>Tester en tekst: {this.props.allLevels}</Text>*/}
                <View style={styles.buttonView}>
                <Button title={"Start quiz"} color="#841584" onPress={() => {navigateTo()}}/>
                </View>
            </ScrollView>
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
    buttonView:{
        marginLeft: 20,
        marginRight: 40,
    },
});



export default connect(mapStateToProps)(DisciplineComponent);