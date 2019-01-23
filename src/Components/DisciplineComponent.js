import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
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
                        <LevelComponent discipline={discipline} component={this.props.componentId}/>
                    </View>
                );

        });

        return (
            <ScrollView>
                {disciplineList}
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
    buttonContainer: {
        flexDirection: 'row'
    },
});



export default connect(mapStateToProps)(DisciplineComponent);