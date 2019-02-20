import React, { Component } from "react";

export default class ConfidentialitySelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onSelectValueChange(e.target.value)
    }

    render() {
        return (
            <select value={this.props.selectValue} onChange={this.handleChange} className="form-control" id="ntype" required >
                <option value = "1">Visible</option>
                <option value = "2">Visible to mutuals</option>
                <option value = "3">Anonymous</option>
            </select>    
        )
    }
}