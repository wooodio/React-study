import React from 'react';
import ProfileCard from './components/ProfileCard';
import Counter from './components/counter';
import LikeToggle from './components/LikeToggle';
import Footer from './components/Footer';
import Header from './components/header';
import Greeter from './components/Greeter';
import './App.css';

function App() {
  return (
    <div className='container'>
      <Header/>
      <Greeter/>
      <ProfileCard
        name="우정균"
        major="인공지능학과"
        interests={['축구', '농구', '코딩']}
      />
      <Counter/>
      <LikeToggle/>
      <Footer/>
    </div>
  );
}

export default App;
