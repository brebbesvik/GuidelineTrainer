import React from "react";
import {View} from "react-native";
import {List, ListItem} from "react-native-elements";

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
export default HomeScreen;