import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import ModalLogIn from '../ModalLogIn/ModalLogIn';
import SearchPage from "../SearchPage/SearchPage";
import Events from "../Events/Events";
import Messenger from "../Messenger/Messenger";
import UserProfile from "../UserProfile/UserProfile";
import OfferModal from "../OfferModal/OfferModal";
import './Layout.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AuthenticatedRoute from "../component/AuthenticatedRoute";


import MockupJSON from "../MockUps/MockupJSON.js";


class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //data: 'Initial data...',
            //isLoggedIn: false,
            //showModalLogIn: false,
            //showModalSignUp: false,
            //mainContent: 'offers',
            //loadedUser: MockupJSON.loadedUser,
            //loggedUser: {
            //    name: '',
            //    email: '',
            //    password: ''
            //}
        };
        this.updateState = this.updateState.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.openMessenger = this.openMessenger.bind(this);
        this.openMyProfile = this.openMyProfile.bind(this);
        this.openSearchOffers = this.openSearchOffers.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.openLogInModal = this.openLogInModal.bind(this);
        this.openSignUpModal = this.openSignUpModal.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleUserEmailChange = this.handleUserEmailChange.bind(this);
        this.handleUserPassChange = this.handleUserPassChange.bind(this);
    }

;

    updateState() {
        this.setState({data: 'Data updated from the child component...'})
    }

    openLogInModal() {
        this.setState({showModalLogin: true});

    }

    openSignUpModal() {
        this.setState({showModalSignUp: true});
    }

    logIn() {
        this.setState({isLoggedIn: true});
        this.setState({showModalLogin: false});
        this.setState({showModalSignUp: false});
    }

    logOut() {
        this.setState({isLoggedIn: false});

        this.setState({
            loggedUser: {
                name: '',
                email: '',
                password: ''
            }
        });
    }

;

    hideModal = () => {
        this.setState({showModalLogin: false});
        this.setState({showModalSignUp: false});
    };

    handleUserNameChange = (event) => {
        const userName = event.target.value;
        const email = this.state.loggedUser.email;
        const pass = this.state.loggedUser.password;
        this.setState({
            loggedUser: {
                name: userName,
                email: email,
                password: pass
            }
        });
    };

    handleUserEmailChange = (event) => {
        const userName = this.state.loggedUser.name;
        const email = event.target.value;
        const pass = this.state.loggedUser.password;
        this.setState({
            loggedUser: {
                name: userName,
                email: email,
                password: pass
            }
        });
    };

    handleUserPassChange = (event) => {
        const userName = this.state.loggedUser.name;
        const email = this.state.loggedUser.email;
        const pass = event.target.value;
        this.setState({
            loggedUser: {
                name: userName,
                email: email,
                password: pass
            }
        });
    };

    openMessenger = () => {
        this.setState({mainContent: 'messenger'});
    };

    openMyProfile = () => {
        this.setState({mainContent: 'profile'});
    };


    openSearchOffers = () => {
        this.setState({mainContent: 'offers'});
    };


    render() {
        //let mainContentTd;
        //let leftSideContent;

        //if (this.state.mainContent === 'offers') {
        //    mainContentTd = <SearchPage />
        //} else if (this.state.mainContent === 'messenger') {
        //    mainContentTd = <Messenger conversations={this.state.loadedUser.conversations}/>
        //} else if (this.state.mainContent === 'profile') {
        //    mainContentTd = <UserProfile loadedUser={this.state.loadedUser}/>;
        //}

        //if (this.state.isLoggedIn || true) {
        //    leftSideContent = <Events loadedUser={this.state.loadedUser}/>;
        //}

        return (
            <Router >
                <div className="navbar">
                    <NavigationBar myDataProp={this.state.data}
                                   updateStateProp={this.updateState}
                                   openLogInModal={this.openLogInModal}
                                   openSignUpModal={this.openSignUpModal}
                                   logOut={this.logOut}
                                   openMessenger={this.openMessenger}
                                   openMyProfile={this.openMyProfile}
                                   openSearchOffers={this.openSearchOffers}
                                   loggedUser={this.state.loggedUser}
                                   isLoggedIn={this.state.isLoggedIn}/>
                </div>


                <table class="container">
                    <tbody>
                    <tr>
                        <td class="leftSide">
                        </td>
                        <td class="center">

                            <Switch>
                                <Route path="/" exact component={SearchPage} />
                                <Route path="/login" exact component={ModalLogIn} />
                                <AuthenticatedRoute path="/profile" exact component={UserProfile} />
                                <AuthenticatedRoute path="/createoffer" exact component={OfferModal} />
                                <AuthenticatedRoute path="/editoffer" component={OfferModal} />
                            </Switch>

                        </td>
                        <td class="rightSside">
                            <Events loadedUser={this.state.loadedUser}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Router>
        );
    }
}

export default Layout;