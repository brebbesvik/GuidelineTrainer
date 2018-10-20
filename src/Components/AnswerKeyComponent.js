import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal} from 'react-native';


export default class AnswerKeyComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.answerKey}
                onRequestClose={() => {
                }}>
                <View style={styles.modalViewParent}>
                    <View style={styles.modalView}>
                        <View style={styles.textContainer}>
                            <Text style={{fontSize: 30, color: "#00FF00"}}>Correct!</Text>
                            <Text style={{fontSize: 18}}>Difficulty breathing and lower chest wall indrawing are all
                                symptoms on asthma. However, in this case central cyanosis is what indicates that the
                                asthma is severe.</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={"Evidence"} onPress={() => {
                            }}/>
                            <Button title={"Guideline"} onPress={() => {
                            }}/>
                            <Button title={"Close"} onPress={() => {this.props.hideAnswerKey();}}/>
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});