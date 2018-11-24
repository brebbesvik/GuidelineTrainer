import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
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
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.description}>A short summary</Text>
                </View>

            <View style={styles.scoreContainer}>
                <Text style={styles.score}>Score: {this.props.count}</Text>
                <Text style={styles.score}>Number of questions: {this.props.numberOfQuestions}</Text>
                <Text style={styles.score}>Average score per question: {scorePerQuestion()}</Text>
            </View>
        </View>
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