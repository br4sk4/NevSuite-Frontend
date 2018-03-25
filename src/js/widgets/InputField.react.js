/**
 * Created by Braska on 13.11.2017.
 */
import React from "react";

export default class InputField extends React.Component {

    onChange;

    constructor(props) {
        super(props);

        this.state = {value: this.props.value};

        this.handleChange = this.handleChange.bind(this);
        this.onChange = (this.props.valueChanged !== undefined)
            ? this.props.valueChanged.bind(this)
            : function() {};
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.onChange(event.target.value);
    }

    render() {
        return (
            <div style={{width: this.props.width||"100%", float: "left"}}>
                <input className="widget inputField" type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}
