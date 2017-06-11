import isEmail from 'validator/lib/isEmail';

const ValidateSignUp = (payload) =>  {

    return new Promise(function(resolve) {
        const errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload || typeof payload.email !== 'string' || !isEmail(payload.email)) {
            isFormValid = false;
            errors.email = 'Please provide a correct email address.';
        }

        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
            isFormValid = false;
            errors.password = 'Password must have at least 6 characters.';
        }

        if(!payload || typeof payload.confirmPassword !== 'string' || payload.confirmPassword !== payload.password){
            isFormValid = false;
            errors.confirmPassword = 'Password does not match';
        }

        if (!isFormValid) {
            message = 'Check the form for errors.';
        }

        resolve({
            success: isFormValid,
            message,
            errors
        })
    });

};

const ValidateSignIn = (payload) =>  {

    return new Promise(function(resolve) {
        const errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
            isFormValid = false;
            errors.email = 'Please provide your email address.';
        }

        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
            isFormValid = false;
            errors.password = 'Please provide your password.';
        }

        if (!isFormValid) {
            message = 'Check the form for errors.';
        }

        resolve({
            success: isFormValid,
            message,
            errors
        })
    });

};

export {
    ValidateSignUp,
    ValidateSignIn
}