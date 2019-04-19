
import React from 'react';


//import { NavBar,RandowmNumber } from './NavBar';

export class LiveCard extends React.Component {
  	
	render() {

		return (

			<div className="live-card">				
				<p>{this.props.user_model.firstname}</p>
				<p>{this.props.user_model.lastname}</p>
				<p>{this.props.user_model.email}</p>
				<p>{this.props.user_model.address}</p>
				<p>{this.props.user_model.address2}</p>
				<p>{this.props.user_model.city}</p>
				<p>{this.props.user_model.state}</p>
				<p>{this.props.user_model.zip}</p>
				<p style={{display:this.props.user_model.agree ? 'block' : 'none'}}>Agree</p>
				<p style={{display:this.props.user_model.agree2 ? 'block' : 'none'}}>Agree2</p>				
			</div>

		)
	}
}

//LiveCard.defaultProps = {};


