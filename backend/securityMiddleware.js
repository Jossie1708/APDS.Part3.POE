// Import required security libraries
const rateLimit = require('express-rate-limit'); // Middleware to limit repeated requests
const helmet = require('helmet'); // Middleware to secure HTTP headers
const expressBrute = require('express-brute'); // Middleware for brute-force protection
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const csrf = require('csurf'); // Middleware for CSRF (Cross-Site Request Forgery) protection
const hsts = require('hsts'); // Middleware to enforce HTTP Strict Transport Security (HSTS)
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const sqlInjectionSanitizer = require('sql-injection'); // Middleware for SQL injection protection

// CORS Configuration
// Define allowed origins, methods, and whether to include credentials in requests
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS.split(','), // List of allowed origins (defined in environment variables)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
//teehee
// Brute force protection
// Set up memory store for tracking requests from the same IP
const store = new expressBrute.MemoryStore(); 
const bruteForce = new expressBrute(store, {
    freeRetries: 5, // Number of allowed retries before rate limiting kicks in
    minWait: 1000 * 60, // Minimum wait time between attempts (1 minute)
    maxWait: 1000 * 60 * 15, // Maximum wait time after multiple failures (15 minutes)
});

// Rate limiting configuration
// Limit requests to prevent abuse or denial-of-service attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Time window for the rate limit (15 minutes)
    max: 100, // Maximum number of requests allowed per IP in the time window
    message: "Too many requests from this IP, please try again later." // Message to return when limit is exceeded
});

// CSRF Protection configuration
// Set up CSRF protection middleware
const csrfProtection = csrf({
    cookie: {
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        sameSite: 'Lax', // Cookies will only be sent in same-site requests and top-level navigation
    },
});

// Middleware setup function
// This function takes the Express app as an argument and applies various security measures
module.exports = (app) => {
    app.use(helmet()); // Apply Helmet to secure HTTP headers
    app.use(cors(corsOptions)); // Apply CORS with the specified options
    app.use(cookieParser()); // Parse cookies in incoming requests
    app.use(hsts({ maxAge: 31536000 })); // Enforce HSTS for one year (31536000 seconds)
    app.use(sqlInjectionSanitizer); // Apply SQL injection protection middleware
    app.use(limiter); // Apply rate limiting middleware
    app.use(csrfProtection); // Apply CSRF protection middleware

    // Middleware to expose CSRF token to the client
    app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken(); // Get CSRF token and make it available to the response locals
        next(); // Call the next middleware
    });

    // Apply brute force protection specifically to the login route
    app.post('/routes/users/login', bruteForce.prevent); // Prevent brute force attacks on login requests
};