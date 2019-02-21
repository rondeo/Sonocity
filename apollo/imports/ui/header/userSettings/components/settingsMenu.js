import React, { Component, Fragment } from "react";
// import gql from 'graphql-tag';
import { graphql } from "react-apollo";

import GET_USER_SETTINGS from "../queries/getUserSettings";

import ConfidentialitySelect from "./ConfidentialitySelect";


class SettingsMenu extends Component {
    // constructor() {
    //     super();
    //     this.state = {selectValue: data.security_lvl}
    // }

    // handleSelectValueChange(selectValue) {
    //     this.setState({selectValue});
    //     () => {
    //         this.props.UPDATE_USER_SETTINGS({
    //             variables: {
    //                 security_lvl: this.state.selectValue
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     };
    // }
    
    render() {
        return (
            <div>
                <ConfidentialitySelect 
                    selectValue={this.props.data.security_lvl}
                    //onSelectValueChange={this.handleSelectValueChange}
                />
            </div>
        )
    }
}

export default graphql(GET_USER_SETTINGS, {
    name: "getUserSettings"
})(SettingsMenu)

