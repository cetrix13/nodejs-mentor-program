export const reversedStr = (input: string) => (input.split('').reverse().join(''));

export const uniqueID = (() => {
    let count  = 0;
    return () => ++count;
})();


export const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            aboartEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};
