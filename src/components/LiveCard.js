
import React from 'react';


//import { NavBar,RandowmNumber } from './NavBar';

export class LiveCard extends React.Component {
  	
	render() {

		return (

			<div className="live-card mx-auto">				
				<div className='user-img' style={{backgroundImage:"url("+this.props.user_model.image+")"}}></div>
				<p className='name'>{this.props.user_model.firstname} {this.props.user_model.lastname}</p>				
				<p className='email'>{this.props.user_model.email}</p>
				<div className='address'>
					<p>{this.props.user_model.address} {this.props.user_model.address2}</p>					
					<p>{this.props.user_model.city} {this.props.user_model.state} {this.props.user_model.zip}</p>					
				</div>
				{/*<p style={{display:this.props.user_model.agree ? 'block' : 'none'}}>Agree</p>*/}
				<img className='star' src="images/star.png" style={{display:this.props.user_model.agree2 ? 'block' : 'none'}} />				
			</div>

		)
	}
}

//LiveCard.defaultProps = {};


