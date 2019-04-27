import SimpleReactValidator from 'simple-react-validator'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LiveCard } from './LiveCard'
import { Person, PersonValidators } from '../models/Person'
import fire from './fire';
import * as filestack from 'filestack-js';

let edit;

export class AddNewUser extends Component {
  constructor(props) {
    super(props);

    edit = this.props.edit;

    if(edit){
      let self = this;
      fire.database().ref('users/'+this.props.uid).once("value").then(function(snapshot) {
        let currentPerson = new Person(snapshot.val());        
        self.setState({
          user_model: currentPerson,
        });
      });        
    }

    this.state = {
      user_model: new Person(),
    };
    

    this.validator = new SimpleReactValidator({      
      messages: {
        // validator level custimization
        //email: "That is not a valid email address."
        //default: "Wompers! That's not right!"
      },
      validators: {
        // ip: {
        //   message: 'The :attribute must be a valid IP address.',
        //   rule: function(val, params, validator) {
        //     return validator.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && params.indexOf(val) === -1
        //   }
        // }
      },
      element: (message, className='') => <div className={className+" text-danger d-block"}>{message}</div>
    });


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

    /*init filestack*/
    this.fs = filestack.init('ABjYBIzVATYCMDOrr7a9ez');

    /*sets scope to the base class, not just from with in the method*/
    this.addRecord = this.addRecord.bind(this);  
    this.submitForm = this.submitForm.bind(this);  
    //this.changing = this.changing.bind(this);      
    this.handleInputChange = this.handleInputChange.bind(this);      
    this.fsUpload = this.fsUpload.bind(this);      
    this.setImage = this.setImage.bind(this);  
    this.unmountMe = this.unmountMe.bind(this);          


  }
  
  componentWillMount(){



  }

  componentDidMount(){
    /*if(!edit){
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      this.setState({
        user_model:{
          //added all the empty defaults in PERSON
          ...this.state.user_model,
          uid:(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
        }
      })
    }*/
  }

  submitForm(e) {
    e.preventDefault();  
    if (this.validator.allValid()) {
      //alert('You submitted the form and stuff!');
      this.addRecord();
    } else {      
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();          
    }
  }

  fsUpload(e){
    e.preventDefault(); 
    this.fs.picker({
      maxFiles: 1,
      uploadInBackground: false,      
      onOpen: () => console.log('opened!'),
      onFileUploadFinished: (res) => console.log('finished = '+res[0]),
      onUploadDone: (res) => {
        //console.log(res);
        //console.log(res.filesUploaded[0].url);
        console.log(`this =  ${this}`);
        this.setImage(res.filesUploaded[0].url);
        //this.setImage("https://cdn.filestackcontent.com/0GfdupWDTA6O4FXfjIfk");
                
      }
    }).open();    
  }

  setImage(url){    
    console.log('url = '+url);
    this.setState({
      user_model:{
        ...this.state.user_model,
        image: url,
      }
    });    
  }

