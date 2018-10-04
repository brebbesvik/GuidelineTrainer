import React from 'react';
import {Alert, Text, View, WebView} from 'react-native';
import {Card, ButtonGroup} from 'react-native-elements';

class TreatmentScreen extends React.Component {
    static navigationOptions = {
        title: 'Picking a guideline',
    };
    constructor () {
        super();
        this.state = {
            selectedIndex: -1
        };
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
        if (selectedIndex == 0) Alert.alert('Correct!');
        else Alert.alert('Wrong!');
    }
    render() {
        const buttons = ['Possible asthma', 'Tuberculosis', 'Chronic cough'];
        const { selectedIndex } = this.state;
        return (
            <View style={{height: 300}}>
                <WebView
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         source={{uri: 'https://www.youtube.com/watch?v=uGMSnytbmA8' }}/>
                <Card>
                <Text style={{fontSize: 18}}>What will you examine the baseball player for?</Text>
                </Card>
                <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons}/>
            </View>

        );
    }
}
/*const styles = StyleSheet.create({
    WebViewContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
    }
});*/

export default TreatmentScreen;