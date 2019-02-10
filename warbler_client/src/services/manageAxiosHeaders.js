import axios from 'axios';

const manageAxiosHeaders = (data) => {
	if(data && data.token !== undefined){
		axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
		return {...data};
		debugger;
	} else {
		debugger;
		delete axios.defaults.headers.common["Authorization"];
		return {...data}
	}
};

export default manageAxiosHeaders;