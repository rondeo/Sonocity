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
            try {
                let value = this.props.seek();
                this.setState({
                    value: value
                }) 
            } catch (error) {
                
            }
            
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
        try {
            this.setState({
                value: 0,
                max: this.props.info()
            })
        } catch (error) {
            
        }
        
    }

    tick = () => {
        
    }

    onDrag = e => {
        // this.props.setSeek(this.seeker.value);
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
