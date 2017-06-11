import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidateSignUp} from '../../Global.js';
import {withRouter} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
        this.changeUser = this.changeUser.bind(this);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        };
    }

    changeUser(event){

        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });

    }


    register() {

        ValidateSignUp(this.state.user)
            .then(
                response => {
                    const errors = response.errors ? response.errors : {};
                    if(response.message){
                        errors.summary = response.message;
                    }

                    this.setState({
                        errors
                    });


                    if(Object.keys(errors).length === 0){
                        let registeredUsers = localStorage.getItem('users');
                        try {
                            registeredUsers = JSON.parse(registeredUsers) || {};
                        } catch (e) {
                            console.log(e);
                        }

                        if(registeredUsers[this.state.user.email]) {
                            this.setState({snack: 'This user already exists'});
                        } else {
                            registeredUsers[this.state.email] = {
                                password: this.state.user.password
                            };

                            localStorage.setItem('users', JSON.stringify(registeredUsers));
                            localStorage.setItem('authentificated', JSON.stringify({
                                email: this.state.user.email
                            }));

                            this.props.history.push('/shops');
                        }
                    }




                }
            );

    }

    render() {
        let {errors} = this.state;

        return (
            <Card>
                <CardHeader>Registration</CardHeader>
                <CardText>
                    {errors.summary && <p className="error-message">{errors.summary}</p>}
                    <TextField
                        hintText="Email"
                        name="email"
                        onChange={this.changeUser}
                        errorText={errors.email}
                    /><br />
                    <TextField
                        hintText="Password"
                        type="password"
                        name="password"
                        onChange={this.changeUser}
                        errorText={errors.password}
                    /><br />
                    <TextField
                        hintText="Confirm password"
                        name="confirmPassword"
                        type="password"
                        onChange={this.changeUser}
                        errorText={errors.confirmPassword}
                    /><br />
                    <RaisedButton label="Registration" secondary={true} onClick={this.register} />
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