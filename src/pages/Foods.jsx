import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div className="foods">
      <Header />
      <RecipeCard />
      <Footer />
    </div>
  );
}

export default Foods;
