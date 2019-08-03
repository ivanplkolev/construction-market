import React from 'react';
import './ModalLogIn.css';

class ModalLogIn extends React.Component {

    render() {

        const showHideClassName = (this.props.showModalLogin || this.props.showModalSignUp) ? "ModalLogIn display-block" : "ModalLogIn display-none";

        const userName = this.props.showModalSignUp ? <label>
            User Name:
            <input type="text" value={this.props.loggedUser.name}
                   onChange={this.props.handleUserNameChange}/>
        </label> : "";

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <p> This is paragraph in the modal</p>

                    {userName}

                    <label>
                        User Email:
                        <input type="text" value={this.props.loggedUser.email}
                               onChange={this.props.handleUserEmailChange}/>
                    </label>

                    <label>
                        Password:
                        <input type="password" value={this.props.loggedUser.password}
                               onChange={this.props.handleUserPassChange}/>
                    </label>

                    <button onClick={this.props.handleClose}>Close</button>
                    <button onClick={this.props.logIn}>Log In</button>

                </section>
            </div>
        );

    }
}

export default ModalLogIn;