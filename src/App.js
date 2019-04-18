import React, { Component } from 'react';
import fire from './fire';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  addRecord(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      
        <form onSubmit={this.addRecord.bind(this)}>
          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="firstname">First name</label> 
            <div className="col-12">
              <input id="firstname" name="firstname" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="lastname">Last Name</label> 
            <div className="col-12">
              <input id="lastname" name="lastname" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-12 col-form-label pb-0">Email</label> 
            <div className="col-12">
              <input id="email" name="email" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-12 col-form-label pb-0">Address</label> 
            <div className="col-12">
              <input id="address" name="address" placeholder="123 Main St. Anytown New Jersey 07073" type="text" required="required" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address2" className="col-12 col-form-label pb-0">Address 2</label> 
            <div className="col-12">
              <input id="address2" name="address2" placeholder="Appt 309" type="text" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-12 col-form-label pb-0">City</label> 
            <div className="col-12">
              <input id="city" name="city" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-12 col-form-label pb-0">State</label> 
            <div className="col-12">
              <select id="state" name="state" className="custom-select" aria-describedby="stateHelpBlock" required="required">
                <option value="New Jersey">New Jersey</option>
                <option value="New York">New York</option>
                <option value="Ohio">Ohio</option>
              </select>               
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="zip" className="col-12 col-form-label pb-0">Zip</label> 
            <div className="col-12">
              <input id="zip" name="zip" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="optin" id="optin_0" type="checkbox" className="custom-control-input" value="agree" required="required"/> 
                <label htmlFor="optin_0" className="custom-control-label">I agree to something</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="optin2" id="optin2_0" type="checkbox" className="custom-control-input" value="agree2"/> 
                <label htmlFor="optin2_0" className="custom-control-label">I agree to something but not required</label>
              </div>
            </div>
          </div> 
          <div className="form-group row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
          </div>

        </form>
    );
  }
}

