const {StatusCodes}=require('http-status-code');

class ValidationError extends Error{
    constructor(error){
        super();
        let explanation=[]
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        })
       this.name="Validation error";
       this.message="not able to Validate data sent in request";
       this.explanation=explanation;
       this.statusCodes=statusCodes.BAD_REQUEST
    }
}

module.exports=ValidationError
