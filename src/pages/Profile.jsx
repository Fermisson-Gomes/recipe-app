import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Context';

function Profile() {
  const { setLoginState } = useContext(Context);
  const [usuario, setUsuario] = useState();
  const history = useHistory();

  useEffect(() => {
    const getUserLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (getUserLocalStorage) {
      const { email } = getUserLocalStorage;
      setUsuario(email);
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
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
