'use strict';

import React from 'react';
import {Container} from 'flux/utils';

import NevSuiteAppView from './nevsuite.app.react.js';

import TabStore from './components/TabNavigation/stores/TabStore.js';
import HomeStore from './components/Home/stores/HomeStore.js';
import TimeseriesStore from './components/Timeseries/stores/TimeseriesStore.js';

class NevSuiteApp extends React.Component {

    static getStores() {
        return [
            TabStore,
            HomeStore,
            TimeseriesStore
        ];
    }

    static calculateState() {
        return {
            home: HomeStore.getState(),
            tabNavigation: TabStore.getState(),
            timeseries: TimeseriesStore.getState()
        };
    }

    render() {
        return (
            <NevSuiteAppView state={NevSuiteApp.calculateState()}/>
        );
    }
}

export default Container.create(NevSuiteApp);