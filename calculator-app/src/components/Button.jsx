// Button 컴포넌트 - 재사용 가능한 버튼을 만드는 함수형 컴포넌트
export default function Button({ label, onClick }) { // props에서 label과 onClick을 비구조화 할당으로 추출
  return (
    // onClick 이벤트에 화살표 함수를 사용해 label 값을 전달
    <button className="btn" onClick={() => onClick(label)}>
      {/* 버튼에 표시될 텍스트는 props로 받은 label */}
      {label}
    </button>
  );
}