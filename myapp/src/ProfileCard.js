import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ name, studentId, major, message = '안녕하세요! React 컴포넌트를 배우고 있는 학생입니다.' }) {
  // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = () => {
    setLikeCount((c) => c + 1);
  };

  return (
    <div className="profile-card">
      <div className="avatar" aria-hidden="true">{name ? name[0] : '🙂'}</div>

      <div className="info">
        <h2 className="name">{name}</h2>
        <p className="meta">학번: {studentId} · 전공: {major}</p>
        <p className="message">{message}</p>
      </div>

      <button className="like-btn" onClick={handleLike} aria-label="좋아요">
        👍 좋아요
      </button>
      <div className="like-count" role="status">좋아요 {likeCount}개</div>
    </div>
  );
}

export default ProfileCard;
