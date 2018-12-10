import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal} from 'react-native';

import {hideAnswerKey} from "../Actions/AnswerKeyAction";
import {increment, decrement, nextQuestion} from "../Actions/CounterAction";
import {showSummary} from "../Actions/SummaryAction";
import {Navigation} from "react-native-navigation";

const mapStateToProps = (state) => ({
    answerKey: state.answerKeyReducer.answerKey,
    isAnswerCorrect: state.answerKeyReducer.isAnswerCorrect,
    questionNumber: state.counterReducer.questionNumber,
    numberOfQuestions: state.counterReducer.numberOfQuestions,
    answerKeyExplanation: state.counterReducer.answerKeyExplanation
});

const mapDispatchToProps = {
    hideAnswerKey,
    increment,
    decrement,
    nextQuestion,
    showSummary,
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
            if (this.props.isAnswerCorrect) {
                this.props.increment();
                if (this.props.questionNumber+1 < this.props.numberOfQuestions)
                    this.props.nextQuestion();
                else goToSummary();
            }
            else {
                this.props.decrement();
            }
        };
        const goToSummary = () => {
            this.props.hideAnswerKey();
            this.props.showSummary();
            /*Navigation.push(this.props.component, {
                component: {
                    name: 'game.QuizSummary',
                    passProps: {
                    },
                    options: {
                        topBar: {
                            title: {
                                text: 'Summary'
                            }
                        }
                    }
                }
            });*/
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
        height: '80%',
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