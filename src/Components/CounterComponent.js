import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Button} from 'react-native';

import AnswerKeyComponent from '../Components/AnswerKeyComponent';

import {showAnswerKey, setAnswerCorrect, setAnswerWrong} from "../Actions/AnswerKeyAction";
import SummaryComponent from "./SummaryComponent";


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
    static propTypes = {
        componentId: PropTypes.string
    };
    render() {
        var props = this.props;
        const buttonList = this.props.alternatives.map((line, index) => {
            return <View style={styles.singleButtonContainer} key={index}><Button
                key={index}
                title={line.getAlternative()}
                color="#841584"
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
            /></View>
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

                <AnswerKeyComponent component={this.props.componentId} />
                <SummaryComponent component={this.props.componentId} />

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
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    button:{
        width: '40%',
    },
    singleButtonContainer: {
        marginLeft: 20,
        marginBottom: 10,
    },
    scoreContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    score: {
        fontSize: 18,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
