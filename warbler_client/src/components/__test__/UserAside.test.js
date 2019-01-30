import React from 'react';
import UserAside from '../UserAside';

import {shallow} from 'enzyme';

let component = shallow( <UserAside username={'user'} profileImageUrl={'someImg.img.com'}/> );

describe('When the component renders an image element', () => {

	it('passes props.profileImageUrl as the image\'s "src"', () => {
		expect(component.find('img').prop('src')).toBe('someImg.img.com');
	});

	it('uses a default image if (!(props.profileImageUrl))', () => {
		component = shallow( <UserAside username={'user'} profileImageUrl={''}/> );
		expect(component.find('img').prop('src')).not.toEqual('');
	});
});