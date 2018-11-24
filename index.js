import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/App';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'game.Quiz',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Quizur'
                                    }
                                }
                            }
                        }
                    }
                ],
            }
        }
    });
});