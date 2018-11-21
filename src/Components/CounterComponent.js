import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import AnswerKeyComponent from '../Components/AnswerKeyComponent';

import {showAnswerKey, setAnswerCorrect, setAnswerWrong} from "../Actions/AnswerKeyAction";

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,
    problem: state.counterReducer.problem,
    alternatives: state.counterReducer.alternatives,
    correctAlternative: state.counterReducer.correctAlternative
});

const mapDispatchToProps = {
    showAnswerKey,
    setAnswerCorrect,
    setAnswerWrong,
};

class CounterComponent extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        var props = this.props;
        const buttonList = this.props.alternatives.map((line, index) => {
            return <Button
                key={index}
                title={line}
                onPress={() => {
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
            />
        });
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{this.props.problem}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {buttonList}
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>Score: {this.props.count}</Text>
                    <Text style={styles.score}>Correct: {this.props.correctAlternative}</Text>
                    <Text style={styles.score}>Alternatives: {this.props.alternatives}</Text>
                </View>

                <AnswerKeyComponent />

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

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
