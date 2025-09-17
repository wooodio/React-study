import React, { useState } from 'react';
import './ProfileCard.css';

export default function ProfileCard({name,major,interests=[]}){
  return (
    <section className='card'>
      <h2>{name}</h2>
      <p>전공: {major}</p>
      <ul>
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </section>
  )

}
