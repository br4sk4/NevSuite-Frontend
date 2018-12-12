/**
 * Created by Braska on 25.11.2017.
 */
import React from 'react';

import ComboBox from '../../../widgets/ComboBox.react.js';
import DateInputField from '../../../widgets/DateInputField.react.js';
import TimeseriesChart from '../../../widgets/SimpleLineChart.react.js';
import TimeseriesActions from '../stores/TimeseriesActions.js';

let changeDate;

export default class TimeseriesViewReact extends React.Component {

    constructor(props) {
        super(props);

        this.formatDate = function(year, month, day) {
            let monthString = (month < 10 ) ? "0" + month : month;
            let dayString = (day < 10 ) ? "0" + day : day;
            return dayString + "." + monthString + "." + year;
        };
    }

    render() {
        let tabIdentifier = this.props.tabIdentifier;

        changeDate = (newDate) => {
            TimeseriesActions.changeDate(tabIdentifier, '', newDate);
        };

        const inputLabelContainerStyle = {
            textAlign: "right",
            paddingTop: "6px",
            fontSize: "12px"
        };

        return (
            <div className="panel panel-nevsuite" style={{marginTop: "15px"}}>
                <div className="panel-heading">
                    <strong>TimeseriesView</strong>
                </div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-12">
                                <div className="col-sm-1" style={inputLabelContainerStyle}><label>Datum:</label></div>
                                <div className="col-sm-5"><DateInputField value={this.props.state.timeseries[tabIdentifier].date} dateChanged={(newDate) => changeDate(newDate)} /></div>
                                <div className="col-sm-1" style={inputLabelContainerStyle}><label>Raster:</label></div>
                                <div className="col-sm-5"><ComboBox data={["Tag", "Monat", "Jahr"]} value="Tag" /></div>
                            </div>
                        </div>
                        <div className="col-sm-12" style={{marginTop: "15px"}}>
                            <TimeseriesChart date={this.props.state.timeseries[tabIdentifier].date}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

};