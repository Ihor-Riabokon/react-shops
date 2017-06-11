import isEmail from 'validator/lib/isEmail';

const validate = function (fieldname) {
    if(this.state[fieldname] && this.state[fieldname].length) {
        switch (fieldname) {
            case 'email':
                if(!isEmail(this.state.email)) return 'Non valid email';
                break;
            case 'password':
                if(this.state.password.length < 6) return 'Minimal password length is 6';
                break;
            case 'confirmPassword':
                if(this.state.password.length < 6 || this.state.confirmPassword !== this.state.password) return 'Passwords do not match';
                break;
        }
    }else{
        return false;
    }
};

export {
    validate
}