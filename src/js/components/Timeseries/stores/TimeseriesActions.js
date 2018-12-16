'use strict';

import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';
import TimeseriesActionTypes from './TimeseriesActionTypes';

const TimeseriesActions = {

    loadTimeseries(tabIdentifier, timeseriesIdentifier, date, xData, yData) {
        NevSuiteAppDispatcher.dispatch({
            type: TimeseriesActionTypes.LOAD_TIMESERIES,
            tabIdentifier: tabIdentifier,
            timeseriesIdentifier: timeseriesIdentifier,
            date: date,
            xData: xData,
            yData: yData
        });
    },

};

export default TimeseriesActions;