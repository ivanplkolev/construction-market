import React from 'react';
import './Agreement.css';

import axios from 'axios'
import { Link } from 'react-router-dom'

class Agreement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agrrementForEdit: null
        };

        //this.loadOffer = this.loadOffer.bind(this);
        this.saveAgreement = this.saveAgreement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        //this.addNewDetailRow = this.addNewDetailRow.bind(this);

    }

    //loadOffer(offerId) {
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


    handleChange(event) {
        const propertyName = event.target.name;
        const propertyValue = event.target.value;

        const agreement = this.state.agrrementForEdit;

        agreement[propertyName] = propertyValue;

        this.setState(
            {
                agrrementForEdit: agreement
            }
        )
    }

    saveAgreement = () => {

        const agreement = this.state.agrrementForEdit;

        agreement.agreementDetailEList.length = agreement.agreementDetailEList.length -1;

        const url = 'http://localhost:8080/api/saveHelper/agreementEs';
        //const url = 'http://localhost:8080/api/AgreementEs';

        return axios.post(url, agreement);
    };


    handleDetailChange(propertyType, event) {
        const detailNumber = parseInt(event.target.name);
        const propertyValue = event.target.value;
        //const propertyType = event.target.type;
        const agreement = this.state.agrrementForEdit;

        const detail = agreement.agreementDetailEList[detailNumber];

        detail[propertyType] = propertyValue;

        if (detailNumber == agreement.agreementDetailEList.length - 1) {
            agreement.agreementDetailEList.push({number: detailNumber + 1, price: '', description: ''});
        }

        this.setState(
            {
                agrrementForEdit: agreement
            }
        )
    }


    //addNewDetailRow() {
    //    const agreement = this.state.agrrementForEdit;
    //
    //    const newNumber = agreement.agreementDetailEList.length + 1;
    //
    //    agreement.agreementDetailEList.push({number: newNumber});
    //
    //    this.setState(
    //        {
    //            agrrementForEdit: agreement
    //        }
    //    )
    //}


    render() {
        const location = this.props.location.pathname;
        let agreement = this.state.agrrementForEdit;
        if (!agreement) {
            const eventId = location.substr(location.indexOf('createAgreement/') + 'createAgreement/'.length);
            //this.loadOffer(offerId);//todo cosider is it needed ?

            this.setState(
                {
                    agrrementForEdit: {
                        parent: {id: eventId},
                        agreementDetailEList: [{number: 0, price: '', description: ''}]
                    }
                }
            );

            return "";
        }


        let details = agreement.agreementDetailEList.map((d) => {
            return <tr>
                <td>
                    {d.number}
                </td>
                <td>
                    <input type="text" value={d.description} name={d.number}
                           onChange={(e) => this.handleDetailChange("description", e)}/>
                </td>
                <td>
                    <input type="text" value={d.price} name={d.number}
                           onChange={(e) => this.handleDetailChange("price", e)}/>
                </td>
            </tr>
        });


        return (
            <div >

                <table>
                    <tr>
                        <td>
                        </td>

                        <td>
                            Description
                        </td>
                        <td>
                            Sub Price
                        </td>
                    </tr>

                    {details}

                </table>


                <Link to="/">Close</Link>
                <br/>
                <br/>
                <br/>
                <br/>

                <Link to="/" onClick={this.saveAgreement}>Save</Link>

            </div>
        );

    }
}

export default Agreement;