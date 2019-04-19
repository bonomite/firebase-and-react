export class Person {
    constructor(user_obj = {}) {      
        //this.uid = ('uid' in user_obj) ? user_obj.uid : '';       
        this.uid = '';       
        this.firstname = '';
        this.lastname = ''; 
        this.email = '';    
        this.address = '';  
        this.address2 = ''; 
        this.city = '';     
        this.state = '';   
        this.zip = '';      
        this.agree = '';    
        this.agree2 = '';
        
        /*this.formErrors = {            
            firstname: '',
            lastname: '', 
            email: '',    
            address: '',  
            address2: '', 
            city: '',     
            state: '',   
            zip: '',      
            agree: '',    
            agree2: ''
        };
        this.firstnameValid = false;
        this.lastnameValid = false; 
        this.emailValid = false;    
        this.addressValid = false;  
        this.address2Valid = false; 
        this.cityValid = false;     
        this.stateValid = false;   
        this.zipValid = false;      
        this.agreeValid = false;    
        this.agree2Valid = false;
        this.formValid = false;*/
    }

}