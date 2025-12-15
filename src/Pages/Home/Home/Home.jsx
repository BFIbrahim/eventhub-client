import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import FeaturedEvents from '../FeaturedEvents/FeaturedEvenets';
import CategoriesSection from '../Categories/Categories';

const Home = () => {
    return (
        <div>
            <SearchBar></SearchBar>
            <FeaturedEvents></FeaturedEvents>
            <CategoriesSection></CategoriesSection>
        </div>
    );
};

export default Home;