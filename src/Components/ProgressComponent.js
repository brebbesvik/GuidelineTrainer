import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";

import ProgressLevelComponent from './ProgressLevelComponent';

import {hideProgression, getNewLevels, nextLevelRequirements} from "../Actions/ProgressAction";
import {showSummary} from "../Actions/SummaryAction";
import QuizDAO from "../DAO/QuizDAO";


const mapStateToProps = (state) => ({
    disciplines: state.disciplineReducer.disciplines,
    lockedLevels: state.disciplineReducer.lockedLevels,
    unlockedLevels: state.disciplineReducer.unlockedLevels,
    progression: state.progressReducer.progression,
    scores: state.counterReducer.scores,
});

const mapDispatchToProps = {
    hideProgression,
    showSummary,
    nextLevelRequirements
};

class ProgressComponent extends Component{
    constructor(props) {
        super(props);
    };
    static propTypes = {
        componentId: PropTypes.string
    };
    render() {
        const disciplineList = this.props.disciplines.map((discipline, index) => {
            let score = 0;
            for (let i = 0; i < this.props.scores.length; i++) {
                if (discipline === this.props.scores[i].getDiscipline())
                    score = this.props.scores[i].getScore();
            }
            let allowedLevels = [];
            /* This code should be put into an action. API-calls shouldn't be called in a component.
            * The intended action exists and needs to be rewritten to fit this purpose. Be careful as loop
            * calls to redux can result in warings or errors.
            * this.props.getNewLevels(discipline, score);
            */
            QuizDAO.getAllowedLevels("Asthma", discipline, score).map((level)=>{allowedLevels.push(level.getLevel())});
            //this.props.getNewLevels(discipline, score);
            return (
                <View key={index}>
                    <Text key={index} style={{fontSize: 20, margin:10}}>{discipline}</Text>
                    <ProgressLevelComponent unlocked={this.props.unlockedLevels[discipline]} locked={this.props.lockedLevels[discipline]} newLevels={allowedLevels} component={this.props.componentId}/>
                </View>
            );
        });
        const goToSummary = () => {
            this.props.nextLevelRequirements();
            this.props.hideProgression();
            this.props.showSummary();
        };

        return (
            <Modal transparent={true}
                   visible={this.props.progression}
                   onRequestClose={()=>{}}
            >
                <View style={styles.modalViewParent}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <View style={styles.textContainer}>
                                <Text style={{fontSize: 25}}>Level progression</Text>
                            </View>
                                {disciplineList}
                                <View style={styles.buttonView}>
                                    {/*<Button title={"Next"} color="#841584" onPress={() => {
                                        {goToSummary()}
                                    }}/>*/}
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {goToSummary()}}>
                                        <Text style={{fontSize:17, color:"#FFFFFF"}}>Next</Text>
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
    container: {
        flex: 1,
    },
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
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
    },
    button: {
        height: 60,
        alignItems: 'center',
        backgroundColor:"#420a42",
        paddingTop:17,
        padding:10,
        borderRadius: 10,
        marginRight: '3%',
        marginLeft: '3%'
    },
    buttonView:{
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
});



export default connect(mapStateToProps, mapDispatchToProps)(ProgressComponent);