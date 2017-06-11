import React from 'react';
import ReactDOM from 'react-dom';
import { SignUp, SignIn, Shops } from './Components';
import { BrowserRouter, Route, Redirect} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
import Auth from './Auth';

injectTapEventPlugin();

class ShopApp extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" render={() => (
                            Auth.isUserAuthenticated() ? (
                                <Shops/>
                            ) : (
                                <SignUp/>
                            )
                        )}/>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/shops" render={() => (
                            Auth.isUserAuthenticated() ? (
                                <Shops/>
                            ) : (
                                <SignIn/>
                            )
                        )}/>
                        <Route path="/signout" render={() => {
                            Auth.deAuthenticateUser();
                            return <Redirect to='/'/>;
                        }}/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<ShopApp />, document.getElementById('app'));