// res.data => store token in localStorage => config axios req headers => calculate exp and add to user prop => dispatch data to redux
import manageLocalStorage from './manageLocalStorage';
import manageAxiosHeaders from './manageAxiosHeaders';
import manageTokenExp from './manageTokenExp';
import {compose} from 'redux';

// no test required for a function composed of tested units

export default compose(manageTokenExp, manageAxiosHeaders, manageLocalStorage);

