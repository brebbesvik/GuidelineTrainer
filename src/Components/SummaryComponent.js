import React, { Component } from 'react';
import {Button, Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from "react-native-navigation";

import {resetQuiz} from "../Actions/CounterAction";
import {hideSummary} from "../Actions/SummaryAction";
import ChartComponent from './ChartComponent';

const mapStateToProps = (state) => ({
    summary: state.summaryReducer.summary,
    scores: state.counterReducer.scores,
    numberOfQuestions: state.counterReducer.numberOfQuestions
});

const mapDispatchToProps = {
    resetQuiz,
    hideSummary,
};

class SummaryComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const scorePerQuestion = () => {
            let scores = 0;
            this.props.scores.map((score, index) => {
                scores += score.getScore();
            });
            let average = scores / this.props.numberOfQuestions;
            return average.toFixed(2);
        };
        const scoresList = this.props.scores.map((score, index) => {
            return <Text key={index} style={styles.score}>{score.getDiscipline()}: {score.getScore()}</Text>
        });
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.summary}
                onRequestClose={() => {
            }}>
                <View style={styles.modalViewParent}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <View style={styles.textContainer}>
                                <Text style={{fontSize: 25}}>Quiz scores</Text>
                            </View>
<ChartComponent scores={this.props.scores}/>
                            {/*<View style={styles.scoreContainer}>
                                {scoresList}
                                <Text style={styles.score}>To pass the quiz you need a score of 10 or higher</Text>
                            </View>
                            <View style={styles.scoreContainer}>
                                <Text style={styles.score}>Number of questions: {this.props.numberOfQuestions}</Text>
                                <Text style={styles.score}>Average score per question: {scorePerQuestion()}</Text>
                            </View>*/}
                            <View style={styles.buttonContainer}>
                                <Button title={"Back to menu"} color="#841584" onPress={() => {
                                    this.props.resetQuiz();
                                    this.props.hideSummary();
                                    Navigation.popToRoot(this.props.component);}}/>
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
        width: '90%',
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
    description: {
        fontSize: 18,
    },
    buttonContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20
        /*flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',*/
    },
    button:{
        width: '40%',
    },
    scoreContainer: {
        backgroundColor: 'white',
        margin: 20,
    },
    score: {
        fontSize: 18,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);