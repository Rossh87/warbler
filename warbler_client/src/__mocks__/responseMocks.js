import jwtDecode from 'jwt-decode';

const token = 'eyJhbGciO= iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDAwMDB9.KCwe5oTtfZpOCaDNofGWXWSNPepD_yckDd05FBSROAo'

const authExp = jwtDecode(token).exp;

export const authResponseNoImg = {
	token,
	id: '10',
	username: 'rhunter',
	profileImageUrl: ''
}

export const authResponseWithImg = {
	token,
	id: '10',
	username: 'rhunter',
	profileImageUrl: 'someImg@img.com'
};

export const mockUserWithAuthExp = {
	authExp,
	id: '10',
	username: 'rhunter',
	profileImageUrl: 'someImg@img.com'
}

