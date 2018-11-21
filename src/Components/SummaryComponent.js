import React, { Component } from 'react';
import {Text, View, Button} from 'react-native';

class SummaryComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <View>
                <Text>This is a short summary</Text>
                <Button title={"Redo"} onPress={}/>
            </View>
        );
    }
}
export default SummaryComponent;