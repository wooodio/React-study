import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import Keypad from "./components/Keypad";
import History from "./components/History";


// 메인 App 컴포넌트 - 전체 애플리케이션의 최상위 컴포넌트
function App() {
  // useState Hook을 사용해 input 상태 변수와 setInput 상태 업데이트 함수 생성
  // 초기값은 빈 문자열("")
  const [input, setInput] = useState("");
  
  // useState Hook을 사용해 history 상태 변수와 setHistory 상태 업데이트 함수 생성
  // 초기값은 빈 배열([])
  const [history, setHistory] = useState([]);

  // 버튼 클릭을 처리하는 이벤트 핸들러 함수
  const handleClick = (value) => {
    // C 버튼 처리 (초기화)
    if (value === "C") {
      // setState 함수로 input 상태를 빈 문자열로 초기화
      setInput("");
      return; // 함수 실행 종료
    }

    // = 버튼 처리 (계산 실행)
    if (value === "=") {
      try {
        // eval() 함수로 문자열 수식을 계산 (학습용으로만 사용, 실무에서는 보안상 위험)
        const result = eval(input).toString(); // 결과를 문자열로 변환
        
        // 계산 기록을 history 배열에 추가
        // 함수형 업데이트: 이전 상태(prev)를 받아 새로운 상태 반환
        // 스프레드 연산자(...)로 기존 배열을 펼치고 새 기록을 맨 앞에 추가
        setHistory(prev => [input + " = " + result, ...prev]);
        
        // 계산 결과를 input 상태에 저장
        setInput(result);
      } catch {
        // try 블록에서 오류 발생 시 catch 블록 실행
        setInput("Error"); // 오류 메시지 표시
      }
      return; // 함수 실행 종료
    }

    // 일반 입력 처리 (숫자, 연산자 등)
    // 함수형 업데이트: 이전 상태값(prev)에 새로운 값(value)을 문자열 연결
    setInput(prev => prev + value);
  };

  // JSX 반환 - 컴포넌트가 렌더링할 UI 구조
  return (
    <div className="container">
      {/* HTML h1 태그와 동일하지만 JSX 문법 */}
      <h1>React 계산기</h1>
      
      {/* Display 컴포넌트에 value prop으로 현재 input 상태값 전달 */}
      <Display value={input} />
      
      {/* Keypad 컴포넌트에 onKey prop으로 handleClick 함수 전달 */}
      <Keypad onKey={handleClick} />
      
      {/* History 컴포넌트에 records prop으로 history 배열 전달 */}
      <History records={history} />
      
      {/* 조건부 렌더링 - && 연산자 사용 */}
      {/* input이 "Error"일 때만 오류 메시지 표시 */}
      {input === "Error" && (
        // JSX에서 인라인 스타일은 객체 형태로 작성 (camelCase 사용)
        <p style={{color: "red", marginTop: "10px"}}>
          잘못된 수식입니다!
        </p>
      )}
    </div>
  );
}

export default App;