import React from 'react'
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidateSignIn} from '../../Global';
import {withRouter, Link} from 'react-router-dom';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);
        this.changeUser = this.changeUser.bind(this);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            },
            snack: {
                visible: false,
                message: ''
            }
        };
    }


    authenticate(event) {
        event.preventDefault();

        ValidateSignIn(this.state.user)
            .then(
                response => {
                    const errors = response.errors ? response.errors : {};
                    if(response.message){
                        errors.summary = response.message;
                        this.setState({snack: {visible: true, message: errors.summary}});
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

                        if (!registeredUsers[email]) {
                            return this.setState({snack: {visible: true, message: 'This user does not exist'}});
                        }

                        if (registeredUsers[email].password !== password) {
                            return this.setState({snack: {visible: true, message: 'Password is wrong'}});
                        }

                        localStorage.setItem('authentificated', JSON.stringify({
                            email
                        }));

                        this.props.history.push('/shops');
                    }

                }
            );
    }

    changeUser(){
        this.setState({snack: {visible: false, message: ''}});

        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });

    }

    render() {
        let {errors} = this.state;

        return (
            <Card className="container">
                <form action="/" onSubmit={this.authenticate}>
                <h2 className="card-heading">Sign In</h2>
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
                    <RaisedButton type="submit" label="Sign In" secondary={true} className="login-button"/>
                </form>
                <CardText><Link to={'/'} className="main-page-link">Back to main</Link></CardText>
                <Snackbar
                    open={this.state.snack.visible}
                    message={this.state.snack.message}
                    autoHideDuration={4000}
                />
            </Card>
        )
    }
}

export default withRouter(SignIn);