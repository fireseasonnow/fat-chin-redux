import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import Album from './Album';

configure({ adapter: new Adapter() });

describe('<Album />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<Album />);
    });

    it('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should render an album without tracks and \'Show tracks\' text', () => {
        wrapper.setProps({
            name: 'Hello',
            coverUrl: 'url',
            year: 1984,
            tracksVisible: false,
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render an album with tracks and \'Hide tracks\' text', () => {
        wrapper.setProps({
            name: 'Hello',
            coverUrl: 'url',
            year: 1984,
            tracksVisible: true,
            tracks: [
                'blah',
                'blah-blah'
            ],
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should fire tracksVisiblityHandler when clicked on a tracks button', () => {
        const tracksVisibilityHandler = jest.fn();

        wrapper.setProps({
            index: 4,
            tracksVisibilityHandler,
        });

        wrapper.find('Album__OverlayItem:first-child').simulate('click');

        expect(tracksVisibilityHandler).toHaveBeenCalledWith(4);
    });

    it('should fire coverZoomHandler when clicked on a zoom button', () => {
        const coverZoomHandler = jest.fn();

        wrapper.setProps({
            index: 3,
            coverZoomHandler,
        });

        wrapper.find('Album__OverlayItem:last-child').simulate('click');

        expect(coverZoomHandler).toHaveBeenCalledWith(3);
    });
});
