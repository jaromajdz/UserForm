import React from 'react';
//import './Backdrop2.css';
import styles from './FadeInOut.css';
import Aux from '../../../hoc/Aux/Aux';

class FadeInOut extends React.Component{

    state={
      style: styles.Backdrop+" "+styles.Hide,
      show: false
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.show && !this.state.show){
        this.setState({show: true, style: styles.Backdrop+" "+styles.Show})
          console.log('show');
      } else if (!nextProps.show && this.state.show) {
        this.setState({show: true, style: styles.Backdrop+" "+styles.Hide})
        this.timer=setInterval(this.tickHide,301);
      }
    }


  /*
  componentWillUpdate(nextProps){
    if (nextProps.show && !this.state.show){
      this.setState({show: true, style: styles.Backdrop+" "+styles.Open})
        console.log('show');
    }else if (!nextProps.show && this.state.show){
      //console.log('hide');
      if(!this.state.wait){
        this.setState({wait: true, show: false, style: styles.Backdrop+" "+styles.Close})
        //this.timer=setInterval(this.tickHide,301)
      }
     this.setState({wait: true});
    }
  }
*/
tickHide=()=>{
    console.log('Tick hide');
    clearInterval(this.timer);
    this.setState({show: false})
  }

  tick = ()=>{
    clearInterval(this.timer);
    this.setState({show: true, style: styles.Backdrop+" "+styles.Show})
  }



  componentDidMount(){
    console.log('Did mounte');
    if (this.props.show){
      this.timer=setInterval(this.tick,2);
    }
  }

  render(){

        let backdrop=<div className={this.state.style} onClick={this.props.click}>
                      {this.props.children}
                    </div>;
        if (!this.props.show && !this.state.show){
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
export default FadeInOut;
