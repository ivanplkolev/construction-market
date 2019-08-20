import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {

    render() {
        const isLoggedIn = this.props.isLoggedIn;

        const logInButton = isLoggedIn ? "" : <a onClick={this.props.openLogInModal}>Log In</a>;
        const signUpButton = isLoggedIn ? "" : <a onClick={this.props.openSignUpModal}>Sign Up</a>;
        const logOutButton = isLoggedIn ? <a onClick={this.props.logOut}>Log Out</a> : "";
        const MessagesButton = isLoggedIn ? <a onClick={this.props.openMessenger}>Messages</a> : "";
        const ProfileButton = isLoggedIn ? <a onClick={this.props.openMyProfile}>My Proffile</a> : "";
        const SearchButton = <a onClick={this.props.openSearchOffers}>Search</a>;
        const userGreeting = (isLoggedIn && this.props.loggedUser.name) ? <span>Hello {this.props.loggedUser.name}</span> : "";

        return (
            <ul className="Main-List">
                <li className="Main-List"> Name and Logo</li>
                <li className="Main-List">{userGreeting} </li>
                <li className="Main-List">{logOutButton} </li>
                <li className="Main-List">{signUpButton} </li>
                <li className="Main-List">{logInButton} </li>
                <li className="Main-List">{MessagesButton} </li>
                <li className="Main-List">{ProfileButton} </li>
                <li className="Main-List">{SearchButton} </li>

            </ul>
        );
    }
}

export default NavigationBar;