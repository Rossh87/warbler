// Import packages
import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';

// Import local components
import Navbar from '../components/Navbar';
import Main from './Main';

// Import state management 
import {setCurrentUser, setActiveUser} from '../store/actions/auth/authActionCreators';
import logout from '../store/actions/auth/logout';
import manageAxiosHeaders from '../services/manageAxiosHeaders';


class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
  }

  checkForToken () {
    const localToken = localStorage.getItem('jwtToken');
    const {setCurrentUser} = this.props;

    if (localToken) {
      manageAxiosHeaders({token: localToken});

      try {
        setCurrentUser(jwtDecode(localToken));
      }

      catch (err) {
        setCurrentUser({});
      }
    };
  }

  componentDidMount() {
    this.checkForToken();
  }

  onActive = () => {
    console.log('active');
    // const {setActiveUser} = this.props;
    // setActiveUser(true);
  }

  onIdle = () => {
    console.log('idle');
    // const {setActiveUser} = this.props;
    // setActiveUser(false);
  }

  render() {
    const {currentUser, logout} = this.props;

    return (
      <Router>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          timeout={1000 * 10}
        >
          <div className='onboarding'>
            <Navbar currentUser={currentUser} logout={logout}/>
            <Main />
          </div>
        </IdleTimer>
      </Router>
    )
  }

};

function mapStateToProps({currentUser}) {
  return {
    currentUser
  }
}

export {App};

export default connect(mapStateToProps, {logout, setCurrentUser, setActiveUser})(App);

App.propTypes = {
    currentUser: PropTypes.shape(
      {
        isAuthenticated: PropTypes.bool,
        isActive: PropTypes.bool,
        user: PropTypes.object,
        authExpiration: PropTypes.number
      }
    ).isRequired,

    logout: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    setActiveUser: PropTypes.func.isRequired
}