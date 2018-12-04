import React, { Component } from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    summary: state.summaryReducer.summary,
    count: state.counterReducer.count,
    numberOfQuestions: state.counterReducer.numberOfQuestions
});

const mapDispatchToProps = {
};

class SummaryComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const scorePerQuestion = () => {
            let average = this.props.count / this.props.numberOfQuestions;
            return average.toFixed(2);
        };
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.summary}
                onRequestClose={() => {
            }}>
                <View style={styles.modalViewParent}>
                    <View style={styles.modalView}>
                        <View style={styles.textContainer}>
                            <Text style={{fontSize: 30}}>Quiz summary</Text>
                        </View>

                        <View style={styles.scoreContainer}>
                            <Text style={styles.score}>Score: {this.props.count}</Text>
                            <Text style={styles.score}>Number of questions: {this.props.numberOfQuestions}</Text>
                            <Text style={styles.score}>Average score per question: {scorePerQuestion()}</Text>
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
    description: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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