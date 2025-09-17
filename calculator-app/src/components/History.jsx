// History 컴포넌트 - 계산 기록을 표시하는 함수형 컴포넌트  
export default function History({ records }) { // props로 records 배열을 받음
  return (
    <div>
      <h3>계산 기록</h3>
      {/* 순서없는 목록(ul)을 사용해 기록들을 나열 */}
      <ul>
        {/* 배열의 map 메서드를 사용한 리스트 렌더링 */}
        {records.map((record, index) => (
          // 각 li 요소에는 고유한 key 속성이 필요 (React의 가상 DOM 최적화를 위해)
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
}