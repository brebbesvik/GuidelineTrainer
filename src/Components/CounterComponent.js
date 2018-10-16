import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

export default class CounterApp extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>An adult comes to the hospital with a child. The child has difficulty breating. You immediatley spots the childs blue finger nails</Text>
                        <Text style={styles.question}>What diagnosis would you suggest?</Text>
                    </View>

                <View style={styles.buttonContainer}>
                     <Button
                         title="Moderate asthma"
                         onPress={() => {Alert.alert('Wrong!'); this.props.decrement()}}
                         accessibilityLabel="Moderate asthma"
                         style={styles.button}
                     />
                     <Button
                         title="Tuberculosis"
                         onPress={() => {Alert.alert('Wrong!'); this.props.decrement()}}
                         accessibilityLabel="Moderate asthma"
                         style={styles.button}
                     />
                     <Button
                         title="Severe asthma"
                         onPress={() => {Alert.alert('Correct!'); this.props.increment()}}
                         accessibilityLabel="Severe asthma"
                         style={styles.button}
                     />
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>Score: {this.props.count}</Text>
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
    question: {
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});