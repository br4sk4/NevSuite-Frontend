'use strict';

import React from 'react';
import uuid from 'uuid/v4';
import TabHeading from './TabHeading.react.js';
import TabActions from '../stores/TabActions.js';

let scrollLeft;
let srcollRight;
let addTab;

export default class TabPager extends React.Component {

    render() {
        const tabHeadings = [];

        scrollLeft = ( this.props.state.tabNavigation.tabPagerLeftVisible ) ? () => TabActions.scrollTabsLeft() : () => function() {};
        srcollRight = ( this.props.state.tabNavigation.tabPagerRightVisible ) ? () => TabActions.scrollTabsRight() : () => function() {};
        addTab = () => TabActions.addTab(uuid(), 'Tab', 'TIMESERIESVIEW', true);

        for (let i = 0; i < this.props.state.tabNavigation.tabs.length; ++i) {
            if ( this.props.state.tabNavigation.tabs[i].visible ) tabHeadings.push(<TabHeading key={i} index={i} state={this.props.state}/>);
        }

        const classLeftPager = "tabPagerButtonLeft glyphicon glyphicon-chevron-left" + ((!this.props.state.tabNavigation.tabPagerLeftVisible) ? " disabled" : "");
        const classRightPager = "tabPagerButtonRight glyphicon glyphicon-chevron-right" + ((!this.props.state.tabNavigation.tabPagerRightVisible) ? " disabled" : "");
        const classAddTab = "tabPagerButtonPlus glyphicon glyphicon-plus";

        return (
            <div className="tabPager">
                <div className={classLeftPager} onClick={scrollLeft}/>
                <div className={classRightPager} onClick={srcollRight}/>
                <div className={classAddTab} onClick={addTab}/>
                {tabHeadings}
            </div>
        );
    }

};