import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    render() {

        return (
            <div>
                <section>
                    <label>
                        Searching for:
                        <input type="text"
                               value={this.props.searchField}
                               onChange={this.props.handleSearchFieldChange}/>
                    </label>
                    <button onClick={this.props.performSearch}>Search</button>
                </section>
            </div>
        );

    }
}

export default SearchBar;