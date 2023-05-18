import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchText: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchText } = this.state;
    const n2 = 2;
    const isDisabled = searchText.length < n2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searchText"
            value={ searchText }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
          />
          <button
            type="submit"
            name="searchBtn"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
