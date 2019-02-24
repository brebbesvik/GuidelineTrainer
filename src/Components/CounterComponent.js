import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import AnswerKeyComponent from '../Components/AnswerKeyComponent';

import {showAnswerKey, setAnswerCorrect, setAnswerWrong} from "../Actions/AnswerKeyAction";
import {setReward} from "../Actions/CounterAction";
import SummaryComponent from "./SummaryComponent";
import ProgressComponent from "./ProgressComponent";


const mapStateToProps = (state) => ({
    scores: state.counterReducer.scores,
    problem: state.counterReducer.problem,
    alternatives: state.counterReducer.alternatives,
    correctAlternative: state.counterReducer.correctAlternative
});

const mapDispatchToProps = {
    showAnswerKey,
    setAnswerCorrect,
    setAnswerWrong,
    setReward
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
        const buttonList = this.props.alternatives.map((answerAlternative, index) => {
            return (
                <View style={styles.singleButtonContainer} key={index}>
                    <TouchableOpacity style={styles.button}
                        key={index}
                        onPress={()=>{
                            this.props.setReward(answerAlternative.getReward());
                            if(index === this.props.correctAlternative) {
                                this.props.setAnswerCorrect();
                            }
                            else {
                                this.props.setAnswerWrong();
                            }
                            this.props.showAnswerKey();
                    }}>
                        <Text
                            allowFontScaling={true}
                              numberOfLines={4}
                         style={{fontSize:17, color:"#FFFFFF"}}>{answerAlternative.getAlternative()}</Text>
                    </TouchableOpacity>
                    {/*<Button
                key={index}
                title={line.getAlternative()}
                color="#841584"
                onPress={() => {
                    this.props.setReward(line.getReward());
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
            />*/}
            </View>
            )
        });
        /*const scoresList = this.props.scores.map((score, index) => {
            return <Text key={index} style={styles.score}>{score.getDiscipline()}: {score.getScore()}</Text>
        });*/
        return (
            <View style={styles.container}>
                <View style={{justifyContent:'center', height:"33%", margin: "5%", marginBottom: "10%", borderWidth: 1, borderRadius: 10, backgroundColor: 'white'}}>
                <ScrollView>
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{this.props.problem}</Text>
                </View>
                </ScrollView>
                </View>

                {/*<View style={styles.buttonContainer}>*/}

                <ScrollView>
                <View style={{alignItems: 'flex-start', flexDirection:'row', flexWrap: "wrap"}}>
                    {buttonList}
                </View>
                </ScrollView>


                {/*<View style={styles.scoreContainer}>
                    {scoresList}
                </View>*/}

                <AnswerKeyComponent component={this.props.componentId} />
                <SummaryComponent component={this.props.componentId} />
                <ProgressComponent component={this.props.componentId}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f2e7f2",
        height:"100%"
    },
    textContainer: {
        padding: 15,
        justifyContent:"center",
        height:'90%',
    },
    description: {
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    button:{
        height: 60,
        justifyContent:"center",
        backgroundColor:"#420a42",
        padding:15,
        borderRadius: 10
    },
    singleButtonContainer: {
        marginLeft: '5%',
        marginBottom: 10,
        width: '42.66%'
    },
    /*scoreContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    score: {
        fontSize: 18,
    },*/
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
