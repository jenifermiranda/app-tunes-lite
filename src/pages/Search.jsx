import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  state = {
    searchText: '',
    artists: [],
    artistName: '',
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchText } = this.state;
    const artists = await searchAlbumsAPI(searchText);
    this.setState({
      artists,
      artistName: searchText,
      searchText: '',
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchText, artists, artistName } = this.state;
    const n2 = 2;
    const isDisabled = searchText.length < n2;
    const albumList = artists.length > 0 && artists.map((artist) => (
      <CardAlbum
        key={ artist.collectionId }
        collectionName={ artist.collectionName }
        collectionId={ artist.collectionId }
        artworkUrl100={ artist.artworkUrl100 }
        artistName={ artist.artistName }
      />
    ));
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {
          artistName !== ''
            && (artists.length > 0 ? (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  {artistName}
                </p>
                {albumList}
              </div>
            )
              : <p>Nenhum álbum foi encontrado</p>)
        }

      </div>
    );
  }
}

export default Search;
