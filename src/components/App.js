import React, { Component } from 'react';
import {AddNewUser} from '../components/AddNewUser';
import { LiveCard } from './LiveCard'
import { Person, PersonValidators } from '../models/Person'
import fire from './fire';
//import * as filestack from 'filestack-js';



export class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      people:[]
    };  

    /*refs to children*/  
    this.AddNewUser_ref = React.createRef();

    /*method binding*/
    this.addNewUser_inChild = this.addNewUser_inChild.bind(this);      
    
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
          console.log('key = '+key);
          console.log('childData = '+childData);
          /*push to array and then setState*/          
          people.push(new Person(childData));
      });
        self.setState({people});
    });
  }

  addNewUser_inChild(){
    this.AddNewUser_ref.current.addNewUser();
  }
           
  render() {

    const peopleRender = this.state.people.map((person, index) => {      
      return (
        <div className="col-md-6 col-lg-3" key={index}>
          <LiveCard user_model={person}/>
        </div>
      )
    });


    return (
      <div>
      <div className="container">
        <button onClick={this.addNewUser_inChild}>ADD NEW USER</button> 
        <div className="row populateCardsHere">
          
          {peopleRender}

        </div>
      </div>
      <AddNewUser ref={this.AddNewUser_ref} />
      </div>
    );
  }
}

