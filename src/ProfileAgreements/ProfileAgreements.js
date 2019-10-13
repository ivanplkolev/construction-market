import React from 'react';
import './ProfileAgreements.css';
import AgreementElement from './AgreementElement';
import AuthenticationService from '../service/AuthenticationService';
import axios from 'axios'
import { Link } from 'react-router-dom'


class ProfileAgreements extends React.Component {
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

        const agreementsList = loadedUser.eventsList.filter((a) => a.agreement)
            .map((m) =><li key={m.agreement.id}><AgreementElement agreement={m.agreement}/></li>);

        return (
            <div>
                <ul>{agreementsList}</ul>
            </div>
        );

    }
}

export default ProfileAgreements;