import React, { Component } from "react";
// import gql from 'graphql-tag';
import { graphql } from "react-apollo";

import GetUserSettings from "../queries/getUserSettings";
import UpdateUserSettings from "../queries/updateUserSettings";

import ConfidentialitySelect from "./ConfidentialitySelect";


({ security_lvl }) => class SettingsMenu extends Component {
    constructor() {
        super();
        this.state = {selectValue: security_lvl}
    }

    handleSelectValueChange(selectValue) {
        this.setState({selectValue});
        () => {
            this.props.UpdateUserSettings({
                variables: {
                    userId: '123',
                    security_lvl: this.state.selectValue
                }
            }).catch(error => {
                console.log(error);
            });
        };
    }
    
    render() {
        return (
            <div>
                <ConfidentialitySelect 
                    selectValue={this.state.selectValue}
                    onSelectValueChange={this.handleSelectValueChange}
                />
            </div>
        )
    }
}

export default graphql(GetUserSettings, {
    props: ({data}) => ({ ...data })
}, UpdateUserSettings)(SettingsMenu)

