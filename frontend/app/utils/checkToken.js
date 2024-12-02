const { jwtDecode } = require("jwt-decode");


const checkToken = ()=>{
    try {
    const token = localStorage.getItem("token");
    if(token){
        const decode = jwtDecode(token);
        const time = Math.floor(Date.now()/1000);
        if(decode.exp < time){
            localStorage.removeItem("token");
            return false;
        }else{
            return true;
        }

    }
}
    catch (error) {
        console.log(error);
    }
}
export default checkToken;