import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';

import AnswerKeyComponent from '../Components/AnswerKeyComponent';

import {showAnswerKey, setAnswerCorrect, setAnswerWrong} from "../Actions/AnswerKeyAction";
import {setReward} from "../Actions/CounterAction";
import SummaryComponent from "./SummaryComponent";


const mapStateToProps = (state) => ({
    scores: state.counterReducer.scores,
    problem: state.counterReducer.problem,
    alternatives: state.counterReducer.alternatives,
    correctAlternative: state.counterReducer.correctAlternative
});

const mapDispatchToProps = {
    showAnswerKey,
    setAnswerCorrect,
    setAnswerWrong,
    setReward
};

class CounterComponent extends Component {
    constructor(props) {
        super(props);
    };
    static propTypes = {
        componentId: PropTypes.string
    };
    render() {
        var props = this.props;
        const buttonList = this.props.alternatives.map((line, index) => {
            return <View style={styles.singleButtonContainer} key={index}><Button
                key={index}
                title={line.getAlternative()}
                color="#841584"
                onPress={() => {
                    this.props.setReward(line.getReward());
                    if(index === this.props.correctAlternative) {
                        this.props.setAnswerCorrect();
                    }
                    else {
                        this.props.setAnswerWrong();
                    }
                    this.props.showAnswerKey();
                }}
                accessibilityLabel="Moderate asthma"
                style={styles.button}
            /></View>
        });
        const scoresList = this.props.scores.map((score, index) => {
            return <Text key={index} style={styles.score}>{score.getDiscipline()}: {score.getScore()}</Text>
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{this.props.problem}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {buttonList}
                </View>

                <View style={styles.scoreContainer}>
                    {scoresList}
                </View>

                <AnswerKeyComponent component={this.props.componentId} />
                <SummaryComponent component={this.props.componentId} />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        backgroundColor: 'white',
        margin: 20,
    },
    description: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    button:{
        width: '40%',
    },
    singleButtonContainer: {
        marginLeft: 20,
        marginBottom: 10,
    },
    scoreContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    score: {
        fontSize: 18,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
