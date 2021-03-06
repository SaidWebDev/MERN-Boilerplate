const User = require('../../models/User')
module.exports = (app) => {
/*     app.get('/api/counters', (req, res, next) => {
      Counter.find()
        .exec()
        .then((counter) => res.json(counter))
        .catch((err) => next(err));
    });
  
    app.post('/api/counters', function (req, res, next) {
      const counter = new Counter();
  
      counter.save()
        .then(() => res.json(counter))
        .catch((err) => next(err));
    }); */

   /*
   * Sign up
   */
  app.post('api/account/signup', (req,res,next) =>{
    const { body} = req;
    const {
     firstName,
     lastName,
     email,
     password
            } = body;

    if(!firstName){
        return  res.send({
        success: false,
        message: 'Error: Missing first name cannot be blank.'
    });
    }
    if(!lastName){
        return  res.send({
            success: false,
            message: 'Error: Missing last name cannot be blank.'
        });
        }
    if(!email){
   return  res.send({
        success: false,
        message: 'Error: Missing email cannot be blank.'
    });
    }
    if(!password){
        return  res.send({
            success: false,
            message: 'Error: Missing password cannot be blank.'
        });
        }

        console.log('here');

    email = email.toLowerCase();

    // Steps:
    // 1 Verify email doesn't exist
    // 2. save

        User.find({
            email: email
        }, (err, previousUsers)=> {
            if(err){
                return  res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            } else if (previousUsers.length>0){
                return  res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            }

    // Save the new user
    const newUser = new User();
    newUser.email= email;
    newUser.firstName= firstName;
    newUser.lastName= lastName;
    newUser.password= newUser.generateHash(password);
    newUser.save((err, user)=>{
        if(err){
            return  res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        return  res.send({
            success: true,
            message: 'Successfully signed up.'
        });
    })



        })

});
};