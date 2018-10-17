import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

/*
TODO
Need to use modal instead of alert. Then i can display much more content like
infobuttons, images, videos, url to proof and original CPGs
 */
export default class CounterApp extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>{this.props.problem}</Text>
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