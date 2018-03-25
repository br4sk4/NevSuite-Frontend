'use strict';

import React from 'react';
import TabActions from '../stores/TabActions.js';

export default class TabHeading extends React.Component {

    render() {
        this.selectTab = () => TabActions.selectTab(this.props.index);
        this.removeTab = (this.props.state.tabNavigation.tabs[this.props.index].label !== 'Home')
                ? () => TabActions.removeTab(this.props.index, this.props.state.tabNavigation.tabs[this.props.index].identifier)
                : () => TabActions.selectTab(this.props.index);

        const tabHeadingStyle = (this.props.state.tabNavigation.tabs[this.props.index].selected) ? "tabHeading active" : "tabHeading";
        const removeButtonStyle = (this.props.state.tabNavigation.tabs[this.props.index].label !== 'Home') ? "tabRemoveButton glyphicon glyphicon-remove" : "tabRemoveButton";
        const tabHeadingLabelStyle = 'tabHeadingLabel';

        return (
            <div className={tabHeadingStyle}>
                <div className={tabHeadingLabelStyle} onClick={this.selectTab}><label>{this.props.state.tabNavigation.tabs[this.props.index].label}</label></div>
                <div className={removeButtonStyle} onClick={this.removeTab} />
            </div>
        );
    }

}