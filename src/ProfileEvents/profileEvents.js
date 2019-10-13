import React from 'react';
import './UserProfile.css';
import OfferElement from '../OfferElement/OfferElement';
import AuthenticationService from '../service/AuthenticationService';
import axios from 'axios'
import { Link } from 'react-router-dom'


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: null
        };
        this.loadLoggedUser = this.loadLoggedUser.bind(this);
    }


    loadLoggedUser() {

        const userName = AuthenticationService.getLoggedInUserName();

        const url = 'http://localhost:8080/api/userEs/search/findByUserName?name=' + userName;

        axios.get(url)
            .then((jsonData) => {

                this.setState({loggedUser: jsonData.data});
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }

    componentDidMount() {
        this.loadLoggedUser();
    }


    render() {
        const loadedUser = this.state.loggedUser;

        if (!loadedUser) {
            return "";
        }

        const offerList = loadedUser._embedded.offerEList.map((m) =><li key={m.id}><OfferElement offer={m}/></li>);

        return (
            <div>
                <h1> This is your user profile </h1>

                <p>Name: {loadedUser.firstName}</p>

                <p>Surname: {loadedUser.lastName}</p>
                <ul>{offerList}</ul>

                <Link to="/createoffer">Add new Offer</Link>
            </div>
        );

    }
}

export default UserProfile;