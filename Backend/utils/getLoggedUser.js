import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const getUser = (token)=>{
    try {
        const decoded = jwt.verify(token , process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
    }
}
export default getUser;