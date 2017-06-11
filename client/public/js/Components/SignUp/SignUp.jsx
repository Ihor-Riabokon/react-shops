import React from 'react'
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidateSignUp} from '../../Global.js';
import {withRouter, Link} from 'react-router-dom';

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
            },
            snack: {
                visible: false,
                message: ''
            }
        };
    }

    changeUser(event){

        this.setState({snack: false});

        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });

    }


    register(event) {

        event.preventDefault();

        ValidateSignUp(this.state.user)
            .then(
                response => {
                    const errors = response.errors ? response.errors : {};
                    if(response.message){
                        errors.summary = response.message;
                        this.setState({snack: { visible: true, message: errors.summary}});
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

                        let {email, password} = this.state.user;

                        if(registeredUsers[email]) {
                            this.setState({snack: {visible: true, message: 'This user already exists'}});
                        } else {
                            this.setState({snack: false});
                            registeredUsers[email] = {
                                password: password
                            };

                            localStorage.setItem('users', JSON.stringify(registeredUsers));
                            localStorage.setItem('authentificated', JSON.stringify({
                                email
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
            <Card className="container">
                <form action="/" onSubmit={this.register}>
                <h2 className="card-heading">Sign Up</h2>
                    <div className="field-line">
                    <TextField
                        hintText="Email"
                        name="email"
                        onChange={this.changeUser}
                        errorText={errors.email}
                    />
                    </div>
                    <div className="field-line">
                    <TextField
                        hintText="Password"
                        type="password"
                        name="password"
                        onChange={this.changeUser}
                        errorText={errors.password}
                    />
                    </div>
                    <div className="field-line">
                    <TextField
                        hintText="Confirm password"
                        name="confirmPassword"
                        type="password"
                        onChange={this.changeUser}
                        errorText={errors.confirmPassword}
                    />
                    </div>
                    <RaisedButton type="submit" label="Register" secondary={true} className="signup-button" />
                </form>
                    <CardText>Already registered? <Link to={'/signin'} className="signin-link">Sign in</Link></CardText>
                <Snackbar
                    open={this.state.snack.visible}
                    message={this.state.snack.message}
                    autoHideDuration={4000}
                />
            </Card>
        )
    }
}

export default withRouter(SignUp);