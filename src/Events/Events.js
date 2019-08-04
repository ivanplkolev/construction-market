import React from 'react';
import './Events.css';

import Calendar from '../Calendar/Calendar';

class Events extends React.Component {

    render() {
        let loadedUser = this.props.loadedUser;

        const projectEvents = loadedUser.projectRequests.flatMap(p => p.events);
        //const projectEventsList = projectEvents.map((ev) =>
        //        <li key={ev.id}>
        //            {ev.date}
        //        </li>
        //);

        const offeringServices = loadedUser.offeringServices.flatMap(s => s.events);
        //const offeringServicesList = offeringServices.map((ev) =>
        //        <li key={ev.id}>
        //            {ev.date}
        //        </li>
        //);


        const machinesForRentList = loadedUser.machinesForRent.map(m =>
                <div>
                    <h6>{m.name}</h6>
                    <Calendar events={m.events}/>
                </div>
        );

        return (
            <div>
                <h5>My Projects</h5>
                <Calendar events={projectEvents}/>
                <h5>My Services</h5>
                <Calendar events={offeringServices}/>
                <h5>My Machines for rent</h5>
                {machinesForRentList}
            </div>
        );

    }
}

export default Events;