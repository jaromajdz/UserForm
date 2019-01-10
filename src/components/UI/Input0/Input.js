import React from 'react'
//import PropTypes from 'prop-types'

class Input extends React.Component{
  state={
    value: '',
    start: 0,
    illegal: false
  }

  onChangeHandler=(event)=>{
    //console.log(event.target.selectionStart, event.target.selectionEnd);
    let patt=/([a-z])/;
    if (this.props.pattern){patt=this.props.pattern;}



    const start=event.target.selectionStart;
    let value=event.target.value, illegal=false;



    if(this.state.value.length<value.length){

      //if("0123456789".indexOf(value.charAt(start-1))==-1){
      if(!patt.test(value.charAt(start-1))){
          value=this.state.value;
          illegal=true;
        }

        if(this.props.maxLenght){
            if(value.length>this.props.maxLenght){
              value=this.state.value;
            illegal=true;}
          }

    }

    this.setState({value: value, start: start, illegal: illegal});

  }

  componentDidUpdate(){
    if(this.state.illegal){
      this.refs.input.selectionStart=this.state.start-1;
      this.refs.input.selectionEnd=this.state.start-1;
    }
  }

  render () {
    return (
        <input type="text" ref="input" value={this.state.value} onChange={event=>this.onChangeHandler(event)}/>
    )
  }
}

export default Input;
