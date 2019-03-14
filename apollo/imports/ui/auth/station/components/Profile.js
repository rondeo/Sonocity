import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPDATE_STATION_DESCRIPTION from "../queries/updateDescription"
import UPDATE_STATION_NAME from "../queries/updateName"

class Profile extends Component {
    state = {
        name: null,
        description: null,
        mDescription: false,
        mName: false,
        taken: null, 
        edit: false
    }

    componentDidMount() {       
        this.props.name ? this.update() : (null)
    }

    componentWillUpdate(prevProps) {
        if(!this.state.name || this.props.name !== this.state.name) {
            console.log("name")
            if(this.props.name !== this.state.name) {
                this.update();
            }
        }
    }

    componentWillUnmount() {
        this.updateDescription();
    }

    update = () => {
        this.setState({
            name: this.props.name,
            description: this.props.description,
            changed: null,
            taken: null
        })
    }

    async queryChangeName() {
        const valid = await this.props.updateStationName({
            variables: {
                name: this.name.value
            }
        })
        return valid;
    }

    async updateNameUi() {
        if(this.name.value !== this.state.name){
            const result = await this.queryChangeName();
            console.log(result.data.updateName)
            if(result.data.updateName){ 
                this.setState({
                    changed:true,
                    name:this.name.value,
                    edit:false
            })
            } else {
                this.setState({
                    taken:true
                })
            }
        } else {
            this.setState({
                edit:false
            })
        }
    } 

    handleDescriptionChange = () => {
        this.setState({
            description: this.description.value
        })
    }

    async updateDescription() {
        await this.props.updateStationDescription({
            variables: {
                description: this.state.description
            }
        })        
    }

    render() {
        return (
            <div>   
                <Fragment>
                    {!this.state.name ? (null) :
                    (<div> 
                        <h1>@{this.state.name} station</h1>    
                        {!this.state.edit ?
                        (<button 
                        onClick={()=> {
                            this.setState({edit: true})
                        }}
                        >
                        Edit
                        </button>) : (<div><input type="text" defaultValue={this.state.name} maxLength={64}  ref={input => (this.name = input)} /> <button onClick={() => this.updateNameUi()}> Change </button></div>) }
                        {this.state.taken ? (<h2>the name is already taken</h2>) : (null)} 
                        <div><textarea cols={33} rows={10} onChange={this.handleDescriptionChange} defaultValue={this.state.description} maxLength={256}  ref={input => (this.description = input)} /></div>
                    </div>)
                    }
                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(UPDATE_STATION_NAME, {
        name: "updateStationName",
        options: {
            refetchQueries: ["GET_USER_STATION"]
        }
    }),
    graphql(UPDATE_STATION_DESCRIPTION, {
        name: "updateStationDescription",
        options: {
            refetchQueries: ["GET_USER_STATION"]
        }
    }),

)(withApollo(Profile));