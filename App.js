import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { ButtonGroup, Card, List, ListItem } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/homescreen';
import EntryScreen from './screens/entryscreen';
import DiagnosingScreen from './screens/diagnosingscreen';
import TreatmentScreen from './screens/treatmentscreen';

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}
const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: TreatmentScreen,
        EntryGuideline: EntryScreen,
        Diagnosing: DiagnosingScreen
    },
    {
        initialRouteName: 'Home',
    }
);
export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
