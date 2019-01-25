import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from "react-native-navigation";

/*const mapStateToProps = (state) => ({
    allLevels: state.disciplineReducer.allLevels,
});*/

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
        /*const getLevels = (category, discipline) => {
            console.log("Levels: " + this.props.allLevels[discipline]);
            return this.props.allLevels[discipline];

        };
        const levelList = getLevels("Asthma", this.props.discipline).map((level, index) => {
            return (
                <View key={index}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigateTo()}}>
                        <Text key={index} style={{fontSize: 18}}>{level}</Text>
                    </TouchableOpacity>
                </View>
            )
        });*/
        const levelList = this.props.levels.map((level, index)=> {
            return (
                <Text style={{fontSize: 18, marginRight: 10, backgroundColor: '#158415'}} key={index}>{level}</Text>
            );
        }) ;
        return (
        <View style={styles.buttonContainer}>
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
export default LevelComponent;