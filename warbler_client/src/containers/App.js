import React, {Component} from 'react';
import { Provider, connect } from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import {setAuthorizationToken, setCurrentUser, setActiveUser, logout} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import IdleTimer from 'react-idle-timer';

const store = configureStore();
const localToken = localStorage.jwtToken;

if (localToken) {
	setAuthorizationToken(localToken);
	try {
		store.dispatch(setCurrentUser(jwtDecode(localToken)));
	}

	catch (err) {
		store.dispatch(setCurrentUser({}));
	}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.idleTimer = null;
  }

  _onActive() {
    store.dispatch(setActiveUser(true));
  }

  _onIdle() {
    store.dispatch(setActiveUser(false));
  }

  render() {
    return (
      <Provider store = {store}>
        <Router>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={1000 * 30}
          >
            <div className='onboarding'>
              <Navbar />
              <Main />
            </div>
          </IdleTimer>
        </Router>
      </Provider>
    )
  }

};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser 
  }
}

function connectWithStore(store, WrappedComponent, ...args) {
  const ConnectedComponent = connect(...args)(WrappedComponent);
  return function(props){
    return <ConnectedComponent {...props} store={store} />
  } 
}


export default connectWithStore(store, App, mapStateToProps, {logout}); 
