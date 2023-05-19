import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    userName: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const userName = await getUser();
    this.setState({ loading: false, userName });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : (
              (<p data-testid="header-user-name">{userName.name}</p>)
            )
        }
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>

    );
  }
}

export default Header;
