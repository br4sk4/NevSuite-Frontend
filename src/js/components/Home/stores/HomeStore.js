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

    loadServices(registryHost) {
        let components = [];
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                components = JSON.parse(this.responseText);
                components.forEach(function(service) {
                    HomeActions.loadInstances(registryHost, service);
                })
            } else if (this.readyState === 4) {
                let classes = 'danger';
                let response = 'Service-Discovery is not reachable!';
                HomeActions.addComponentInfo('Common-Backend', classes, response);
            }
        };
        xhttp.open("GET", registryHost + "/ComponentService/services", true);
        xhttp.send();
    }

    loadInstances(registryHost, service) {
        let instances = [];
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                instances = JSON.parse(this.responseText);
                instances.forEach(function(instance) {
                    if (service !== "service-registry") HomeActions.requestInstance(service, instance);
                })
            }
        };
        xhttp.open("GET", registryHost + "/ComponentService/services/" + service + "/instances", true);
        xhttp.send();
    }

    requestInstance(service, instanceUrl) {
        let response = '';
        let classes = 'info';
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                classes = 'success';
                response = this.responseText;
                HomeActions.addComponentInfo(service, classes, response);
            } else if (this.readyState === 4) {
                classes = 'danger';
                response = 'Not Available!';
                HomeActions.addComponentInfo(service, classes, response);
            }
        };
        xhttp.open("GET", instanceUrl + "/ComponentService/respond", true);
        xhttp.send();
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
        this.loadServices('http://' + host + ':8081');

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

            case HomeActionTypes.LOAD_INSTANCES:
                this.loadInstances(action.registryHost, action.service);
                return state;

            case HomeActionTypes.REQUEST_INSTANCE:
                this.requestInstance(action.service, action.instanceUrl);
                return state;

            default:
                return state;
        }
    }
}

export default new HomeStore();