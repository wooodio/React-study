// Display 컴포넌트 - 계산기 화면을 담당하는 함수형 컴포넌트
export default function Display({ value }) { // props로 value를 비구조화 할당으로 받음
  return (
    // JSX 반환 - HTML과 유사하지만 className 속성 사용
    <div className="display">
      {/* 중괄호 {}는 JavaScript 표현식을 JSX 내부에 삽입할 때 사용 */}
      {value}
    </div>
  );
}