  addRecord(){
    let self = this;      
    let newUserID = '';
    
    if(!edit){

      fire.auth().createUserWithEmailAndPassword(self.state.user_model.email, self.state.user_model.address2)
        .then(function(firebaseUser) {
            
            newUserID = firebaseUser.user.uid;

            console.log("User " + newUserID + " created successfully!");
            console.log('firebaseUser.user.uid = '+newUserID);
            console.log(JSON.stringify(firebaseUser, null, 4));


            self.setState({
              user_model:{
                //added all the empty defaults in PERSON
                ...self.state.user_model,
                uid:newUserID,
              }
            })
            

            fire.database().ref('users/'+newUserID).set(self.state.user_model,
              function(error) {
                if (error) {
                  console.log('failed');
                } else {
                  console.log('sent');                
                }
              }); 

            //return fire.auth.$signInWithEmailAndPassword(email, password);
        }).then(function(firebaseUser) {
            console.log("Logged in as:", firebaseUser);
            self.unmountMe();
        }).catch(function(error) {
            console.error("Error: ", error);
        });

      }else{

        fire.database().ref('users/'+self.state.user_model.uid).set(self.state.user_model,
          function(error) {
            if (error) {
              console.log('failed');
            } else {
              console.log('sent');
              self.unmountMe();                
            }
          }); 

      }



      
     


  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      user_model:{
        ...this.state.user_model,
        [name]: value,
      }
    });
  }

  // changing(){         
  //   this.setState({
  //     user_model:{
  //       uid:        this.state.user_model.uid,
  //       firstname : this.firstname.value,
  //       lastname :  this.lastname.value,        
  //       email :     this.email.value,
  //       address :   this.address.value,
  //       address2 :  this.address2.value,
  //       city :      this.city.value,
  //       states :    this.states.value,
  //       zip :       this.zip.value,
  //       agree :     this.agree.checked,
  //       agree2 :    this.agree2.checked
  //     }
      
  //   })  
  // }

  unmountMe(){
    ReactDOM.unmountComponentAtNode(this.props.mountLocation);   
  }
           
  render() {

    let user_model = this.state.user_model,
        validators = new PersonValidators();


    return (
      <div className="AddNewUser">
      <div className="container">
      <div onClick={this.unmountMe} className="closer">&times;</div>
      <div className="row">
        <div className="col-sm-4"> 
        
        <form config={this.formConfig} ref="form" onSubmit={this.submitForm} >
          
          <button onClick={this.fsUpload}>UPLOAD A IMAGE</button>
          
          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="firstname">Image</label> 
            <div className="col-12">
              <input id="image" name="image" disabled placeholder="" value={user_model.image} onChange={this.handleInputChange} type="text" className="form-control" />
              {this.validator.message('image', user_model.image, validators.image.rules, { messages:validators.image.messages }) }
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="firstname">First name</label> 
            <div className="col-12">
              <input id="firstname" name="firstname" placeholder="" value={user_model.firstname} onChange={this.handleInputChange} type="text" className="form-control" />
              {this.validator.message('firstname', user_model.firstname, validators.firstname.rules, { messages:validators.firstname.messages }) }
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-form-label pb-0" htmlFor="lastname">Last Name</label> 
            <div className="col-12">
              <input id="lastname" name="lastname" placeholder="" value={user_model.lastname} onChange={this.handleInputChange} type="text" className="form-control" />
              {this.validator.message('lastname', user_model.lastname, validators.lastname.rules, { messages:validators.lastname.messages }) }
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-12 col-form-label pb-0">Email</label> 
            <div className="col-12">
              <input id="email" name="email" placeholder="" value={user_model.email} onChange={this.handleInputChange} type="text" className="form-control" />
                {this.validator.message('email', user_model.email, validators.email.rules, { className:'differentErrorClass',messages:validators.email.messages }) }
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-12 col-form-label pb-0">Address</label> 
            <div className="col-12">
              <input id="address" name="address" placeholder="123 Main St. Anytown New Jersey 07073" value={user_model.address} onChange={this.handleInputChange} type="text"  className="form-control"/>
              {this.validator.message('address', user_model.address, validators.address.rules, { messages:validators.address.messages }) }
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address2" className="col-12 col-form-label pb-0">Address 2</label> 
            <div className="col-12">
              <input id="address2" name="address2" placeholder="Appt 309" value={user_model.address2} onChange={this.handleInputChange} type="text" className="form-control"/>
              {/*{this.validator.message('address2', user_model.address2, validators.address2.rules, { messages:validators.address2.messages }) }*/}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-12 col-form-label pb-0">City</label> 
            <div className="col-12">
              <input id="city" name="city" placeholder="" value={user_model.city} onChange={this.handleInputChange} type="text" className="form-control" />
              {this.validator.message('city', user_model.city, validators.city.rules, { messages:validators.city.messages }) }
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-12 col-form-label pb-0">State</label> 
            <div className="col-12">
              <select id="state" name="state" className="custom-select" aria-describedby="stateHelpBlock" value={user_model.state} onChange={this.handleInputChange} >
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
              {this.validator.message('state', user_model.state, validators.state.rules, { messages:validators.state.messages }) }               
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="zip" className="col-12 col-form-label pb-0">Zip</label> 
            <div className="col-12">
              <input id="zip" name="zip" placeholder="" value={user_model.zip} onChange={this.handleInputChange} type="text" className="form-control" />
              {this.validator.message('zip', user_model.zip, validators.zip.rules, { messages:validators.zip.messages }) }               
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="agree" id="agree" checked={user_model.agree ? 'checked' : ''} type="checkbox" className="custom-control-input" value={user_model.agree} onChange={this.handleInputChange} /> 
                {this.validator.message('agree', user_model.agree, validators.agree.rules, { messages:validators.agree.messages }) } 
                
                <label htmlFor="agree" className="custom-control-label">I agree to something</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-12"></div> 
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input name="agree2" id="agree2" checked={user_model.agree2 ? 'checked' : ''} type="checkbox" className="custom-control-input" value={user_model.agree2} onChange={this.handleInputChange}/> 
                {/*{this.validator.message('agree2', user_model.agree2, validators.agree2.rules, { messages:validators.agree2.messages }) }*/}
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
            buttons={false}              
            className="p-4"
          />
        </div>

      </div>
      </div>
      </div>

    );
  }
}

