import { useState, useEffect } from "react"; // React의 상태/사이드이펙트 훅을 임포트

export default function TodoApp() { // 기본 내보내기용 함수형 컴포넌트 선언
// 입력값과 할 일 목록 상태 관리
const [text, setText] = useState(""); // 현재 입력창의 텍스트 상태(제어 컴포넌트)
const [priority, setPriority] = useState("medium"); // 새 할 일의 우선순위 상태
const [todos, setTodos] = useState(() => { // 할 일 목록 상태(지연 초기화: 최초 렌더에서만 실행)
const saved = localStorage.getItem("todos"); // 로컬 스토리지에서 기존 목록 문자열을 읽음
return saved ? JSON.parse(saved) : []; // 저장값이 있으면 JSON 파싱, 없으면 빈 배열로 시작
}); // useState 끝

// localStorage 자동 저장
useEffect(() => { // todos가 바뀔 때마다 실행되는 사이드이펙트
localStorage.setItem("todos", JSON.stringify(todos)); // 현재 목록을 문자열로 직렬화하여 저장
}, [todos]); // 의존성 배열: todos 변경시에만 실행

// 할 일 추가 함수
const handleSubmit = (e) => {            // 1) onSubmit 이벤트를 받는 핸들러
  e.preventDefault();                    // 2) 폼의 기본 동작(페이지 새로고침)을 막아 SPA 흐름 유지

  const trimmed = text.trim();           // 3) 입력 상태 `text`의 앞뒤 공백 제거(UX/데이터 정합성)
  if (!trimmed) return;                  // 4) 빈 문자열(혹은 공백만)일 경우 조기 종료로 무의미한 항목 추가 방지

  setTodos([
    ...todos,                            // 5) 기존 배열을 얕은 복사(불변성 유지: 원본 변경 X, 새 배열 생성 O)
    { id: Date.now(), text: trimmed, done: false, priority } // 6) 새 항목 객체 생성 및 배열 끝에 추가 (우선순위 포함)
  ]);

  setText("");                           // 7) 제어 컴포넌트 입력값 초기화 → 다음 입력 준비 & UI 즉시 반영
  setPriority("medium");                 // 8) 우선순위도 기본값으로 초기화
};   

// 완료 상태 토글 함수
const toggleDone = (id) => { // 특정 id를 가진 항목의 완료여부를 토글
setTodos(todos.map(t => // 현재 목록을 순회하며
t.id === id ? { ...t, done: !t.done } : t // id가 일치하면 done 반전, 아니면 그대로 반환
));
}; // toggleDone 끝

// 할 일 삭제 함수
const deleteTodo = (id) => { // 특정 id를 가진 항목을 삭제
setTodos(todos.filter(t => t.id !== id)); // 해당 id가 아닌 항목만 남기는 필터링
}; // deleteTodo 끝

// JSX 렌더링 부분
return ( // 컴포넌트가 화면에 그릴 JSX 반환 시작
<div className="card"> {/* 스타일링을 위한 컨테이너(카드) */}
  <h2>{new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })} 할 일 목록</h2> {/* 오늘 날짜와 제목 표시 */}
  <form onSubmit={handleSubmit}> {/* 제출 시 handleSubmit 호출 */}
   <input
    value={text} // 입력창 값은 text 상태에 바인딩(제어 컴포넌트)
    onChange={e => setText(e.target.value)} // 타이핑할 때마다 상태 업데이트
    placeholder="할 일을 입력하세요" // 안내 문구
   /> {/* input 끝 */}
   <select
    value={priority}
    onChange={e => setPriority(e.target.value)}
    className="priority-select"
   >
    <option value="high">높음 (긴급)</option>
    <option value="medium">중간 (보통)</option>
    <option value="low">낮음 (나중에)</option>
   </select>
   <button type="submit">추가</button> {/* 할 일 추가 버튼 */}
  </form> {/* form 끝 */}
  <ul> {/* 할 일 목록 컨테이너 */}
   {todos.map((t) => ( // todos 배열을 순회하여 항목 렌더링
    <li
     key={t.id}
     className={`todo-item ${t.priority || 'medium'}-priority`}
     style={{
       textDecoration: t.done ? "line-through" : "none",
       opacity: t.done ? 0.6 : 1
     }}
    > {/* 완료 시 취소선, 미완료 시 평문 */}
     <input type="checkbox" checked={t.done} onChange={() =>
toggleDone(t.id)} /> {/* 체크박스로 완료여부 토글 */}
     <span className="todo-text">{t.text}</span> {/* 할 일 텍스트 본문 */}
     <span className={`priority-badge ${t.priority || 'medium'}-badge`}>
      {t.priority === 'high' ? '높음' : t.priority === 'low' ? '낮음' : '중간'}
     </span>
     <button onClick={() => deleteTodo(t.id)}>삭제</button> {/* 해당 항목 삭제 */}
    </li> // li 끝
   ))} {/* map 끝 */}
  </ul> {/* 목록 끝 */}
  <p>남은 할 일: {todos.filter(t => !t.done).length}</p> {/* 미완료 항목 개수 표시 */}
</div> // 컨테이너 끝
); // JSX 반환 끝
} // 컴포넌트 정의 끝
