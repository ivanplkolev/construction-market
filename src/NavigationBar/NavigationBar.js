import React from 'react';
import './NavigationBar.css';
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';



class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.logoutClicked = this.logoutClicked.bind(this)

    }



    logoutClicked() {
        AuthenticationService.logout();
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        const logInButton = isUserLoggedIn ? "" : <Link to="/login">Log In</Link>;
        const signUpButton = isUserLoggedIn ? "" : <Link to="/login">Sign Up</Link>;
        const logOutButton = isUserLoggedIn ? <Link to="/" onClick={this.logoutClicked}>Log Out</Link> : "";
        const MessagesButton = isUserLoggedIn ? <Link to="/profile">Messages</Link> : "";
        const ProfileButton = isUserLoggedIn ? <Link to="/profile">My Proffile</Link> : "";
        const OffersButton = <Link to="/">Offers</Link>;
        //const userGreeting = (isUserLoggedIn && this.props.loggedUser.name) ? <span>Hello {this.props.loggedUser.name}</span> : "";

        return (
            <ul className="Main-List">
                <li className="Main-List"> Name and Logo</li>
                <li className="Main-List">{logOutButton} </li>
                <li className="Main-List">{signUpButton} </li>
                <li className="Main-List">{logInButton} </li>
                <li className="Main-List">{MessagesButton} </li>
                <li className="Main-List">{ProfileButton} </li>
                <li className="Main-List">{OffersButton} </li>

            </ul>
        );
    }
}

export default withRouter(NavigationBar);