import React from 'react';
import './UserProfile.css';

class UserProfile extends React.Component {

    render() {
        let loadedUser = this.props.loadedUser;

        const machinesList = loadedUser.machinesForRent.map((m) =>
                <li key={m.id}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                {m.name}
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {m.description}
                            </td>
                            <td>
                                {m.price}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
        );
        const servicesList = loadedUser.offeringServices.map((s) =>
                <li key={s.id}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                {s.name}
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {s.description}
                            </td>
                            <td>
                                {s.priceRange}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
        );

        const projectRequestsList = loadedUser.projectRequests.map((p) =>
                <li key={p.id}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                {p.name}
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {p.description}
                            </td>
                            <td>
                                {p.priceRange}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
        );


        return (
            <div>
                <h1> This is your user profile </h1>

                <p>Name: {loadedUser.name}</p>

                <p>Surname: {loadedUser.surname}</p>
                <ul>{machinesList}</ul>
                <ul>{servicesList}</ul>
                <ul>{projectRequestsList}</ul>
            </div>
        );

    }
}

export default UserProfile;