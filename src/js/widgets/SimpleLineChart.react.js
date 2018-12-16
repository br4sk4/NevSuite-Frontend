/**
 * Created by Braska on 25.11.2017.
 */
import React from "react";
import Chart from "../../../node_modules/chart.js/src/chart.js";

export default class SimpleLineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    createChart() {
        let $ctx = document.getElementById('simpleLineChart').getContext('2d');
        new Chart($ctx, {
            type: 'line',
            data: {
                labels: this.props.timeseries.xData,
                datasets: [{
                    label: 'Timeseries',
                    backgroundColor: 'rgba(134, 191, 160, 0.3)',
                    borderColor: 'rgb(66, 147, 102)',
                    data: this.props.timeseries.yData,
                    steppedLine: false,
                    lineTension: 0,
                    pointRadius: 0
                }]
            },
            options: {
                animation: {
                    duration: 0,
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 200,
                            min: 0,
                            stepSize: 10
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 24
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate() {
        this.createChart();
    }

    componentDidMount() {
        this.createChart();
    }

    render() {
        return (
            <div style={{width: this.props.width||"100%", float: "left"}}>
                <canvas id="simpleLineChart"/>
            </div>
        );
    }
}
