const getToken =()=>{
    if(typeof window !== "undefined"){

        const token = localStorage.getItem("token");
        if(token){
            return token;
        }else{
            return false;
        }
    }
}
export default getToken;