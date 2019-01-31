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
    state = {
        explanation: '',
        boxHeight: '40%',
        readMoreClicked: false
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
            if (this.props.isAnswerCorrect || this.state.readMoreClicked) {
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
        const readMore = ()=> {
            this.setState({
                explanation: this.props.answerKeyExplanation,
                boxHeight: '60%',
                readMoreClicked: true
            })
        };
        const dontReadMore = ()=> {
            this.setState({
                explanation: '',
                boxHeight: '40%'
            })
        };
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.answerKey}
                onRequestClose={() => {
                }}>
                <View style={styles.modalViewParent}>
                    <View style={[styles.modalView, {height: this.state.boxHeight}]}>
                        <ScrollView>
                            <View style={styles.textContainer}>
                                {setTitle()}
                                <Text style={{fontSize: 18}}>{this.state.explanation}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title={"Read more"} color="#841584" onPress={() => {
                                    readMore();
                                }}/>
                                {/*<Button title={"Guideline"} color="#841584" onPress={() => {
                                }}/>*/}
                                <Button title={"Close"} color="#841584" onPress={() => {
                                    {updateScoreAndQuestion()}
                                    this.props.hideAnswerKey();
                                    {dontReadMore()};
                                    }}/>
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
        backgroundColor: "#000000AA"
    },
    modalView: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10
    },
    textContainer: {
        backgroundColor: 'white',
        margin: 20,
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerKeyComponent);