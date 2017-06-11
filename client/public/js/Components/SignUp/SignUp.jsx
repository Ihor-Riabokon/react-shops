import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {validate} from '../../Global';
import {withRouter} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.registerHandler = this.register.bind(this);
        this.inputChangeHandler = this.inputChange.bind(this);
        this.validate = validate.bind(this);

        this.state = {};
    }


    register() {
        let check = true;
        ['email', 'password', 'confirmPassword'].forEach(name => {
            if(this.validate(name) === false || typeof this.validate(name) == 'string') {
                check = false;
            }
        });

        if(!check) return this.setState({snack: 'Required fields are empty'});

        let users = localStorage.getItem('users');

        try {
            users = JSON.parse(users) || {};
        } catch (e) {
            console.log(e);
        }

        if (users[this.state.email]) {
            this.setState({snack: 'This user already exists'});
        }else{
            users[this.state.email] = {
                password: this.state.password
            };

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('authentificated', JSON.stringify({
                email: this.state.email
            }));

            this.props.history.push('/shops');
        }
    }

    inputChange(e) {
        const field = e.target.name;
        const value = e.target.value;

        this.setState({
             [field]: value
        });
    }

    render() {
        return (
            <Card>
                <CardHeader>Registration</CardHeader>
                <CardText>
                    <TextField
                        hintText="Email"
                        name="email"
                        onChange={this.inputChangeHandler}
                        errorText={this.validate('email')}
                    /><br />
                    <TextField
                        hintText="Password"
                        type="password"
                        name="password"
                        onChange={this.inputChangeHandler}
                        errorText={this.validate('password')}
                    /><br />
                    <TextField
                        hintText="Confirm password"
                        name="confirmPassword"
                        type="password"
                        onChange={this.inputChangeHandler}
                        errorText={this.validate('confirmPassword')}
                    /><br />
                    <RaisedButton label="Registration" secondary={true} onClick={this.registerHandler} />
                </CardText>
                <Snackbar
                    open={!!(this.state.snack && this.state.snack.length)}
                    message={this.state.snack || ''}
                    autoHideDuration={4000}
                />
            </Card>
        )
    }
}

export default withRouter(SignUp);