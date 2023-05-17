import React from 'react';
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
    console.log({ userName });
    return (
      <header data-testid="header-component">
        Header
        {
          loading ? <Loading />
            : (
              (<p data-testid="header-user-name">{userName.name}</p>)
            )
        }
      </header>

    );
  }
}

export default Header;
