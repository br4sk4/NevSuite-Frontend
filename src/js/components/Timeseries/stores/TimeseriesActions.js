'use strict';

import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';
import TimeseriesActionTypes from './TimeseriesActionTypes';

const TimeseriesActions = {

    changeDate(tabIdentifier, timeseriesIdentifier, date) {
        let timeseriesView = {};

        timeseriesView[tabIdentifier] = {
            timeseriesIdentifier: timeseriesIdentifier,
            date: date
        };

        NevSuiteAppDispatcher.dispatch({
            type: TimeseriesActionTypes.CHANGE_DATE,
            timeseriesView: timeseriesView,
        });
    },

};

export default TimeseriesActions;