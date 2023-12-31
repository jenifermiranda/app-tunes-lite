import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artists: [],
    songs: [],
    loading: true,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const artists = await getMusics(id);
    this.setState({
      artists,
      songs: artists.filter((song) => song.wrapperType !== 'collection'),
      loading: false,
    });

    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      loading: false,
    });
  };

  render() {
    const { artists, songs, loading, favorites } = this.state;
    const songsList = songs.map((song) => (
      <MusicCard
        key={ song.trackNumber }
        name={ song.trackName }
        audio={ song.previewUrl }
        favorites={ favorites }
        trackId={ song.trackId }
      />
    ));
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading />
            : (
              <>
                <p data-testid="artist-name">{artists[0].artistName}</p>
                <p data-testid="album-name">{artists[0].collectionName}</p>
                {songsList}
              </>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
