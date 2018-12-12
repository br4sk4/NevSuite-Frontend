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
                    timeseriesIdentifier: '',
                    date: '01.01.2017'
                };

                $.extend(newState, timeseriesViews);
                return newState;

            case TimeseriesActionTypes.CHANGE_DATE:
                newState = $.extend(newState, state);

                $.extend(newState, action.timeseriesView);
                return newState;

            default:
                return state;

        }
    };

}

export default new TimeseriesStore();