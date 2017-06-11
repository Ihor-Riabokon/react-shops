import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {validate} from '../../Global';
import {withRouter} from "react-router-dom";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.authHandler = this.auth.bind(this);
        this.inputChangeHandler = this.inputChange.bind(this);
        this.validate = validate.bind(this);

        this.state = {};
    }


    auth() {
        let check = true;
        ['email', 'password'].forEach(name => {
            if (this.validate(name) === false || typeof this.validate(name) == 'string') {
                check = false;
            }
        });

        if (!check) return this.setState({snack: 'Required fields are empty'});

        let users = localStorage.getItem('users');

        try {
            users = JSON.parse(users) || {};
        } catch (e) {
            console.log(e);
        }

        if (!users[this.state.email]) {
            return this.setState({snack: 'This user does not exist'});
        }

        if (users[this.state.email].password !== this.state.password) {
            return this.setState({snack: 'Password is wrong'});
        }

        localStorage.setItem('authentificated', JSON.stringify({
            email: this.state.email
        }));

        this.props.history.push('/shops');
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
            <Card className="container">
                <h2 className="card-heading">Sign In</h2>
                <div className="field-line">
                <TextField
                        hintText="Email"
                        name="email"
                        onChange={this.inputChangeHandler}
                        errorText={this.validate('email')}
                    />
                </div>
                <div className="field-line">
                <TextField
                        hintText="Password"
                        type="password"
                        name="password"
                        onChange={this.inputChangeHandler}
                        errorText={this.validate('password')}
                    />
                </div>
                    <RaisedButton label="Login" secondary={true} onClick={this.authHandler} className="login-button"/>
                <Snackbar
                    open={!!(this.state.snack && this.state.snack.length)}
                    message={this.state.snack || ''}
                    autoHideDuration={4000}
                />
            </Card>
        )
    }
}

export default withRouter(SignIn);