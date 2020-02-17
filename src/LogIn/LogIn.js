import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        //this.createBasicAuthToken = this.createBasicAuthToken.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        const username = this.state.username;
        const password = this.state.password;

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/`)
            }).catch(() => {
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginFailed: true})
            })

    }

    render() {
        return (
            <div>
                <h1 class="text-center">Login</h1>

                <div class="text-center">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}


                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">User Name:</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default"
                               name="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Password:</span>
                        </div>
                        <input type="password" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default"
                               name="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button class="btn btn-primary btn-lg" href="#" role="button" onClick={this.loginClicked}>Login
                    </button>

                </div>
            </div>
        )
    }
}

export default LogIn;