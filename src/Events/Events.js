import React from 'react';
import './Events.css';

class Events extends React.Component {

    render() {
        let loadedUser = this.props.loadedUser;

        const projectEvents = loadedUser.projectRequests.flatMap(p => p.events);
        const projectEventsList = projectEvents.map((ev) =>
                <li key={ev.id}>
                    {ev.date}
                </li>
        );

        const offeringServices = loadedUser.offeringServices.flatMap(s => s.events);
        const offeringServicesList = offeringServices.map((ev) =>
                <li key={ev.id}>
                    {ev.date}
                </li>
        );

        const machinesForRent = loadedUser.machinesForRent.flatMap(m => m.events);
        const machinesForRentList = machinesForRent.map((ev) =>
                <li key={ev.id}>
                    {ev.date}
                </li>
        );

        return (
            <div>
                <h5>My Projects</h5>
                <ul>{projectEventsList}</ul>
                <h5>My Services</h5>
                <ul>{offeringServicesList}</ul>
                <h5>My Machines for rent</h5>
                <ul>{machinesForRentList}</ul>
            </div>
        );

    }
}

export default Events;