/**
 * Created by Braska on 25.11.2017.
 */
import React from 'react';

import ComboBox from '../../../widgets/ComboBox.react.js';
import DateInputField from '../../../widgets/DateInputField.react.js';
import TimeseriesChart from '../../../widgets/SimpleLineChart.react.js';
import TimeseriesActions from '../stores/TimeseriesActions.js';

let loadTimeseries;

export default class TimeseriesViewReact extends React.Component {

    constructor(props) {
        super(props);
    }

    formatTimestamp(date) {
        let yearString = date.getFullYear();
        let month = date.getMonth() + 1;
        let monthString = (month < 10 ) ? "0" + month : month;
        let day = date.getDate();
        let dayString = (day < 10 ) ? "0" + day : day;
        return  yearString + "-" + monthString + "-" + dayString + "T00:00:00Z";
    };

    processResponse() {
        let xData = [];
        let yData = [];

        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            if ( data.timeseries.valueMap.length > 0 ) {
                xData.push('00:00');
                yData.push(data.timeseries.valueMap[0].value);
                data.timeseries.valueMap.forEach(function (tuple) {
                    let time = tuple.timestamp.split('T')[1].split('Z')[0];
                    xData.push(time.split(':')[0] + ':' + time.split(':')[1]);
                    yData.push(tuple.value);
                });
                TimeseriesActions.loadTimeseries(
                    this.timeseries.tabIdentifier,
                    this.timeseries.timeseriesIdentifier,
                    this.timeseries.date,
                    xData,
                    yData
                );
            } else {
                TimeseriesActions.loadTimeseries(
                    this.timeseries.tabIdentifier,
                    this.timeseries.timeseriesIdentifier,
                    this.timeseries.date,
                    xData,
                    yData
                );
            }
        } else if (this.readyState === 4) {
            TimeseriesActions.loadTimeseries(
                this.timeseries.tabIdentifier,
                this.timeseries.timeseriesIdentifier,
                this.timeseries.date,
                xData,
                yData
            );
        }
    };

    loadTimeseries(tabIdentifier, timeseriesIdentifier, date) {
        let xhttp = new XMLHttpRequest();

        let dateString = (date !== "" && date !== undefined) ? date : "01.01.2017";
        let actDate = new Date(dateString.split('.')[2], parseInt(dateString.split('.')[1]) - 1, dateString.split('.')[0]);
        let nextDate = new Date(dateString.split('.')[2], parseInt(dateString.split('.')[1]) - 1, parseInt(dateString.split('.')[0]) + 1);

        const timestampFrom = this.formatTimestamp(actDate);
        const timestampTo = this.formatTimestamp(nextDate);

        const host = ( window.location.hostname !== "" ) ? window.location.hostname + ':8082' : 'localhost:8080';
        const url = 'http://' + host + '/DomainService/timeseries/' + this.props.timeseries.timeseriesIdentifier + '/';

        xhttp.onreadystatechange = this.processResponse;
        xhttp.timeseries = {
            tabIdentifier: tabIdentifier,
            timeseriesIdentifier: timeseriesIdentifier,
            date: date,
        };
        xhttp.open("GET", url + timestampFrom + "/" + timestampTo, true);
        xhttp.send();
    }

    render() {
        const tabIdentifier = this.props.tabIdentifier;
        const timeseriesIdentifier = this.props.timeseries.timeseriesIdentifier;

        loadTimeseries = (newDate) => this.loadTimeseries(tabIdentifier, timeseriesIdentifier, newDate);

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
                                <div className="col-sm-5"><DateInputField value={this.props.timeseries.date} dateChanged={loadTimeseries} /></div>
                                <div className="col-sm-1" style={inputLabelContainerStyle}><label>Raster:</label></div>
                                <div className="col-sm-5"><ComboBox data={["Tag", "Monat", "Jahr"]} value="Tag" /></div>
                            </div>
                        </div>
                        <div className="col-sm-12" style={{marginTop: "15px"}}>
                            <TimeseriesChart timeseries={this.props.timeseries}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

};