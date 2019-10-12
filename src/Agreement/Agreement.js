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

        this.loadAgreement = this.loadAgreement.bind(this);
        this.saveAgreement = this.saveAgreement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        this.addNewDetailRow = this.addNewDetailRow.bind(this);

    }

    loadAgreement(offerId) {
        const url = 'http://localhost:8080/api/offerEs/search/findbyId?id=' + offerId;

        axios.get(url)
            .then((jsonData) => {
                this.setState({agrrementForEdit: jsonData.data});
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }


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
        const url = 'http://localhost:8080/api/AgreementEs';

        const agreement = this.state.agrrementForEdit;

        return axios.post(url, agreement);
    };


    handleDetailChange(event) {
        const detailNumber = event.target.name;
        const propertyValue = event.target.value;
        const propertyType = event.target.type;
        const agreement = this.state.agrrementForEdit;

        const detail = agreement.agreementDetailEList.filter(obj => {
            return obj.number == detailNumber;
        });

        detail[propertyType] = propertyValue;

        this.setState(
            {
                agrrementForEdit: agreement
            }
        )
    }


    addNewDetailRow() {
        const agreement = this.state.agrrementForEdit;

        const newNumber = agreement.agreementDetailEList.length + 1;

        agreement.agreementDetailEList.push({number: newNumber});

        this.setState(
            {
                agrrementForEdit: agreement
            }
        )
    }


    render() {
        const location = this.props.location.pathname;
        let agreement = this.state.agrrementForEdit;
        if (!agreement) {
            const agreementTitle = location.substr(location.indexOf('createAgreement/') + 'createAgreement/'.length);
            this.loadAgreement(agreementTitle);
            return "";
        }


        let details = agreement.agreementDetailEList.map((d) => {
            return <tr>
                <td>
                    {d.number}
                </td>
                <td>
                    <input type="text" value={d.description} name={d.number} type="description"
                           onChange={this.handleDetailChange}/>
                </td>
                <td>
                    <input type="text" value={d.price} name={d.number} type="price" onChange={this.handleDetailChange}/>
                </td>
            </tr>
        });


        return (
            <div >

                <label>
                    Agreement Title:
                    <input type="text" value={agreement.title} onChange={this.handleChange}/>
                </label>

                <label>
                    Agreement Title:
                    <input type="text" value={agreement.title} onChange={this.handleChange}/>
                </label>

                <table>
                    <th>
                        <td></td>
                        <td>
                            Description
                        </td>
                        <td>
                            Price
                        </td>
                    </th>


                    <tr>
                        <td></td>
                        <td>
                            <input type="text" onChange={this.addNewDetailRow}/>
                        </td>
                        <td>
                            <input type="text" onChange={this.addNewDetailRow}/>
                        </td>
                    </tr>

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