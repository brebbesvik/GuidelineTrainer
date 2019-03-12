import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
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
                return (
                    <View key={index}>
                        <Text key={index} style={{fontSize: 20, margin:10}}>{discipline}</Text>
                        <LevelComponent levels={this.props.unlockedLevels[discipline]} locked={this.props.lockedLevels[discipline]} component={this.props.componentId}/>
                    </View>
                );

        });

        return (
            <ScrollView style={{backgroundColor:"#f2e7f2"}}>
                {disciplineList}
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {navigateTo()}}>
                        <Text style={{fontSize:17, color:"#FFFFFF"}}>Start quiz</Text>
                    </TouchableOpacity>
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
        height: 60,
        alignItems: 'center',
        backgroundColor:"#420a42",
        paddingTop:17,
        padding:10,
        borderRadius: 10,
        marginRight: '3%',
        marginLeft: '3%'
    },
    buttonDisabled: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
        margin: 10,
    },
    buttonView:{
        alignItems: 'center'
    },
});



export default connect(mapStateToProps)(DisciplineComponent);