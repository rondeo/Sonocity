import React, { Component } from "react";

import { graphql } from "react-apollo";

import UPDATE_USER_CONFIDENTIALITY_SETTINGS from "../queries/updateUserConfidentialitySettings";


class ConfidentialitySelect extends Component {
    constructor(props) {
        super(props);
    }

    updateConfidentialitySetting = e => {
        //this.props.onSelectValueChange(e.target.value)
        
        this.props.updateUserConfidentialitySettings({
            variables: {
                security_lvl: e.value
            }
        }).catch(error => {
            console.log(error);
        });
        
    }

    render() {
        return (
            <select value={this.props.selectValue} onChange={this.updateConfidentialitySetting} className="form-control" id="ntype" required >
                <option value = "1">Visible</option>
                <option value = "2">Visible to mutuals</option>
                <option value = "3">Anonymous</option>
            </select>    
        )
    }
}

export default graphql(UPDATE_USER_CONFIDENTIALITY_SETTINGS, {
    name: "updateUserConfidentialitySettings",
    options: {
      refetchQueries: ["GET_USER_SETTINGS"]
    }
})(ConfidentialitySelect)