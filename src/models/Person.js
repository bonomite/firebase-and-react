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
    }

}