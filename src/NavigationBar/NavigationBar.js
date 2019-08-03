import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {

    render() {
        const isLoggedIn = this.props.isLoggedIn;

        const logInButton = isLoggedIn ? "" : <button onClick={this.props.openLogInModal}>Log In</button>;
        const signUpButton = isLoggedIn ? "" : <button onClick={this.props.openSignUpModal}>Sign Up</button>;
        const logOutButton = isLoggedIn ? <button onClick={this.props.logOut}>Log Out</button> : "";
        const MessagesButton = isLoggedIn ? <button onClick={this.props.openMessenger}>Messages</button> : "";
        const ProfileButton = isLoggedIn ? <button onClick={this.props.openMyProfile}>My Proffile</button> : "";
        const SearchButton = <button onClick={this.props.openSearchOffers}>Search</button>;
        const userGreeting = (isLoggedIn && this.props.loggedUser.name) ? <span>Hello {this.props.loggedUser.name}</span> : "";

        return (
            <ul className="Main-List">
                <li className="Main-List"> Name and Logo</li>
                <li className="Main-List">{userGreeting} </li>
                <li className="Main-List">{SearchButton} </li>
                <li className="Main-List">{logInButton} </li>
                <li className="Main-List">{signUpButton} </li>
                <li className="Main-List">{MessagesButton} </li>
                <li className="Main-List">{ProfileButton} </li>
                <li className="Main-List">{logOutButton} </li>
            </ul>
        );
    }
}

export default NavigationBar;