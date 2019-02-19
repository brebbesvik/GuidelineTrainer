import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity} from 'react-native';

import {hideAnswerKey} from "../Actions/AnswerKeyAction";
import {updateScore, nextQuestion} from "../Actions/CounterAction";
import {showSummary} from "../Actions/SummaryAction";
import {showProgression} from "../Actions/ProgressAction";
import store from "../Reducers";

import {storeScores} from '../Actions/ActionThunks';

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
    showProgression
};

class AnswerKeyComponent extends Component{
    constructor(props) {
        super(props);
    };
    state = {
        explanation: this.props.answerKeyExplanation,
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
            store.dispatch(storeScores());
            this.props.hideAnswerKey();
            this.props.showProgression();
        };
        const readMore = ()=> {
            this.setState({
                explanation: this.props.answerKeyExplanation,
                readMoreClicked: true
            })
        };
        const dontReadMore = ()=> {
            /*this.setState({
                explanation: ''
            })*/
        };
        const dontGiveUp = ()=> {
            this.setState({
                readMoreClicked: false
            })
        };
        const displayExplanationButton = ()=> {
            if (!this.state.readMoreClicked && !this.props.isAnswerCorrect)
                 /*return (<Button title={(this.props.isAnswerCorrect)? "Read more" : "Give up"} color="#841584" onPress={() => {
                     readMore();

                 }}/>);*/
                return (<TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        readMore();
                }}>
                    <Text style={{fontSize:17, color:"#FFFFFF"}}>{(this.props.isAnswerCorrect)? "Read more" : "Learn more"}</Text>
                </TouchableOpacity>);

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
                                <Text style={{fontSize: 20}}>{(this.props.isAnswerCorrect || this.state.readMoreClicked) ? this.props.answerKeyExplanation : ""}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                {/*<Button title={"Close"} color="#841584" onPress={() => {
                                    {updateScoreAndQuestion()}
                                    this.props.hideAnswerKey();
                                    {dontReadMore()}
                                    {dontGiveUp()}
                                    }}/>*/}
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                    {updateScoreAndQuestion()}
                                    this.props.hideAnswerKey();
                                    {dontReadMore()}
                                    {dontGiveUp()}
                                }}>
                                    <Text style={{fontSize:17, color:"#FFFFFF"}}>{(this.props.isAnswerCorrect || this.state.readMoreClicked)? "Next" : "Try again"}</Text>
                                </TouchableOpacity>

                                {displayExplanationButton()}
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
        backgroundColor: "#0d020dAA"
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
    button:{
        height: 60,
        justifyContent:"center",
        backgroundColor:"#420a42",
        padding:15,
        borderRadius: 10
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row-reverse',
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerKeyComponent);