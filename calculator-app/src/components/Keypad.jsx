import Button from './Button';

export default function Keypad({ onKey }) { // props로 onKey 함수를 받음
  // 숫자 버튼 배열 정의 - JavaScript 배열
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "C"];
  // 연산자 버튼 배열 정의
  const operators = ["+", "-", "*", "/", "="];
  
  return (
    // JSX Fragment 대신 div로 감싸기 (JSX는 하나의 부모 요소가 필요)
    <div className="keypad">
      {/* 숫자 버튼들을 담는 영역 */}
      <div className="numbers">
        {/* map 메서드로 numbers 배열을 Button 컴포넌트들로 변환 */}
        {numbers.map(n => (
          <Button
            key={n} // 각 Button에 고유한 key 속성 부여
            label={n} // Button 컴포넌트에 label prop 전달
            onClick={onKey} // Button 컴포넌트에 onClick prop 전달
          />
        ))}
      </div>
      {/* 연산자 버튼들을 담는 영역 */}
      <div className="operators">
        {/* map 메서드로 operators 배열을 Button 컴포넌트들로 변환 */}
        {operators.map(o => (
          <Button
            key={o} // 각 Button에 고유한 key 속성 부여
            label={o} // Button 컴포넌트에 label prop 전달
            onClick={onKey} // Button 컴포넌트에 onClick prop 전달
          />
        ))}
      </div>
    </div>
  );
}