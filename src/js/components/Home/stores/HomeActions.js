'use strict';

import HomeActionTypes from './HomeActionTypes';
import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';

const HomeActions = {

    loadInstances(registryHost, service) {
        NevSuiteAppDispatcher.dispatch({
            type: HomeActionTypes.LOAD_INSTANCES,
            registryHost,
            service
        });
    },

    requestInstance(service, instanceUrl) {
        NevSuiteAppDispatcher.dispatch({
            type: HomeActionTypes.REQUEST_INSTANCE,
            service,
            instanceUrl
        });
    },

    addComponentInfo(name, classes, response) {
        NevSuiteAppDispatcher.dispatch({
            type: HomeActionTypes.ADD_COMPONENT_INFO,
            name,
            classes,
            response
        });
    },

};

export default HomeActions;