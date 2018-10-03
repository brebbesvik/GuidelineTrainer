import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { ButtonGroup, Card, List, ListItem } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';

const list = [
    {
        title: 'Entry points',
        page: 'EntryGuideline'
    },
    {
        title: 'Diagnosing',
        page: 'Diagnosing'
    },
    {
        title: 'Treatment',
        page: 'Details'
    }
];
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'GuidelineTrainer',
    };
    render() {
        return (
            <View>
                <List>
                    {
                        list.map((item) => (
                            <ListItem
                            key={item.title}
                            title={item.title}
                            onPress={() => this.props.navigation.navigate(item.page)}
                            />
                        ))
                    }
                </List>
            </View>
        );
    }
}
class EntryScreen extends React.Component {
    static navigationOptions = {
        title: 'Entry point for a guideline',
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
        const buttons = ['Asthma', 'Severe asthma', 'Tuberkolosis']
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
        Details: DetailsScreen,
        EntryGuideline: EntryScreen,
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
