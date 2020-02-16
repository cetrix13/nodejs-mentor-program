import { ValidationErrorItem, Schema } from "@hapi/joi";
import { Request, Response, NextFunction } from 'express';

export const reversedStr = (input: string) => (input.split('').reverse().join(''));

export const uniqueID = (() => {
    let count  = 0;
    return () => ++count;
})();


export const errorResponse = (schemaErrors: ValidationErrorItem[]) => {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};
