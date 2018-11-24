import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './store';

export function registerScreens() {

    Navigation.registerComponentWithRedux(
        'blog.PostList',
        () => require('./PostList.js').default,
        Provider,
        store
    );
    Navigation.registerComponent(
        'blog.AddPost',
        () => require('./AddPost.js').default
    );
    Navigation.registerComponent(
        'blog.ViewPost',
        () => require('./ViewPost.js').default
    );
}