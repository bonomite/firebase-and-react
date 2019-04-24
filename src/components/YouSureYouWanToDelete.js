import React from 'react';
import ReactDOM from 'react-dom';
import fire from './fire';

export class YouSureYouWanToDelete extends React.Component {
  	
  	constructor(props) {
	    super(props);
	    
	    this.state = {};

	    this.deleteThisCard = this.deleteThisCard.bind(this);          
	    this.unmountMe = this.unmountMe.bind(this);          
  	}

	deleteThisCard(e){
		const uid = this.props.uid;
		const thisCard = this.props.thisCardHolder;
		const mountLocation = this.props.mountLocation;
		thisCard.parentNode.removeChild(thisCard);
		/*remove from firebase*/
		let self = this;      
	    fire.database().ref('users/'+uid).remove(
	      function(error) {
	        if (error) {
	          console.log('failed remove');
	        } else {
	          console.log('removed record');	          
	        }
	      }
	    ); 	
	}

	unmountMe(){
		ReactDOM.unmountComponentAtNode(this.props.mountLocation);   
	}

	render() {

		return (

			<div className="youSureYouWanToDelete">
				<h2>Delete this card?</h2>
				<button onClick={this.deleteThisCard}>YES</button>
				<button onClick={this.unmountMe}>NO</button>
			</div>

		)
	}
}

//LiveCard.defaultProps = {};


