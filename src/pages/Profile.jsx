import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [usuario, setUsuario] = useState();
  const history = useHistory();

  useEffect(() => {
    const getUserLocalStorage = JSON.parse(localStorage.getItem('user'));
    setUsuario(getUserLocalStorage.email);
  });

  const handleClick = () => {
    localStorage.clear();
    setUserEmail('');
    setLoginState({
      email: '',
      password: '',
    });
    history.push('/');
  };

  return (
    <>
      <Header />
      <p
        data-testid="profile-email"
      >
        { usuario }

      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout

      </button>
      <Footer />
    </>
  );
}

export default Profile;
