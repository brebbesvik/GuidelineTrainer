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
                            name: 'game.MainMenu',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'GuidelineTrainer',
                                        color: '#FFFFFF'
                                    },
                                    background: {
                                        color: '#841584'
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