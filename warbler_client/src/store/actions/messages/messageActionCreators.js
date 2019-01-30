import {LOAD_MESSAGES} from '../../actionTypes';

export const loadMessages = messages => ({
	type: LOAD_MESSAGES,
	messages	
});