import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import FeaturedEvents from '../FeaturedEvents/FeaturedEvenets';
import CategoriesSection from '../Categories/Categories';
import RecentReviews from '../Reviews/RecentReviews';

const Home = () => {
    return (
        <div>
            <SearchBar></SearchBar>
            <FeaturedEvents></FeaturedEvents>
            <CategoriesSection></CategoriesSection>
            <RecentReviews></RecentReviews>
        </div>
    );
};

export default Home;