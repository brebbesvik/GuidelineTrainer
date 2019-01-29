import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, ScrollView} from 'react-native';

import {hideAnswerKey} from "../Actions/AnswerKeyAction";
import {updateScore, nextQuestion, storeScores} from "../Actions/CounterAction";
import {showSummary} from "../Actions/SummaryAction";
import {showProgression} from "../Actions/ProgressAction";

const mapStateToProps = (state) => ({
    answerKey: state.answerKeyReducer.answerKey,
    isAnswerCorrect: state.answerKeyReducer.isAnswerCorrect,
    discipline: state.counterReducer.discipline,
    questionNumber: state.counterReducer.questionNumber,
    numberOfQuestions: state.counterReducer.numberOfQuestions,
    answerKeyExplanation: state.counterReducer.answerKeyExplanation
});

const mapDispatchToProps = {
    hideAnswerKey,
    updateScore,
    nextQuestion,
    showSummary,
    storeScores,
    showProgression
};

class AnswerKeyComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const setTitle = () => {
          if(this.props.isAnswerCorrect)
              return <Text style={{fontSize: 30, color: "#228B22"}}>Correct!</Text>;
          else
              return <Text style={{fontSize: 30, color: "#FF0000"}}>Wrong!</Text>;
        };
        const updateScoreAndQuestion = () => {
            this.props.updateScore(this.props.discipline);
            if (this.props.isAnswerCorrect) {
                if (this.props.questionNumber+1 < this.props.numberOfQuestions) {
                    this.props.nextQuestion();
                }
                else {
                    goToSummary();
                }
            }
        };
        const goToSummary = () => {
            this.props.storeScores();
            this.props.hideAnswerKey();
            this.props.showProgression();
        };
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.answerKey}
                onRequestClose={() => {
                }}>
                <View style={styles.modalViewParent}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <View style={styles.textContainer}>
                                {setTitle()}
                                <Text style={{fontSize: 18}}>{this.props.answerKeyExplanation}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title={"Evidence"} color="#841584" onPress={() => {
                                }}/>
                                <Button title={"Guideline"} color="#841584" onPress={() => {
                                }}/>
                                <Button title={"Close"} color="#841584" onPress={() => {
                                    {updateScoreAndQuestion()}
                                    this.props.hideAnswerKey();}}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalViewParent: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: '60%',
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    textContainer: {
        backgroundColor: 'white',
        margin: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerKeyComponent);