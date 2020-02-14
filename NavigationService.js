import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function reset({ actions, index }) {
    _navigator.dispatch({
      type: NavigationActions.RESET,
      index,
      actions,
    });
  }
  

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  reset
};