
import React from 'react';
import ReactDOM from 'react-dom';
import {MapWithAMarker} from './GoogleMaps'

export class LiveCard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.mapMe = this.mapMe.bind(this);       
	}

	mapMe(e){
	    e.stopPropagation();
	    console.log('mapMe');

	    const lat = 40.833200;
	    const lng = -74.232450;

	    ReactDOM.render(<MapWithAMarker
	      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwrEE_qhFtG7f1KYUA1NeBkehf2nvltk&v=3.exp&libraries=geometry,drawing,places"
	      loadingElement={<div style={{ height: `100%` }} />}
	      containerElement={<div style={{ height: `400px` }} />}
	      mapElement={<div style={{ height: `100%` }} />}
	      lat={lat}
	      lng={lng}
	      />, document.getElementById('Map'));
    }

	render() {

		
		return (
			<div className="live-card mx-auto" uid={this.props.user_model.uid}>
				<div onClick={this.mapMe}>
					<p className="edit" onClick={this.props.editCard} style={{display:this.props.buttons ? 'block' : 'none'}} >EDIT</p>				
					<p className="delete" onClick={this.props.deleteCard} style={{display:this.props.buttons ? 'block' : 'none'}} >X</p>				
					<div className='user-img' style={{backgroundImage:"url("+this.props.user_model.image+")"}}></div>
					<p className='name'>{this.props.user_model.firstname} {this.props.user_model.lastname}</p>				
					<p className='email'><a href={`mailto:${this.props.user_model.email}`}> {this.props.user_model.email}</a></p>
					<div className='address'>
						<p>{this.props.user_model.address} {this.props.user_model.address2}</p>					
						<p>{this.props.user_model.city} {this.props.user_model.state} {this.props.user_model.zip}</p>					
					</div>
					{/*<p style={{display:this.props.user_model.agree ? 'block' : 'none'}}>Agree</p>*/}
					<img className='star' alt='star' src="images/star.png" style={{display:this.props.user_model.agree2 ? 'block' : 'none'}} />				
				</div>
				<div className="youSureYouWanToDelete-holder"></div>
			</div>

		)
	}
}

//LiveCard.defaultProps = {};


