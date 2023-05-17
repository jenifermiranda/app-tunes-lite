import React from 'react';

class Header extends React.Component {
  state = {
    nameLogin: '',
    loading: false,
  };

  GetUserName = async () => {
    this.setState({ loading: true });
    await createUser(name);
    this.setState({ loading: false });
  };

  render() {
    return (
      <header data-testid="header-component">
        Header
        <p data-testid="header-user-name">{this.GetUserName}</p>
      </header>
    );
  }
}

export default Header;
