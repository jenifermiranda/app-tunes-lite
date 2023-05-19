import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { collectionName, collectionId, artworkUrl100, artistName } = this.props;
    console.log(`/album/${collectionId}`);
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2>{collectionName}</h2>
        <h3>{artistName}</h3>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Detalhes

        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default CardAlbum;
