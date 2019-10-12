import React from 'react';
import './Event.css';

import axios from 'axios'
import { Link } from 'react-router-dom'

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventForEdit: null
        };

        //this.loadEvent = this.loadEvent.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleDetailChange = this.handleDetailChange.bind(this);
    }

    //loadEvent(offerId) {
    //    const url = 'http://localhost:8080/api/offerEs/search/findbyId?id=' + offerId;
    //
    //    axios.get(url)
    //        .then((jsonData) => {
    //            this.setState({agrrementForEdit: jsonData.data});
    //            //console.log(jsonStr);
    //        }).catch(function (error) {
    //            console.log('Request failed', error)
    //        });
    //}


    handleChange(propertyType, event) {
        const propertyName = event.target.name;
        const propertyValue = event.target.value;
        const theEvent = this.state.eventForEdit;

        let fieldForEdit = theEvent[propertyName];

        if (propertyType == 'day') {
            fieldForEdit.setDate(propertyValue);
        } else if (propertyType == 'month') {
            fieldForEdit.setMonth(propertyValue - 1);
        } else {
            fieldForEdit = propertyValue;
        }

        theEvent[propertyName] = fieldForEdit;

        this.setState(
            {
                eventForEdit: theEvent
            }
        )
    }

    saveEvent = () => {
        const event1 = this.state.eventForEdit;

        if (event1.fromDate < new Date()) {
            event1.fromDate.setYear(event1.fromDate.getYear() + 1);
        }
        if (event1.toDate < new Date()) {
            event1.toDate.setYear(event1.toDate.getYear() + 1);
        }

        //const url = 'http://localhost:8080/api/eventEs';
        const url = 'http://localhost:8080/api/saveHelper/eventEs';

        return axios.post(url, event1);
    };


    render() {
        const location = this.props.location.pathname;
        let event = this.state.eventForEdit;
        if (!event) {
            const offerId = location.substr(location.indexOf('createEvent/') + 'createEvent/'.length);

            this.setState(
                {
                    eventForEdit: {
                        parent: {id: offerId},
                        fromDate: new Date(),
                        toDate: new Date()
                    }
                }
            );
            return "";
        }

        return (
            <div >

                <label>
                    Event Title:
                    <input type="text" value={event.title} onChange={(e) => this.handleChange("", e)} name="title"/>
                </label>

                <br/>
                <br/>
                <br/>

                <label>
                    Date From
                    <select onChange={(e) => this.handleChange("day", e)} name="fromDate">
                        {Array(31).fill(0).map((e, i)=>i + 1).map(d =><option value={d}>{d}</option>) }
                    </select>
                    <select onChange={(e) => this.handleChange("month", e)} name="fromDate">
                        {Array(12).fill(0).map((e, i)=>i + 1).map(d =><option value={d}>{d}</option>) }
                    </select>
                </label>

                <br/>
                <br/>
                <br/>

                <label>
                    Date To
                    <select onChange={(e) => this.handleChange("day", e)} name="toDate">
                        {Array(31).fill(0).map((e, i)=>i + 1).map(d =><option value={d}>{d}</option>) }
                    </select>
                    <select onChange={(e) => this.handleChange("month", e)} name="toDate">
                        {Array(12).fill(0).map((e, i)=>i + 1).map(d =><option value={d}>{d}</option>) }
                    </select>
                </label>

                <br/>
                <br/>
                <br/>

                <Link to="/">Close</Link>

                <br/>
                <br/>
                <br/>

                <Link to="/" onClick={this.saveEvent}>Save</Link>

            </div>
        );

    }
}

export default Event;