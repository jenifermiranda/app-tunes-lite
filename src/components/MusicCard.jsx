import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { name, audio } = this.props;
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
      </div>
    );
  }
}

export default MusicCard;
