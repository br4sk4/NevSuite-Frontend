'use strict';

import {ReduceStore} from 'flux/utils';
import * as $ from "jquery";
import uuid from 'uuid/v4.js';

import NevSuiteAppDispatcher from '../../../nevsuite.app.dispatcher.js';

import Tab from './Tab.js';
import TabActionTypes from './TabActionTypes';

class TabStore extends ReduceStore {

    constructor() {
        super(NevSuiteAppDispatcher);
    }

    getInitialState() {
        return {
            tabs: [new Tab(uuid(), 'Home', 'HOME', true, true)],
            tabVisibilityIndex: 0,
            tabPagerLeftVisible: false,
            tabPagerRightVisible: false
        };
    }

    reduce(state, action) {
        let newState = {};
        let isPagerLeftVisible;
        let isPagerRightVisible;
        let visibilityIndex;
        const tabs = [];

        switch (action.type) {


            case TabActionTypes.ADD_TAB:
                if (!action.label) return state;

                visibilityIndex = state.tabVisibilityIndex;
                visibilityIndex = ( (state.tabs.length - visibilityIndex) > 4 ) ? visibilityIndex = state.tabs.length - 4 : visibilityIndex;

                for (let i = 0; i < state.tabs.length; ++i) {
                    ( action.selected && state.tabs[i].selected )
                        ? tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, false, (i >= visibilityIndex)))
                        : tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, (i >= visibilityIndex)));
                }
                tabs.push(new Tab(action.identifier, action.label, action.tabtype, action.selected, true));

                isPagerLeftVisible = ( visibilityIndex > 0 );
                isPagerRightVisible = ( visibilityIndex < tabs.length - 1 );

                $.extend(newState, state);
                $.extend(newState, {
                    tabs: tabs,
                    tabVisibilityIndex: visibilityIndex,
                    tabPagerLeftVisible: isPagerLeftVisible,
                    tabPagerRightVisible: isPagerRightVisible
                });
                return newState;

            case TabActionTypes.REMOVE_TAB:
                if (!action.index) return state;

                const removeLast = state.tabs.length - 1 === action.index;
                const removeSelected = state.tabs[action.index].selected;

                visibilityIndex = state.tabVisibilityIndex;

                if (visibilityIndex >= state.tabs.length - 1) visibilityIndex = state.tabs.length - 2;

                for (let i = 0; i < state.tabs.length; i++) {
                    if ( removeLast && removeSelected && i === action.index - 1 ) tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, true, (i >= visibilityIndex)));
                    else if ( removeSelected && i === action.index + 1 ) tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, true, (i >= visibilityIndex)));
                    else if ( i !== action.index ) tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, (i >= visibilityIndex)));
                }

                isPagerLeftVisible = ( visibilityIndex > 0 );
                isPagerRightVisible = ( visibilityIndex < tabs.length - 1 );

                $.extend(newState, state);
                $.extend(newState, {
                    tabs: tabs,
                    tabVisibilityIndex: visibilityIndex,
                    tabPagerLeftVisible: isPagerLeftVisible,
                    tabPagerRightVisible: isPagerRightVisible
                });
                return newState;

            case TabActionTypes.SELECT_TAB:
                if (action.index < 0) return state;

                visibilityIndex = state.tabVisibilityIndex;

                for (let i = 0; i < state.tabs.length; ++i) {
                    ( i === action.index )
                        ? tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, true, (i >= visibilityIndex)))
                        : tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, false, (i >= visibilityIndex)));
                }

                isPagerLeftVisible = ( visibilityIndex > 0 );
                isPagerRightVisible = ( visibilityIndex < tabs.length - 1 );

                $.extend(newState, state);
                $.extend(newState, {
                    tabs: tabs,
                    tabVisibilityIndex: visibilityIndex,
                    tabPagerLeftVisible: isPagerLeftVisible,
                    tabPagerRightVisible: isPagerRightVisible
                });
                return newState;

            case TabActionTypes.SCROLL_TABS_LEFT:
                if (action.index < 0) return state;

                visibilityIndex = state.tabVisibilityIndex;

                if ( visibilityIndex > 0 ) visibilityIndex--;

                for (let i = 0; i < state.tabs.length; ++i) {
                    tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, (i >= visibilityIndex)));
                }

                isPagerLeftVisible = ( visibilityIndex > 0 );
                isPagerRightVisible = ( visibilityIndex < tabs.length - 1 );

                $.extend(newState, state);
                $.extend(newState, {
                    tabs: tabs,
                    tabVisibilityIndex: visibilityIndex,
                    tabPagerLeftVisible: isPagerLeftVisible,
                    tabPagerRightVisible: isPagerRightVisible
                });
                return newState;

            case TabActionTypes.SCROLL_TABS_RIGHT:
                if (action.index < 0) return state;

                visibilityIndex = state.tabVisibilityIndex;

                if ( visibilityIndex < state.tabs.length ) visibilityIndex++;

                for (let i = 0; i < state.tabs.length; ++i) {
                    tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, (i >= visibilityIndex)));
                }

                isPagerLeftVisible = ( visibilityIndex > 0 );
                isPagerRightVisible = ( visibilityIndex < tabs.length - 1 );

                $.extend(newState, state);
                $.extend(newState, {
                    tabs: tabs,
                    tabVisibilityIndex: visibilityIndex,
                    tabPagerLeftVisible: isPagerLeftVisible,
                    tabPagerRightVisible: isPagerRightVisible
                });
                return newState;

            default:
                return state;
        }
    }

}

export default new TabStore();