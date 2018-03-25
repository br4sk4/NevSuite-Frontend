'use strict';

import React from 'react';

import Home from '../../Home/views/Home.react.js';

export default class TabContent extends React.Component {

    render() {
        let tabContent;

        for (let i = 0; i < this.props.state.tabNavigation.tabs.length; ++i) {
            if ( this.props.state.tabNavigation.tabs[i].selected ) {
                let tabtype;

                if (this.props.state.tabNavigation.tabs[i].tabtype === 'HOME') tabtype = <Home {...this.props}/>;
                else tabtype = null;

                tabContent = <div className='tabContent'>{tabtype}</div>;
            }
        }

        return tabContent;
    }

}