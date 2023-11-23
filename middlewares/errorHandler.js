// not Found

const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// common-error-handler.js

function handleErrorCode1000(err, req, res, next) {
    if (err.code === 1000) {
        // Handle errors with code 1000 here
        return res.status(400).json({ error: 'Error code 1000: Bad request.' });
    }

    next(err); // Pass other errors to the next error handler
};


// Error Handler

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        status: "fail",
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { errorHandler, notFound, handleErrorCode1000 };
