import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Modal} from 'react-native';


export default class CounterApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
        };
    }
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };
    render() {
        var props = this.props;
        const buttonList = this.props.alternatives.map((line, index) => {
            return <Button
                key={index}
                title={line[0] + " " + line[1]}
                onPress={() => {
                    //Alert.alert(line[2]);
                    this.setModalVisible(true);
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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={styles.modalviewparent}>
                        <View style={styles.modalview}>
                                <View style={styles.textContainer}>
                                <Text style={{fontSize: 30, color:"#00FF00"}}>Correct!</Text>
                                <Text style={{fontSize: 18}}>Difficulty breathing and lower chest wall indrawing are all symptoms on asthma. However, in this case central cyanosis is what indicates that the asthma is severe.</Text>
                             </View>
                            <View style={styles.buttonContainer}>
                                <Button title={"Evidence"} onPress={() => {}}/>
                                <Button title={"Guideline"} onPress={() => {}}/>
                                <Button title={"Close"} onPress={this.setModalVisible.bind(this, false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalviewparent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalview: {
        height: '80%',
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
    },
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