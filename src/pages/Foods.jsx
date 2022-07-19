import React from 'react';
import Header from '../components/Header';
// import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Foods() {
  return (
    <div className="foods">
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
