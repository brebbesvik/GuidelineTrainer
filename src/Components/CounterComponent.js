import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import AnswerKeyComponent from '../Components/AnswerKeyComponent';

import {increment, decrement} from "../Actions/CounterAction";
import {showAnswerKey} from "../Actions/AnswerKeyAction";

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,
    problem: state.counterReducer.problem,
    alternatives: state.counterReducer.alternatives
});

const mapDispatchToProps = {
    increment,
    decrement,
    showAnswerKey,
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
                title={line[0] + " " + line[1]}
                onPress={() => {
                    this.props.showAnswerKey();
                    if(line[2]==='Correct!')
                        this.props.increment();
                    else
                        this.props.decrement();
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
