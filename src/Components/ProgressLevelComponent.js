import { connect } from 'react-redux';
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const mapStateToProps = (state) => ({
    newLevels: state.progressReducer.newLevels
});

class ProgressLevelComponent extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const levelList = this.props.unlocked.map((level, index)=> {
            if (this.props.newLevels.includes(level))
                return (
                    <View key={index}>
                        <TouchableOpacity style={styles.button} onPress={()=>()=>{}} disabled={true}>
                            <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
                        </TouchableOpacity>
                    </View>
                );
            // If the previous level doesn't exist in the new array, then the level has been locked
            else
                return (
                    <View key={index}>
                        <TouchableOpacity style={styles.buttonRegression} onPress={()=>()=>{}} disabled={true}>
                            <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
                        </TouchableOpacity>
                    </View>
                );
        });
        const lockedLevelList = this.props.locked.map((level, index)=> {
            if (this.props.newLevels.includes(level))
                return (
                    <View key={index}>
                        <TouchableOpacity style={styles.buttonProgression} onPress={()=>()=>{}} disabled={true}>
                            <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
                        </TouchableOpacity>
                    </View>
                );
            else
            // If the previous level does exist in the new array, then the level has been unlocked
                return (
                    <View key={index}>
                        <TouchableOpacity style={styles.buttonDisabled} onPress={()=>()=>{}} disabled={true}>
                            <Text key={index} style={{color: '#FFFFFF', fontSize: 18}}>{level}</Text>
                        </TouchableOpacity>
                    </View>
                );
        });
        return (
            <View style={styles.buttonContainer}>
                {levelList}
                {lockedLevelList}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#848415',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonProgression: {
        alignItems: 'center',
        backgroundColor: '#158415',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonRegression: {
        alignItems: 'center',
        backgroundColor: '#84154d',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonDisabled: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row'
    },
});
export default connect (mapStateToProps)(ProgressLevelComponent);