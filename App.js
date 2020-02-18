/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './NavigationService'
import { Home, Voting, Result, TambahPertanyaan, TambahPilihan, Login } from './components/screens'

let rootstack = createStackNavigator(
    {
        Home: Home,
        Vote: Voting,
        Result: {
            screen: Result,
            navigationOptions: {
                headerShown: false
            }
        },
        TambahPertanyaan: TambahPertanyaan,
        TambahPilihan: TambahPilihan,
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false
            }
        },
    },
    {
        initialRouteName: 'Login'
    }
)

let Navigation = createAppContainer(rootstack)


class App extends React.Component {
    render() {
        return (
            <Navigation ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        )
    }
}

export default App;
