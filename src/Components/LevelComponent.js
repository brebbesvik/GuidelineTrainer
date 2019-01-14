import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const mapStateToProps = (state) => ({
    allLevels: state.disciplineReducer.allLevels
});

class LevelComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const levelList = this.props.allLevels[this.props.discipline].map((level, index) => {
            return <View key={index}><Text key={index}>{level}</Text></View>
        });
        return (
        <View>
            {levelList}
        </View>
        );
    }
}
export default connect(mapStateToProps)(LevelComponent);