import JWT from 'jsonwebtoken';


export const authenticateUser = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied! No token provided'
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token'
        });
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access Denied! You do not have the required permissions.'
            });
        }
        next();
    };
};


export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};


export const requestLogger = (req, res, next)=> {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};


export const validateInputs = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        next();
    };
};