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

export class PersonValidators {

    constructor(){
        return{
            firstname:{
                rules:'required',
                messages:{
                    required:'Custom required message first name',
                }
            },
            lastname:{
                rules:'required',
                messages:{
                    required:'Custom required message last name',
                }
            },
            email:{
                rules:'required|email',
                messages:{
                    required:'Custom required message email',
                    email:'Custom email message email',
                }
            },
            address:{
                rules:'required',
                messages:{
                    required:'Custom required message address',                    
                }
            },
            address2:{
                rules:'required',
                messages:{
                    required:'Custom required message address2',                    
                }
            },
            city:{
                rules:'required',
                messages:{
                    required:'Custom required message city',                    
                }
            },
            state:{
                rules:'required',
                messages:{
                    required:'Custom required message state',                    
                }
            },
            zip:{
                rules:'required|alpha_num|max:5|min:5',
                messages:{
                    required:'Custom required message zip',                    
                    alpha_num:'Custom alpha_num message zip',                    
                    min:'Custom min 5 message zip',                    
                    max:'Custom max 5 message zip',                    
                }
            },
            agree:{
                rules:'required',
                messages:{
                    required:'Custom required message agree',                    
                }
            },
            agree2:{
                rules:'required',
                messages:{
                    required:'Custom required message agree2',                    
                }
            },
        }
    }   
    
}
