import React from "react";
import {View, Text, Image, Alert} from "react-native";
import {Card, ButtonGroup} from "react-native-elements";

class DiagnosingScreen extends React.Component {
    static navigationOptions = {
        title: 'Examine for a treatment',
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
        const buttons = ['A', 'B', 'C'];
        const { selectedIndex } = this.state;
        return (

            <View>
                <Card>
                    <Image
                        style={{width: 250, height: 250}}
                        source={{uri: 'http://diseasedefinition.info/wp-content/uploads/2017/11/circumoral-cyanosis.jpg'}}/>
                    <Text style={{fontSize: 18}}>The patient has a wheeze and difficulty breathing. What is the right treatment?</Text>
                    <Text style={{fontSize: 14}}>A: Oxygen, salbutamol nebulizer and prednisolone.</Text>
                    <Text style={{fontSize: 14}}>B: Oxygen and salbutamol inhaler.</Text>
                    <Text style={{fontSize: 14}}>C: Salbutamol pMDI.</Text>
                </Card>
                <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons}/>
            </View>

        );
    }
}
export default DiagnosingScreen;