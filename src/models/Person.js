export class Person {

    constructor(user_obj = {}) {      
        /*if data is here set it, if not make empty*/
        //this.uid = ('uid' in user_obj) ? user_obj.uid : '';       
        this.uid = ('uid' in user_obj) ? user_obj.uid : '';       
        this.image = ('image' in user_obj) ? user_obj.image : '';
        this.firstname = ('firstname' in user_obj) ? user_obj.firstname : '';
        this.lastname = ('lastname' in user_obj) ? user_obj.lastname : ''; 
        this.email = ('email' in user_obj) ? user_obj.email : '';    
        this.address = ('address' in user_obj) ? user_obj.address : '';  
        this.address2 = ('address2' in user_obj) ? user_obj.address2 : ''; 
        this.city = ('city' in user_obj) ? user_obj.city : '';     
        this.state = ('state' in user_obj) ? user_obj.state : '';   
        this.zip = ('zip' in user_obj) ? user_obj.zip : '';      
        this.agree = ('agree' in user_obj) ? user_obj.agree : '';    
        this.agree2 = ('agree2' in user_obj) ? user_obj.agree2 : '';
    }
}

export class PersonValidators {

    constructor(){
        return{
            image:{
                rules:'required',
                messages:{
                    required:'Upload a profile image',
                }
            },
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
           /* address2:{
                rules:'required',
                messages:{
                    required:'Custom required message address2',                    
                }
            },*/
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
           /* agree2:{
                rules:'required',
                messages:{
                    required:'Custom required message agree2',                    
                }
            },*/
        }
    }   
    
}
