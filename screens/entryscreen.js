import React from "react";
import {Alert, Text, View} from "react-native";
import {ButtonGroup, Card} from "react-native-elements";

class EntryScreen extends React.Component {
    static navigationOptions = {
        title: 'Examine for a diagnosis',
    };
    constructor () {
        super()
        this.state = {
            selectedIndex: -1
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        if (selectedIndex == 1) Alert.alert('Correct!');
        else Alert.alert('Wrong!');
    }
    render() {
        const buttons = ['Mild asthma', 'Severe asthma', 'Tuberkolosis']
        const { selectedIndex } = this.state
        return (
            <View>
                <Card>
                    <Text style={{fontSize: 18}}>A child enters the hospital with a wheeze and has difficulty breathing. What is the first you examine the child for?</Text>
                </Card>
                <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons}/>
            </View>
        );
    }
}
export default EntryScreen;