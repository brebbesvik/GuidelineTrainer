import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';

class ViewPost extends PureComponent {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>View Post Screen</Text>
            </View>
        );
    }
}

export default ViewPost;