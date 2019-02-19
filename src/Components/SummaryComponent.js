import React, { Component } from 'react';
import {Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
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

                            <View style={styles.buttonContainer}>
                                {/*<Button title={"Back to menu"} color="#841584" onPress={() => {
                                    this.props.resetQuiz();
                                    this.props.hideSummary();
                                    Navigation.popToRoot(this.props.component);}}/>*/}
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        this.props.resetQuiz();
                                        this.props.hideSummary();
                                        Navigation.popToRoot(this.props.component);}}>
                                    <Text style={{fontSize:17, color:"#FFFFFF"}}>Back to menu</Text>
                                </TouchableOpacity>
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
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    button:{
        height: 60,
        alignItems: 'center',
        backgroundColor:"#420a42",
        paddingTop:17,
        padding:10,
        borderRadius: 10,
        marginRight: '3%',
        marginLeft: '3%'
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