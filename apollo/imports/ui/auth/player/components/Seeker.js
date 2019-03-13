import React, { Component, Fragment } from 'react'
import Slider from '@material-ui/lab/Slider';
import "../style/seeker.css";


export default class Seeker extends Component {

    state = {
        value: 0,
        max: 100,
        min: 0
    }

    componentDidMount() {
        this.timer = setInterval(() => { 
            let value = this.props.seek();
            console.log("a");
            this.setState({
                value: value
            })
        }, 100);
    }

    componentDidUpdate(prevProps) {
        if(this.state.max != this.props.info()) {
            this.setUp();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setUp = () => {
        this.setState({
            value: 0,
            max: this.props.info()
        })
    }

    tick = () => {
        
    }

    onDrag = e => {
        this.props.setSeek(this.seeker.value);
    }


    render() {
        return (
            <div className="seeker">     
               <Slider 
                    value={this.state.value}
                    max={this.state.max}
                    min={this.state.min}
                    ref={(ref) => (this.seeker = ref)}
                    onDragEnd={this.onDrag}
               />
            </div>
        )
    }
}
