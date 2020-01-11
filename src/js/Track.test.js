import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import Track from './Track';

configure({ adapter: new Adapter() });

describe('<Track />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<Track />);
    });

    it('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should render a track with name and number', () => {
        wrapper.setProps({
            number: 1,
            name: 'Hello',
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should fire lyricsVisibilityHandler when clicked on a button', () => {
        const lyricsVisibilityHandler = jest.fn();

        wrapper.setProps({
            name: 'Hello',
            lyricsVisibilityHandler,
        });

        wrapper.find('Track__Button').simulate('click');

        expect(lyricsVisibilityHandler).toHaveBeenCalledWith('Hello');
    });
});
