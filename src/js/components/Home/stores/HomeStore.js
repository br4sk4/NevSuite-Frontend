'use strict';

import {ReduceStore} from 'flux/utils';
import * as $ from "jquery";

import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';
import ComponentInfo from './ComponentInfo.js';
import HomeActionTypes from './HomeActionTypes.js';
import HomeActions from './HomeActions.js';

class HomeStore extends ReduceStore {

    constructor() {
        super(NevSuiteAppDispatcher);
    }

    createComponent(name, url) {
        let response = '';
        let classes = 'info';
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                classes = 'success';
                response = this.responseText;
                HomeActions.addComponentInfo(name, classes, response);
            } else if (this.readyState === 4) {
                classes = 'danger';
                response = 'Not Available!';
                HomeActions.addComponentInfo(name, classes, response);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    getInitialState() {
        let componentInfos = [];

        const host = ( window.location.hostname !== "" ) ? window.location.hostname : 'localhost';
        this.createComponent("Common Backend", 'http://' + host + ':8081/ComponentService/respond');
        this.createComponent("Timeseries", 'http://' + host + ':8082/ComponentService/respond');

        return {
            componentInfos: componentInfos
        };
    }

    reduce(state, action) {
        const componentInfos = [];
        let newState = {};

        switch (action.type) {

            case HomeActionTypes.ADD_COMPONENT_INFO:
                if (!action.name) return state;

                let components = state.componentInfos;
                for (let i = 0; i < components.length; ++i) {
                    componentInfos.push(new ComponentInfo(components[i].name, components[i].classes, components[i].response));
                }
                componentInfos.push(new ComponentInfo(action.name, action.classes, action.response));

                $.extend(newState, state);
                $.extend(newState, {
                    componentInfos: componentInfos,
                });
                return newState;

            default:
                return state;
        }
    }
}

export default new HomeStore();