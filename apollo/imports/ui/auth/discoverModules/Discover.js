import React, { Component, Fragment } from 'react'

import SongDisplay from './components/SongDisplay'
import StationDisplay from './components/StationDisplay'

import "./style/discoverSongs.css"


export default class Discover extends Component {
    state = {
        idList: [],
        name: null,
        context: null,
        get: 8
    };

    componentDidMount() {
        this.setUp();  
    }

    componentDidUpdate(prevProps) {
        if(prevProps.idList && this.props.idList) {
            if(this.state.name==null) {
                this.props.name ? this.setState({name:this.props.name}) : (null)
            }
            if(this.props.idList.length !== prevProps.idList.length || this.props.idList[0][0] !== prevProps.idList[0][0]) {
                this.setUp();  
            }
        }
    }

    setUp = () => {
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
            get: this.state.get-8
        })
    }

    more = () => {
        this.setState({
            get: this.state.get+8
        })
    }
    
    render() {
        return (
            <div>              
            <Fragment>
                <div>
                    <div className="snippets">
                        {this.state.idList[0] ?
                            this.state.idList[0].map((id, i) => (
                                i < this.state.get ?
                                (this.state.context == "playlist" ?
                                <SongDisplay key={i} index={i} onClick={this.elemSelected} audioId={this.state.name == "Your liked tracks" ? id.audioId : id._id } />
                                : <StationDisplay key={i} index={i} onClick={this.elemSelected} _id={id._id} />) : (null)
                        )) : (null) }
                    </div>        
                    <div className="discoverTitles">
                        {this.state.name ? (<h4 className = "dName">{this.state.name}</h4>) : (null)}
                        <div className="plusMinusImg">
                            {this.state.idList[0] ? (this.state.get > 8 ? <img className="minusImg" onClick={this.less} src={"https://res.cloudinary.com/dkt7hv91e/image/upload/v1554335930/minus_PNG271.png"}/> : (null)) : (null) }
                            {this.state.idList[0] ? (this.state.get < this.props.idList.length  ? <img className="plusImg" onClick={this.more} src={"https://res.cloudinary.com/dkt7hv91e/image/upload/v1554335931/plus_PNG531.png"}/> : (null)) : (null) }
                        </div>
                    </div>

                </div>  
            </Fragment>
        </div>
        )
    }
}

