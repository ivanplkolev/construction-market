import React from 'react';
import './Events.css';
import AuthenticationService from '../service/AuthenticationService';
import axios from 'axios'
import Calendar from '../Calendar/Calendar';

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: null
        };
        this.loadLoggedUser = this.loadLoggedUser.bind(this);
    }

    loadLoggedUser(userName) {

        const url = 'http://localhost:8080/api/userEs/search/findByUserName?name=' + userName + '&projection=userWithHisOffers';

        axios.get(url)
            .then((jsonData) => {

                this.setState({loggedUser: jsonData.data});


                axios.get(url)
                    .then((jsonData) => {

                        this.setState({loggedUser: jsonData.data});
                        //console.log(jsonStr);
                    }).catch(function (error) {
                        console.log('Request failed', error)
                    });
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }

    //componentDidMount() {
    //    this.loadLoggedUser();
    //}

    render() {
        const loadedUser = this.state.loggedUser;

        if (!loadedUser) {
            const userName = AuthenticationService.getLoggedInUserName();
            if (userName) {
                this.loadLoggedUser(userName);
            }
            return "";
        }

        if (!loadedUser.eventsList) {
            return "";
        }

        return (

            <div >
                <div >
                    <h5 >My Projects</h5>
                    <Calendar events={loadedUser.eventsList}/>
                </div>
            </div>
        )
            ;

    }
}

export default Events;