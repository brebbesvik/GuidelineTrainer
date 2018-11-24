import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal} from 'react-native';

import {hideAnswerKey} from "../Actions/AnswerKeyAction";
import {increment, decrement, nextQuestion} from "../Actions/CounterAction";
import {Navigation} from "react-native-navigation";

const mapStateToProps = (state) => ({
    answerKey: state.answerKeyReducer.answerKey,
    isAnswerCorrect: state.answerKeyReducer.isAnswerCorrect,
    questionNumber: state.counterReducer.questionNumber,
    numberOfQuestions: state.counterReducer.numberOfQuestions
});

const mapDispatchToProps = {
    hideAnswerKey,
    increment,
    decrement,
    nextQuestion,
};

class AnswerKeyComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const setTitle = () => {
          if(this.props.isAnswerCorrect)
              return <Text style={{fontSize: 30, color: "#00FF00"}}>Correct!</Text>;
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
            Navigation.push(this.props.component, {
                component: {
                    name: 'game.QuizSummary',
                    passProps: {
                    },
                    options: {
                        topBar: {
                            title: {
                                text: 'Summaryur'
                            }
                        }
                    }
                }
            });
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
                            <Text style={{fontSize: 18}}>Difficulty breathing and lower chest wall indrawing are all
                                symptoms on asthma. However, in this case central cyanosis is what indicates that the
                                asthma is severe.</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={"Evidence"} onPress={() => {
                            }}/>
                            <Button title={"Guideline"} onPress={() => {
                            }}/>
                            <Button title={"Close"} onPress={() => {
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