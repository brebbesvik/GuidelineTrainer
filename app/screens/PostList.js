import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

import {action$fetchPost} from './posts.actions';

class PostsList extends PureComponent {

    static propTypes = {
        componentId: PropTypes.string,
        action$fetchPost: PropTypes.func,
        posts: PropTypes.array
    };

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
        this.pushViewPostScreen = this.pushViewPostScreen.bind(this);
        this.showAddPostModal = this.showAddPostModal.bind(this);
    }

    static get options() {
        return {
            topBar: {
                rightButtons: [
                    {
                        id: 'addPost',
                        text: 'Add'
                    }
                ]
            }
        };
    }

    componentDidMount(){
        this.props.action$fetchPost();
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'addPost') {
            this.showAddPostModal();
        }
    }

    pushViewPostScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'blog.ViewPost',
                passProps: {
                    text: 'Some props that we are passing'
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Post1'
                        }
                    }
                }
            }
        });
    }

    showAddPostModal() {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'blog.AddPost',
                    }
                }]
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text onPress={this.pushViewPostScreen}>Posts List Screen</Text>
                <Text>{JSON.stringify(this.props.posts)}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, {action$fetchPost})(PostsList);