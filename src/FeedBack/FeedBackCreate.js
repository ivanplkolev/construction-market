import React from 'react';
import './FeedBack.css';

import axios from 'axios'
import { Link } from 'react-router-dom'

class FeedBackCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedBack: null
        };
        this.saveFeedBack = this.saveFeedBack.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const propertyName = event.target.name;
        const propertyValue = event.target.value;

        const feedBack = this.state.feedBack;
        feedBack[propertyName] = propertyValue;

        this.setState(
            {
                feedBack: feedBack
            }
        )
    }


    saveFeedBack = () => {

        const feedBack = this.state.feedBack;

        const url = 'http://localhost:8080/api/saveHelper/feedBackEs';

        return axios.post(url, feedBack);
    };


    render() {
        const location = this.props.location.pathname;
        let feedBack = this.state.feedBack;
        if (!feedBack) {
            const agreementId = location.substr(location.indexOf('leaveFeedBack/') + 'leaveFeedBack/'.length);
            this.setState(
                {
                    feedBack: {
                        parent: {id: agreementId},
                        stars: 0,
                        textReview: ''
                    }
                }
            );
            return "";
        }

        return (
            <div>
                <table>
                    <tr>
                        <td>
                            Stars
                        </td>
                        <td>
                            <select onChange={this.handleChange} name="stars">
                                {Array(5).fill(0).map((e, i)=>i + 1).map(d =><option value={d}>{d}</option>) }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Comment:
                        </td>
                        <td>
                            <input type="text" value={feedBack.textReview} name="textReview"
                                   onChange={this.handleChange}/>
                        </td>
                    </tr>
                </table>

                <Link to="/">Close</Link>
                <br/>
                <br/>
                <br/>
                <br/>

                <Link to="/" onClick={this.saveFeedBack}>Save</Link>

            </div>
        );

    }


}


export default FeedBackCreate;