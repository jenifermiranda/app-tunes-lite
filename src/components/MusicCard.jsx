import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    loading: false,
  };

  componentDidMount() {
    this.isFavorite();
  }

  isFavorite = () => {
    const { favorites, trackId } = this.props;
    const isFav = favorites.some((fav) => fav.trackId === trackId);
    console.log(favorites);
    this.setState({
      isChecked: isFav,
    });
  };

  handleCkecked = async ({ target: { checked } }) => {
    this.setState({ loading: true });
    const { trackId } = this.props;

    if (checked) {
      await addSong({ trackId });
    } else {
      await removeSong({ trackId });
    }
    this.setState({
      isChecked: checked,
      loading: false,
    });
  };

  render() {
    const { name, audio, trackId } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div>
        <p>{name}</p>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {'  '}
          <code>audio</code>
          .
        </audio>
        {
          loading ? <Loading />
            : (
              <label
                data-testid={ `checkbox-music-${trackId}` }
                htmlFor={ `fav-${trackId}` }
              >
                Favorita
                <input
                  type="checkbox"
                  name="favorite"
                  checked={ isChecked }
                  onChange={ this.handleCkecked }
                  id={ `fav-${trackId}` }
                />
              </label>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,

};

export default MusicCard;
