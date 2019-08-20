import React from 'react';
import './SearchPage.css';
import Offers from "../Offers/Offers";
import SearchBar from "../SearchBar/SearchBar";


class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            offersList: [],
        };
        this.performSearch = this.performSearch.bind(this);
    }


    loadOffersFromServer(reqString) {

        const url = 'http://localhost:8080/api/' + (reqString ? ('offersearch/?'+reqString) : 'offerEs');

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then(response => response.json())
            .then(jsonData => {

                this.setState({offersList: jsonData._embedded.offerEs});
                this.setState({searchField: ''});
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }


    componentDidMount() {
        this.loadOffersFromServer();
    }

    performSearch = (reqString) => {
        //let value = this.state.searchField;
        //
        //if (!value) {
        //    return;
        //}

        this.loadOffersFromServer(reqString);
    };


    render() {
        return (
            <div>
                <SearchBar performSearch={this.performSearch}/>
                <Offers offerList={this.state.offersList}/>
            </div>
        );
    }
}

export default SearchPage;
