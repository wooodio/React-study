import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
  return (
    <div style={{ padding: 24 }}>
      <ProfileCard
        name="우정균"
        studentId="2022108145"
        major="인공지능학과"
        message="안녕하세요! React 컴포넌트를 배우고 있는 우정균입니다."
      />
    </div>
  );
}

export default App;
