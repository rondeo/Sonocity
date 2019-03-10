import React, { Component, Fragment } from 'react'
import Slider from '@material-ui/lab/Slider';
import "../style/seeker.css"


export default class Seeker extends Component {

    state = {
        value: 0,
        max: 100,
        min: 0
    }

    componentDidMount() {
        if(!this.props.info.loading ) {
            if(this.props.play && this.props.info){
                this.setUp();
                this.tick();
            }
        } 
    }

    componentDidUpdate(prevProps) {
        if(prevProps.info != this.props.info){
            this.setUp();
        }
    }

    setUp = () => {
        this.setState({
            max: this.props.info[0],
            value: 0
        })
    }

    tick = () => {
        if(this.props.play) {
            console.log("a")
            setInterval(this.tick, 10000);
            let value = this.props.seek();
            this.setState({
            value: value
            })
        }   
    }

    // onDrag = e => {
    //     this.props.dragged(this.seeker.value);
    // }


    render() {
        return (
            <div className="seeker">     
               <Slider 
                    value={this.state.value}
                    max={this.state.max}
                    min={this.state.min}
                    ref={(ref) => (this.seeker = ref)}
                    // onDragEnd={this.onDrag}
               />
            </div>
        )
    }
}
