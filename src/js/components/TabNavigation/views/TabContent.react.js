'use strict';

import React from 'react';

import Home from '../../Home/views/Home.react.js';
import TimeseriesView from "../../Timeseries/views/TimeseriesView.react.js";

export default class TabContent extends React.Component {

    render() {
        let tabContent;

        for (let i = 0; i < this.props.state.tabNavigation.tabs.length; ++i) {
            const tabIdentifier = this.props.state.tabNavigation.tabs[i].identifier;
            const timeseries = this.props.state.timeseries[tabIdentifier];

            if ( this.props.state.tabNavigation.tabs[i].selected ) {
                let tabtype;

                if (this.props.state.tabNavigation.tabs[i].tabtype === 'HOME') tabtype = <Home {...this.props}/>;
                else if (this.props.state.tabNavigation.tabs[i].tabtype === 'TIMESERIESVIEW') tabtype = <TimeseriesView tabIdentifier={tabIdentifier} timeseries={timeseries}/>;
                else tabtype = null;

                tabContent = <div className='tabContent'>{tabtype}</div>;
            }
        }

        return tabContent;
    }

}