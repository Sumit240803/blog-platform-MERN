const getTokenFromHeader = (req) => {
    // Check if the 'Authorization' header exists
    const authHeader = req.headers.authorization;
  
    // Return the token if the header exists and is in the correct format
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Extract the token after "Bearer"
    }
  
    // Return null if the header is missing or improperly formatted
    return null;
  };
  
  export default getTokenFromHeader;
  