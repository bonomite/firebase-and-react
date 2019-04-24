import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {AddNewUser} from '../components/AddNewUser';
import {YouSureYouWanToDelete} from '../components/YouSureYouWanToDelete';
import { LiveCard } from './LiveCard'
import { Person } from '../models/Person'
import fire from './fire';




export class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      people:[]
    };  

    /*refs to children*/  
    //this.AddNewUser_ref = React.createRef();

    /*method binding*/
    this.addNewUser = this.addNewUser.bind(this);      
    this.editCard = this.editCard.bind(this);      
    this.deleteCard = this.deleteCard.bind(this);      
    
  }
  
  componentWillMount(){}

  componentDidMount(){
    let self = this;
    fire.database().ref('users').on("value",
      function(snapshot) {

        let people = [];

        snapshot.forEach(function(childSnapshot) {          
          var key = childSnapshot.key;          
          var childData = childSnapshot.val();
          //console.log('key = '+key);
          //console.log('childData = '+childData);
          //push to array and then setState
          people.push(new Person(childData));
      });
        self.setState({people});
    });
  }

  editCard(e){
    //console.log('edit card :uid = '+e.target.closest('.live-card').getAttribute('uid'));
    const uid = e.target.closest('.live-card').getAttribute('uid');
    const thisCardHolder = e.target.closest('.live-card-holder');
    const mountLocation = document.getElementById('mount_AddNewUser_here');
    ReactDOM.render(<AddNewUser edit={true} mountLocation={mountLocation} uid={uid} />, mountLocation);
  }

  deleteCard(e){
    const thisCard = e.target.closest('.live-card');
    const thisCardHolder = e.target.closest('.live-card-holder');
    const mountLocation = thisCardHolder.querySelector('.youSureYouWanToDelete-holder');
    const uid = e.target.closest('.live-card').getAttribute('uid');
    //console.log('delete card :uid = '+thisCard.getAttribute('uid'));
    ReactDOM.render(<YouSureYouWanToDelete mountLocation={mountLocation} uid={uid} thisCardHolder={thisCardHolder}/>, mountLocation);
  }

  addNewUser(){
    //this.AddNewUser_ref.current.addNewUser();
    ReactDOM.render(<AddNewUser edit={false} mountLocation={document.getElementById('mount_AddNewUser_here')} />, document.getElementById('mount_AddNewUser_here'));
  }
           
  render() {

    const peopleRender = this.state.people.map((person, index) => {      
      return (
        <div className="col-md-6 col-lg-3 live-card-holder" key={index}>
          <LiveCard user_model={person} editCard={this.editCard} deleteCard={this.deleteCard} buttons={true} />
        </div>
      )
    });


    return (
      <div>
        <div className="container">
          <button onClick={this.addNewUser}>ADD NEW USER</button> 
          <div className="row">
            
            {peopleRender}

          </div>
        </div>
        <div id="mount_AddNewUser_here"></div>
      </div>
    );
  }
}

