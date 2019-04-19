import React, { Component } from 'react';
import {LiveCard} from './LiveCard'
import {Person} from '../models/Person'
import fire from './fire';



export class App extends Component {
  constructor(props) {
    super(props);
    //this.state = { users: [] }; // <- set up react state

    

    this.state = {
      user_model: new Person(),
    };

/*    this.state = {
      user_model:{
        uid:'',       
        firstname :'',
        lastname :'', 
        email :'',    
        address :'',  
        address2 :'', 
        city :'',     
        state :'',   
        zip :'',      
        agree :'',    
        agree2 :''   
      }
    }; */

    /*sets scope to the base class, not just from with in the method*/
    this.addRecord = this.addRecord.bind(this);  
  }
  componentWillMount(){

      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      this.setState({
        user_model:{
          /*added all the empty defaults in PERSON*/
          ...this.state.user_model,
          uid:(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
        }
      })

  }

  addRecord(e){
    e.preventDefault();        
    fire.database().ref('users/'+this.state.user_model.uid).set(this.state.user_model);
    
  }
  changing(){        
    this.setState({
      user_model:{
        uid:        this.state.user_model.uid,
        firstname : this.firstname.value,
        lastname :  this.lastname.value,        
        email :     this.email.value,
        address :   this.address.value,
        address2 :  this.address2.value,
        city :      this.city.value,
        states :    this.states.value,
        zip :       this.zip.value,
        agree :     this.agree.checked,
        agree2 :    this.agree2.checked
      }
      
    })  
  } 
  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-4"> 
        <form ref="form" onSubmit={this.addRecord} onChange={this.changing.bind(this)}>




          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="firstname">First name</label> 
            <div className="col-12">
              <input id="firstname" ref={ el => this.firstname = el } name="firstname" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="lastname">Last Name</label> 
            <div className="col-12">
              <input id="lastname" ref={ el => this.lastname = el } name="lastname" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-12 col-form-label pb-0">Email</label> 
            <div className="col-12">
              <input id="email" ref={ el => this.email = el } name="email" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-12 col-form-label pb-0">Address</label> 
            <div className="col-12">
              <input id="address" ref={ el => this.address = el } name="address" placeholder="123 Main St. Anytown New Jersey 07073" type="text" required="required" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address2" className="col-12 col-form-label pb-0">Address 2</label> 
            <div className="col-12">
              <input id="address2" ref={ el => this.address2 = el } name="address2" placeholder="Appt 309" type="text" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-12 col-form-label pb-0">City</label> 
            <div className="col-12">
              <input id="city" ref={ el => this.city = el } name="city" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-12 col-form-label pb-0">State</label> 
            <div className="col-12">
              <select id="state" ref={ el => this.states = el } name="state" className="custom-select" aria-describedby="stateHelpBlock" required="required">
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>               
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="zip" className="col-12 col-form-label pb-0">Zip</label> 
            <div className="col-12">
              <input id="zip" ref={ el => this.zip = el } name="zip" placeholder="" type="text" className="form-control" required="required"/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="agree" ref={ el => this.agree = el } id="agree" type="checkbox" className="custom-control-input" value="" required="required"/> 
                <label htmlFor="agree" className="custom-control-label">I agree to something</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="agree2" ref={ el => this.agree2 = el } id="agree2" type="checkbox" className="custom-control-input" value=""/> 
                <label htmlFor="agree2" className="custom-control-label">I agree to something but not required</label>
              </div>
            </div>
          </div> 
          <div className="form-group row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
          </div>

        </form>
        </div>
          <div className="col-sm-8">
            <LiveCard
              user_model={this.state.user_model}              
              className="p-4"
            />
          </div>
      </div>
      </div>
    );
  }
}

