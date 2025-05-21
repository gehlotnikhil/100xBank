const Token = require('../models/Authenticationkey');

exports.checking = (role) => {
  console.log(`Checking role authorization for role: ${role}`);
  return (req, res, next) => {
    console.log('Incoming request user:', req.user);
    
    if (!req.user) {
      console.log('No user found in request - authentication failed');
      return res.status(401).json({ 
        message: 'Not authenticated',
        error: 'No user data found in request'
      });
    }
    
    console.log(`User role: ${req.user.role}, Required role: ${role}`);
    if (req.user.role !== role) {
      console.log('Role mismatch - access denied');
      return res.status(403).json({ 
        message: 'Access denied',
        error: `User role ${req.user.role} does not match required role ${role}`
      });
    }
    
    console.log('Role check passed - proceeding to next middleware');
    next();
  };
};

exports.validating = async (req, res, next) => {
  try {
    console.log('Starting token validation process');
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);

    if (!authHeader) {
      console.log('No authorization header provided');
      return res.status(401).json({ 
        message: 'Authorization token required',
        error: 'Missing authorization header'
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid token format - missing Bearer prefix');
      return res.status(401).json({ 
        message: 'Authorization token required',
        error: 'Invalid token format - must start with Bearer'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted token:', token);

    if (!token) {
      console.log('Token is empty after splitting');
      return res.status(401).json({ 
        message: 'Authorization token required',
        error: 'Token is empty or malformed'
      });
    }

    console.log('Attempting to get user by token');
    const user = await Token.getUserByToken(token);
    console.log('Retrieved user:', user);

    if (!user) {
      console.log('No user found for the provided token');
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        error: 'Could not find user associated with the provided token'
      });
    }

    console.log('Token validation successful - attaching user to request');
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error occurred:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Server error during authentication',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};