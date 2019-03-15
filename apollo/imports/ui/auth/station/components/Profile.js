import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPDATE_STATION_DESCRIPTION from "../queries/updateDescription"
import UPDATE_STATION_NAME from "../queries/updateName"
import UPDATE_COVER from "../queries/updateCover"

import DropZoneImage from "../../uploadModule/components/ImageSelector"

import "../style/profile.css"

class Profile extends Component {
    state = {
        name: null,
        description: null,
        mDescription: false,
        mName: false,
        taken: null, 
        edit: false,
        coverUrl: null
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
            taken: null,
            coverUrl: this.props.coverUrl
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

    changeImage = dataUrl => {
        this.setState({
            coverUrl: dataUrl
        })
        this.upload() ;
   }

    setUpUpload = file => {
        const cloudName = 'dkt7hv91e';
        const unsignedUploadPreset = 'gqo3naek';
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let xhr = new XMLHttpRequest();
        let fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);

        return [xhr, fd];
    }

    upload = () => {
        const set1 = this.setUpUpload(this.state.coverUrl);
        const xhr1 = set1[0];
        const fd1 = set1[1];
            
        xhr1.onreadystatechange = (e) => {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                let response1 = JSON.parse(xhr1.responseText);
                let url2 = response1.secure_url; 
                console.log(url2) 

                const dataresult = this.props.updateCover({
                    variables: {
                        coverUrl: url2
                    }
                });
            }
        }   
        xhr1.send(fd1); 
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
                        <
                            div className="stationCover"><img src={this.state.coverUrl}/></div>
                        <DropZoneImage addUp={this.changeImage}/>
                        
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
    graphql(UPDATE_COVER, {
        name: "updateCover",
    }),

)(withApollo(Profile));