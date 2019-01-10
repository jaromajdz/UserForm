import React from 'react';

import styles from './Backdrop.css';

import Aux from '../../../hoc/Aux/Aux';

class Backdrop extends React.Component{

    state={
      style: styles.Backdrop+" "+styles.Close,
      show: false
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.sshow && !this.state.show){
          this.timer=setInterval(this.tick,15);
          //console.log('show');
      } else if (!nextProps.sshow && this.state.show) {
        this.setState({show: true, style: styles.Backdrop+" "+styles.Close})
        this.timer=setInterval(this.tickHide,301);
      }
    }

tickHide=()=>{
    //console.log('Tick hide');
    clearInterval(this.timer);
    this.setState({show: false})
  }

  tick = ()=>{
    //console.log('Tick open');
    clearInterval(this.timer);
    this.setState({show: true, style: styles.Backdrop+" "+styles.Open})
  }



  componentDidMount(){
    //console.log('Did mounte');
    if (this.props.sshow){
      this.timer=setInterval(this.tick,10);
    }
  }

  render(){
      //console.log('Render');
        let backdrop=<div className={this.state.style} onClick={this.props.click}>
                      {this.props.children}
                    </div>;
        if (!this.props.sshow && !this.state.show){
          backdrop= null;
        }

                //console.log('Render', this.state.style);
        return(
          <Aux>
            {backdrop}
        </Aux>
        );
    }
  }
export default Backdrop;
