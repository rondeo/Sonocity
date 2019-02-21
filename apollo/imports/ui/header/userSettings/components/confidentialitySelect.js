import React, { Component } from "react";

import UPDATE_USER_SETTINGS from "../queries/updateUserSettings";


class ConfidentialitySelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //this.props.onSelectValueChange(e.target.value)
        () => {
                this.props.updateUserSettings({
                    variables: {
                        security_lvl: this.state.selectValue
                    }
                }).catch(error => {
                    console.log(error);
                });
        };
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

export default graphql(UPDATE_USER_SETTINGS, {
    name: "updateUserSettings" // refetch
})(SettingsMenu)