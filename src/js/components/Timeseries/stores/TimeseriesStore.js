'use strict';

import {ReduceStore} from 'flux/utils';
import * as $ from "jquery";

import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';

import TabActionTypes from "../../TabNavigation/stores/TabActionTypes";
import TimeseriesActionTypes from './TimeseriesActionTypes';

class TimeseriesStore extends ReduceStore {

    constructor() {
        super(NevSuiteAppDispatcher);
    }

    getInitialState() {
        return {};
    }

    reduce(state, action) {
        let newState = {};
        let timeseriesViews = {};

        switch (action.type) {

            case TabActionTypes.ADD_TAB:
                newState = $.extend(newState, state);

                timeseriesViews[action.identifier] = {
                    timeseriesIdentifier: '7e6ea77e-b652-11e7-abc4-cec278b6b50a',
                    date: '01.01.2017'
                };

                $.extend(newState, timeseriesViews);
                return newState;

            case TabActionTypes.REMOVE_TAB:
                newState = $.extend(newState, state);
                delete newState[action.identifier];
                return newState;

            case TimeseriesActionTypes.LOAD_TIMESERIES:
                newState = $.extend(newState, state);

                timeseriesViews[action.tabIdentifier] = {
                    timeseriesIdentifier: action.timeseriesIdentifier,
                    date: action.date,
                    xData: action.xData,
                    yData: action.yData
                };

                $.extend(newState, timeseriesViews);
                return newState;

            default:
                return state;

        }
    };

}

export default new TimeseriesStore();