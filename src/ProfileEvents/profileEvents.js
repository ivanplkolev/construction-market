import React from 'react';
import './ProfileEvents.css';
import EventElement from './EventElement';
import AuthenticationService from '../service/AuthenticationService';
import axios from 'axios'
import { Link } from 'react-router-dom'


class ProfileEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: null
        };
        this.loadLoggedUser = this.loadLoggedUser.bind(this);
    }


    loadLoggedUser() {

        const userName = AuthenticationService.getLoggedInUserName();

        const url = 'http://localhost:8080/api/userEs/search/findByUserName?name=' + userName+ '&projection=userWithHisOffers';

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

        const eventsList = loadedUser.eventsList.map((m) =><li key={m.id}><EventElement theEvent={m}/></li>);

        return (
            <div>
                <ul>{eventsList}</ul>
            </div>
        );

    }
}

export default ProfileEvents;