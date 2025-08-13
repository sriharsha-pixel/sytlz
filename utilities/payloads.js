require('dotenv').config();

function loginPayload(email,pwd){
   const payload={
        username:email,
        password:pwd
    }
    return payload
}
export{loginPayload}