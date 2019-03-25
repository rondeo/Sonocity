import React, { Component, Fragment } from 'react'

import SongDisplay from './components/SongDisplay'
import StationDisplay from './components/StationDisplay'

import "./style/discoverSongs.css"


export default class Discover extends Component {
    state = {
        idList: [],
        name: null,
        context: null
    };

    componentDidMount() {
        this.processIntake();  
    }

    componentDidUpdate(prevProps) {
        if(prevProps.idList && this.props.idList) {
            if(this.props.idList.length !== prevProps.idList.length) {
                this.processIntake();  
            }
        }
    }

    processIntake = () => {
        console.log("1")
        console.log(this.props.idList)
        console.log("2")
        this.setState({
            idList: [this.props.idList],
            name: this.props.name,
            context: this.props.context
        });  
    } 
    
    elemSelected = i => {
        this.props.elemSelected(this.state.idList, parseInt(i), this.state.context, this.state.name);
    }
    
    render() {
        return (
            <div>              
            <Fragment>
                <div>
                    {this.props.name.loading ? (null) : (<h1 className = "dName">{this.props.name}</h1>)}
                    <div className="snippets">
                        {this.state.idList[0] ?
                            this.state.idList[0].map((id, i) => (
                                this.state.context == "playlist" ?
                                <SongDisplay key={i} index={i} onClick={this.elemSelected} audioId={this.state.name == "All songs" ? id._id : id.audioId} />
                                : <StationDisplay key={i} index={i} onClick={this.elemSelected} _id={id._id} />
                        )) : (null) }
                    </div>        
                </div>  
            </Fragment>
        </div>
        )
    }
}

