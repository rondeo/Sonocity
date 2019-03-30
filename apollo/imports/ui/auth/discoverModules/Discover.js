import React, { Component, Fragment } from 'react'

import SongDisplay from './components/SongDisplay'
import StationDisplay from './components/StationDisplay'

import "./style/discoverSongs.css"


export default class Discover extends Component {
    state = {
        idList: [],
        name: null,
        context: null,
        get: 10
    };

    componentDidMount() {
        this.processIntake();  
    }

    componentDidUpdate(prevProps) {
        if(prevProps.idList && this.props.idList) {
            if(this.props.idList.length !== prevProps.idList.length || this.props.idList[0][0] !== prevProps.idList[0][0]) {
                this.processIntake();  
            }
        }
    }

    processIntake = () => {
        this.setState({
            idList: [this.props.idList],
            name: this.props.name,
            context: this.props.context
        });  
    } 
    
    elemSelected = i => {
        this.props.elemSelected(this.state.idList, parseInt(i), this.state.context, this.state.name);
    }

    less = () => {
        this.setState({
            get: this.state.get-10
        })
    }

    more = () => {
        this.setState({
            get: this.state.get+10
        })
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
                                i < this.state.get ?
                                (this.state.context == "playlist" ?
                                <SongDisplay key={i} index={i} onClick={this.elemSelected} audioId={this.state.name == "All songs" || this.state.name == "Your uploaded content" ? id._id : id.audioId} />
                                : <StationDisplay key={i} index={i} onClick={this.elemSelected} _id={id._id} />) : (null)
                        )) : (null) }
                        {this.state.idList[0] ? (this.state.get > 10 ? <img className="plusMinusImg" onClick={this.less} src={"https://res.cloudinary.com/dkt7hv91e/image/upload/v1553911746/minus_PNG27.png"}/> : (null)) : (null) }
                        {this.state.idList[0] ? (this.state.get < this.props.idList.length  ? <img className="plusMinusImg" onClick={this.more} src={"https://res.cloudinary.com/dkt7hv91e/image/upload/v1553911746/plus_PNG53.png"}/> : (null)) : (null) }
                    </div>        
                    
                </div>  
            </Fragment>
        </div>
        )
    }
}

