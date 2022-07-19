import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Context';

function Profile() {
  const { userEmail, setUserEmail, setLoginState } = useContext(Context);
  const history = useHistory();

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
        { userEmail }

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
