import React,{Component} from 'react'
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'
import Auxi from '../../../hoc/Auxi/Auxi'


class Modal extends Component{

  shouldComponentUpdate(nextProps,nexState){
    return nextProps.show !== this.props.show
  }

  componentDidUpdate(){
    console.log('[modal.js] will update')
  }

  render(){
    return (
      <Auxi>
      <BackDrop show={this.props.show} clicked={this.props.clicked}/>
      <div className={classes.Modal}
        style={{
          transform: this.props.show?'translateY(0)':'translateY(-100vh)',
          opacity:this.props.show?'1':'0'
        }}
      >
          {this.props.children}
      </div>
  </ Auxi>
    )}
}

  export default Modal