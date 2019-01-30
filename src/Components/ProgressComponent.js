import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Modal} from 'react-native';
import PropTypes from "prop-types";

import ProgressLevelComponent from './ProgressLevelComponent';

import {hideProgression} from "../Actions/ProgressAction";
import {showSummary} from "../Actions/SummaryAction";

import QuizDAO from "../DAO/QuizDAO";

const mapStateToProps = (state) => ({
    disciplines: state.disciplineReducer.disciplines,
    lockedLevels: state.disciplineReducer.lockedLevels,
    unlockedLevels: state.disciplineReducer.unlockedLevels,
    progression: state.progressReducer.progression,
    scores: state.counterReducer.scores
});



const mapDispatchToProps = {
    hideProgression,
    showSummary
};

class ProgressComponent extends Component{
    constructor(props) {
        super(props);
    };
    static propTypes = {
        componentId: PropTypes.string
    };
    render() {
        const disciplineList = this.props.disciplines.map((discipline, index) => {
            let score = 0;
            for (let i = 0; i < this.props.scores.length; i++) {
                if (discipline === this.props.scores[i].getDiscipline())
                    score = this.props.scores[i].getScore();
            }
            return (
                <View key={index}>
                    <Text key={index} style={{fontSize: 30, margin:10}}>{discipline}</Text>
                    <ProgressLevelComponent unlocked={this.props.unlockedLevels[discipline]} locked={this.props.lockedLevels[discipline]} newLevels={QuizDAO.getAllowedLevels("Asthma", discipline, score)} component={this.props.componentId}/>
                </View>
            );
        });
        const goToSummary = () => {
            this.props.hideProgression();
            this.props.showSummary();
        };

        return (
            <Modal visible={this.props.progression} onRequestClose={()=>{}}>
                <ScrollView>
                    {disciplineList}
                    <View style={styles.buttonView}>
                        <Button title={"Start quiz"} color="#841584" onPress={() => {
                            {goToSummary()}
                        }}/>
                    </View>
                </ScrollView>
            </Modal>
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



export default connect(mapStateToProps, mapDispatchToProps)(ProgressComponent);