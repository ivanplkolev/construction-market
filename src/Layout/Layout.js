import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import ModalLogIn from '../ModalLogIn/ModalLogIn';
import SearchBar from "../SearchBar/SearchBar";
import Offers from "../Offers/Offers";
import Events from "../Events/Events";
import Messenger from "../Messenger/Messenger";


class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: 'Initial data...',
            isLoggedIn: false,
            showModalLogIn: false,
            showModalSignUp: false,
            searchField: '',
            offersList: Array.from(Array(10).keys()),
            eventsList: Array.from(Array(8).keys()),
            messageslist: Array.from(Array(5).keys()),
            loggedUser: {
                name: '',
                email: '',
                password: ''
            }
        };
        this.updateState = this.updateState.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.openLogInModal = this.openLogInModal.bind(this);
        this.openSignUpModal = this.openSignUpModal.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleUserEmailChange = this.handleUserEmailChange.bind(this);
        this.handleUserPassChange = this.handleUserPassChange.bind(this);
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
    };

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
    };

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

    handleSearchFieldChange = (event) => {
        const newSearchVal = event.target.value;
        this.setState({searchField: newSearchVal});
    };

    performSearch = () => {
        let value = this.state.searchField;

        if (!value) {
            return;
        }

        let newOffersList = this.state.offersList;
        this.state.offersList.push(value);
        this.setState({offersList: newOffersList});
        this.setState({searchField: ''});
    };

    render() {

        return (
            <div>
                <NavigationBar myDataProp={this.state.data}
                               updateStateProp={this.updateState}
                               openLogInModal={this.openLogInModal}
                               openSignUpModal={this.openSignUpModal}
                               logOut={this.logOut}
                               loggedUser={this.state.loggedUser}
                               isLoggedIn={this.state.isLoggedIn}/>

                <ModalLogIn showModalLogin={this.state.showModalLogin}
                            showModalSignUp={this.state.showModalSignUp}
                            loggedUser={this.state.loggedUser}
                            handleUserNameChange={this.handleUserNameChange}
                            handleUserEmailChange={this.handleUserEmailChange}
                            handleUserPassChange={this.handleUserPassChange}
                            logIn={this.logIn}
                            handleClose={this.hideModal}/>

                <table>
                    <tr>
                        <td className="main-content">
                            <SearchBar searchField={this.state.searchField}
                                       handleSearchFieldChange={this.handleSearchFieldChange}
                                       performSearch={this.performSearch}/>

                            <Offers offerList={this.state.offersList}/>
                        </td>
                        <td>
                            <Offers offerList={this.state.offersList}/>
                        </td>
                        <td>
                            <Messenger messageslist={this.state.messageslist}/>
                        </td>

                        <td>
                            <Events eventsList={this.state.eventsList}/>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Layout;