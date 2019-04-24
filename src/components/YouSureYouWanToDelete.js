import React from 'react';
import ReactDOM from 'react-dom';

export class YouSureYouWanToDelete extends React.Component {
  	

	deleteThisCard(e){
		const uid = this.props.uid;
		const thisCard = this.props.thisCardHolder;
		thisCard.parentNode.removeChild(thisCard);
	}

	render() {

		return (

			<div className="youSureYouWanToDelete">
				<h2>Delete this card?</h2>
				<button onClick={this.deleteThisCard}>YES</button>
				<button>NO</button>
			</div>

		)
	}
}

//LiveCard.defaultProps = {};


