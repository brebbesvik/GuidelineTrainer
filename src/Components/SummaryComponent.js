import React, { Component } from 'react';
import {Text, View} from 'react-native';

class SummaryComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <View>
                <Text>This is a short summary</Text>
            </View>
        );
    }
}
export default SummaryComponent;