
import './App.css';
import { useState, useEffect } from "react"; // 🔧 수정: useEffect import 추가
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

  // 🆕 과제: 기록 초기화 함수
  const clearHistory = () => {
    setHistory([]); // 기록 배열을 빈 배열로 초기화
  };

  // 🆕 과제: 소수점 연산 정확도 개선 함수
  const fixFloatingPoint = (num) => {
    // JavaScript의 부동소수점 연산 오류를 수정
    // 예: 0.1 + 0.2 = 0.30000000000000004 → 0.3
    return Math.round((num + Number.EPSILON) * 100000000) / 100000000;
  };

  // 버튼 클릭을 처리하는 이벤트 핸들러 함수
  const handleClick = (value) => {
    // C 버튼 처리 (초기화)
    if (value === "C") {
      // setState 함수로 input 상태를 빈 문자열로 초기화
      setInput("");
      return; // 함수 실행 종료
    }

    // 🆕 과제: % 연산자 처리 추가
    if (value === "%") {
      // % 연산자를 입력에 추가
      setInput(prev => prev + "%");
      return;
    }

    // = 버튼 처리 (계산 실행)
    if (value === "=") {
      if (!input.trim()) return; // 🆕 개선: 빈 입력값 무시
      
      try {
        // 🆕 과제: % 연산 처리
        let expression = input;
        
        // % 를 JavaScript의 나머지 연산자로 그대로 사용
        // 예: 200 % 50 = 0 (나머지 계산)
        
        // eval() 함수로 문자열 수식을 계산 (학습용으로만 사용, 실무에서는 보안상 위험)
        let result = eval(expression);
        
        // 🆕 과제: 소수점 정확도 개선 적용
        result = fixFloatingPoint(result);
        
        const resultString = result.toString(); // 결과를 문자열로 변환
        
        // 🆕 과제: 계산 기록을 history 배열에 추가 (최근 5개만 유지)
        // 함수형 업데이트: 이전 상태(prev)를 받아 새로운 상태 반환
        // 스프레드 연산자(...)로 기존 배열을 펼치고 새 기록을 맨 앞에 추가
        // slice(0, 5)로 최근 5개 기록만 유지
        setHistory(prev => [input + " = " + resultString, ...prev].slice(0, 5));
        
        // 계산 결과를 input 상태에 저장
        setInput(resultString);
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

  // 🆕 과제: 키보드 입력 지원 추가
  // useEffect Hook: 컴포넌트가 마운트된 후 실행되는 부수 효과(side effect) 처리
  useEffect(() => {
    // 키보드 이벤트 처리 함수
    const handleKeyPress = (event) => {
      const key = event.key;
      
      // 숫자와 연산자 처리 (%, 추가)
      if (/[0-9+\-*/.%]/.test(key)) {
        handleClick(key);
      }
      // Enter키나 =키로 계산 실행
      else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // 기본 동작 방지
        handleClick('=');
      }
      // Escape나 Delete키로 초기화
      else if (key === 'Escape' || key === 'Delete') {
        handleClick('C');
      }
      // Backspace로 마지막 문자 삭제
      else if (key === 'Backspace') {
        event.preventDefault();
        setInput(prev => prev.slice(0, -1)); // 마지막 문자 제거
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyPress);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
    // cleanup 함수: useEffect에서 반환하는 함수
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClick]); // 🔧 수정: handleClick을 의존성 배열에 추가

  // JSX 반환 - 컴포넌트가 렌더링할 UI 구조
  return (
    <div className="container">
      {/* HTML h1 태그와 동일하지만 JSX 문법 */}
      <h1>React 계산기</h1>
      
      {/* 🆕 과제: 키보드 사용법 안내 */}
      <div style={{
        fontSize: "12px", 
        color: "#666", 
        marginBottom: "10px",
        padding: "8px",
        backgroundColor: "#f0f8ff",
        borderRadius: "4px"
      }}>
       
      </div>
      
      {/* Display 컴포넌트에 value prop으로 현재 input 상태값 전달 */}
      <Display value={input || "0"} />
      
      {/* Keypad 컴포넌트에 onKey prop으로 handleClick 함수 전달 */}
      <Keypad onKey={handleClick} />
      
      {/* 🆕 과제: History 컴포넌트에 기록 초기화 함수도 함께 전달 */}
      <History records={history} onClearHistory={clearHistory} />
      
      {/* 조건부 렌더링 - && 연산자 사용 */}
      {/* input이 "Error"일 때만 오류 메시지 표시 */}
      {input === "Error" && (
        // JSX에서 인라인 스타일은 객체 형태로 작성 (camelCase 사용)
        <p style={{color: "red", marginTop: "10px"}}>
          잘못된 수식입니다!
        </p>
      )}
    </div>
  ); // 🔧 수정: 닫는 괄호 추가
}

// App 컴포넌트를 default export로 내보내기 - 다른 파일에서 import 가능
export default App;