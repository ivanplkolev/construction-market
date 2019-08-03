import React from 'react';
import './Offers.css';

class Offers extends React.Component {

    render() {


        let offersList = this.props.offerList;

        const listItems = offersList.map((o) =>
                <div key={o.id}>
                    <table>
                        <tbody>
                        <tr>
                            <td rowSpan="2">
                                <img src={o.image} alt="MyImage"/>

                            </td>
                            <td >
                                {o.name}
                            </td>
                            <td >
                            </td>
                        </tr>
                        <tr>
                            <td >
                                {o.description}
                            </td>
                            <td >
                                {o.price}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        );
        return (
            <div>
                <h5> Here are the found offers</h5>
                {listItems}
            </div>
        );

    }
}

export default Offers;