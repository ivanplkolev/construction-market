import React from 'react';
import './FeedBack.css';


class FeedBackElement extends React.Component {

    render() {
        let feedBack = this.props.feedBack;

        return (
            <div key={feedBack.id}>
                <table >
                    <tbody>
                    <tr>
                        <td >
                            Stars:
                        </td>

                        <td >
                            {feedBack.stars}

                        </td>
                    </tr>

                    <tr>
                        <td >
                            Comment:
                        </td>
                        <td >
                            {feedBack.textReview}

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default FeedBackElement;
