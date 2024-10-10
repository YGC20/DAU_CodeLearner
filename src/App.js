import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(''); // 현재 언어 상태 추가
  const [currentChapter, setCurrentChapter] = useState(''); // 현재 차시 상태 추가

  const handleNavigation = (section, level = null, language = '', chapter = '') => {
    setCurrentSection(section);
    setCurrentLevel(level);
    setCurrentLanguage(language); // 현재 언어 상태 업데이트
    setCurrentChapter(chapter); // 현재 차시 상태 업데이트
  };

  return (
    <div className="App">
      <Header onNavigate={() => handleNavigation('home')} />
      <Main 
        currentSection={currentSection} 
        currentLevel={currentLevel} 
        currentLanguage={currentLanguage} // 현재 언어 전달
        currentChapter={currentChapter} // 현재 차시 전달
        onNavigate={handleNavigation} 
      />
    </div>
  );
}

function Header({ onNavigate }) {
  return (
    <header>
      <h1 onClick={onNavigate} style={{ cursor: 'pointer' }}>코딩 학습 플랫폼</h1>
    </header>
  );
}

function Main({ currentSection, currentLevel, currentLanguage, currentChapter, onNavigate }) {
  return (
    <main>
      {currentSection === 'login' && <LoginSection onNavigate={onNavigate} />}
      {currentSection === 'home' && <HomeSection onNavigate={onNavigate} />}
      {currentSection === 'c' && <CSection onNavigate={onNavigate} />}
      {currentSection === 'python' && <PythonSection onNavigate={onNavigate} />}
      {currentSection === 'java' && <JavaSection onNavigate={onNavigate} />}
      {currentSection === 'exercise' && 
        <ExerciseSection 
          level={currentLevel} 
          onNavigate={onNavigate} 
        />}
      {currentSection === 'exercise-content' && 
        <ExerciseContentSection 
          level={currentLevel} 
          language={currentLanguage} // 현재 언어 전달
          chapter={currentChapter} // 현재 차시 전달
          onNavigate={onNavigate} // 이전 페이지로 돌아가기 위한 함수 전달
        />}
    </main>
  );
}

function LoginSection({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`로그인 성공! 아이디: ${username}`);
    onNavigate('home'); // 로그인 후 홈으로 이동
  };

  return (
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="아이디" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}

function HomeSection({ onNavigate }) {
  return (
    <section id="home-section">
      <button onClick={() => onNavigate('login')} className="login-button" style={{ marginBottom: '20px' }}>
        로그인
      </button>
      <h2>학습할 언어를 골라주세요</h2>
      <div className="section-button-container">
        <button onClick={() => onNavigate('c')} className="language-button">C언어</button>
        <button onClick={() => onNavigate('python')} className="language-button">Python</button>
        <button onClick={() => onNavigate('java')} className="language-button">Java</button>
      </div>
    </section>
  );
}

function CSection({ onNavigate }) {
  return (
    <section id="c-section">
      <h3>C언어</h3>
      <h4>난이도 선택</h4>
      <div className="level-button-container">
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-basic', 'C언어', '1차시')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-intermediate', 'C언어', '2차시')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-advanced', 'C언어', '3차시')}>고급</button>
      </div>
      <button onClick={() => onNavigate('home')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

function PythonSection({ onNavigate }) {
  return (
    <section id="python-section">
      <h3>Python</h3>
      <h4>난이도 선택</h4>
      <div className="level-button-container">
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-basic', 'Python', '1차시')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-intermediate', 'Python', '2차시')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-advanced', 'Python', '3차시')}>고급</button>
      </div>
      <button onClick={() => onNavigate('home')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

function JavaSection({ onNavigate }) {
  return (
    <section id="java-section">
      <h3>Java</h3>
      <h4>난이도 선택</h4>
      <div className="level-button-container">
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-basic', 'Java', '1차시')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-intermediate', 'Java', '2차시')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-advanced', 'Java', '3차시')}>고급</button>
      </div>
      <button onClick={() => onNavigate('home')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

function ExerciseSection({ level, onNavigate }) {
  return (
    <section>
      <h3>{level ? level.replace('-', ' ') : '학습 페이지'}</h3>
      <table>
        <tbody>
          {/* C언어 필수 문법 */}
          {[...Array(15)].map((_, index) => (
            <tr key={index}>
              <td>{index + 1}차시</td>
              <td>
                {level === 'c-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, char 등"}
                {level === 'c-basic' && index === 1 && "2차시 | 입출력: printf() 및 scanf() 사용법"}
                {level === 'c-basic' && index === 2 && "3차시 | 조건문: if, else 구문 사용법"}
                {level === 'c-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'c-basic' && index === 4 && "5차시 | 배열: 배열 선언 및 사용"}
                {level === 'c-basic' && index === 5 && "6차시 | 함수: 함수 정의 및 호출 방법"}
                {level === 'c-basic' && index === 6 && "7차시 | 포인터: 포인터 기본 개념"}
                {level === 'c-basic' && index === 7 && "8차시 | 구조체: 구조체 정의 및 사용법"}
                {level === 'c-basic' && index === 8 && "9차시 | 동적 메모리 할당: malloc, free 사용법"}
                {level === 'c-basic' && index === 9 && "10차시 | 문자열: 문자열 처리 및 사용법"}
                {level === 'c-basic' && index === 10 && "11차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-basic' && index === 11 && "12차시 | 전처리기: 전처리기 사용법"}
                {level === 'c-basic' && index === 12 && "13차시 | 비트 연산: 비트 연산자 사용법"}
                {level === 'c-basic' && index === 13 && "14차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-basic' && index === 14 && "15차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}

                {/* C언어 중급 문법 */}
                {level === 'c-intermediate' && index === 0 && "1차시 | 함수: 함수 정의 및 호출 방법"}
                {level === 'c-intermediate' && index === 1 && "2차시 | 포인터: 포인터 기본 개념"}
                {level === 'c-intermediate' && index === 2 && "3차시 | 구조체: 구조체 정의 및 사용법"}
                {level === 'c-intermediate' && index === 3 && "4차시 | 동적 메모리 할당: malloc, free 사용법"}
                {level === 'c-intermediate' && index === 4 && "5차시 | 파일 입출력: 파일 열기 및 쓰기"}
                {level === 'c-intermediate' && index === 5 && "6차시 | 메모리 관리: 포인터 및 동적 메모리 관리"}
                {level === 'c-intermediate' && index === 6 && "7차시 | 다중 파일: 다중 파일 관리 및 사용"}
                {level === 'c-intermediate' && index === 7 && "8차시 | 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-intermediate' && index === 8 && "9차시 | 함수 포인터: 함수 포인터 사용법"}
                {level === 'c-intermediate' && index === 9 && "10차시 | C언어 라이브러리: stdlib.h 사용법"}
                {level === 'c-intermediate' && index === 10 && "11차시 | 메모리 할당: calloc, realloc 사용법"}
                {level === 'c-intermediate' && index === 11 && "12차시 | 전처리기: 전처리기 사용법"}
                {level === 'c-intermediate' && index === 12 && "13차시 | 비트 연산: 비트 연산자 사용법"}
                {level === 'c-intermediate' && index === 13 && "14차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-intermediate' && index === 14 && "15차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}

                {/* C언어 고급 문법 */}
                {level === 'c-advanced' && index === 0 && "1차시 | 고급 데이터 구조: 연결 리스트, 스택, 큐"}
                {level === 'c-advanced' && index === 1 && "2차시 | 알고리즘: 정렬 및 검색 알고리즘 이해하기"}
                {level === 'c-advanced' && index === 2 && "3차시 | 동시성: 쓰레드 개념 및 사용법"}
                {level === 'c-advanced' && index === 3 && "4차시 | 시스템 프로그래밍: 파일 처리 및 프로세스 관리"}
                {level === 'c-advanced' && index === 4 && "5차시 | 네트워킹: 소켓 프로그래밍 기초"}
                {level === 'c-advanced' && index === 5 && "6차시 | C언어 라이브러리: stdlib.h 사용법"}
                {level === 'c-advanced' && index === 6 && "7차시 | 다중 파일: 다중 파일 관리 및 사용"}
                {level === 'c-advanced' && index === 7 && "8차시 | 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-advanced' && index === 8 && "9차시 | 함수 포인터: 함수 포인터 사용법"}
                {level === 'c-advanced' && index === 9 && "10차시 | 메모리 할당: calloc, realloc 사용법"}
                {level === 'c-advanced' && index === 10 && "11차시 | 전처리기: 전처리기 사용법"}
                {level === 'c-advanced' && index === 11 && "12차시 | 비트 연산: 비트 연산자 사용법"}
                {level === 'c-advanced' && index === 12 && "13차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'c-advanced' && index === 13 && "14차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}
                {level === 'c-advanced' && index === 14 && "15차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}

                {/* Python 필수 문법 */}
                {level === 'python-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, str, list 등"}
                {level === 'python-basic' && index === 1 && "2차시 | 입출력: print() 및 input() 사용법"}
                {level === 'python-basic' && index === 2 && "3차시 | 조건문: if, elif, else 구문 사용법"}
                {level === 'python-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'python-basic' && index === 4 && "5차시 | 리스트: 리스트 기본 사용법"}
                {level === 'python-basic' && index === 5 && "6차시 | 함수: 함수 정의 및 호출 방법"}
                {level === 'python-basic' && index === 6 && "7차시 | 모듈: 모듈 만들기 및 가져오기"}
                {level === 'python-basic' && index === 7 && "8차시 | 예외 처리: try, except 사용법"}
                {level === 'python-basic' && index === 8 && "9차시 | 파일 입출력: 파일 읽기 및 쓰기"}
                {level === 'python-basic' && index === 9 && "10차시 | 리스트 컴프리헨션: 리스트 이해하기"}
                {level === 'python-basic' && index === 10 && "11차시 | 문자열 처리: 문자열 기본 사용법"}
                {level === 'python-basic' && index === 11 && "12차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'python-basic' && index === 12 && "13차시 | 데이터베이스: SQLite 사용법"}
                {level === 'python-basic' && index === 13 && "14차시 | 비동기 프로그래밍: asyncio 사용법"}
                {level === 'python-basic' && index === 14 && "15차시 | 웹 프로그래밍: Flask 기본 사용법"}

                {/* Python 중급 문법 */}
                {level === 'python-intermediate' && index === 0 && "1차시 | 클래스와 객체: 객체 지향 프로그래밍의 기초"}
                {level === 'python-intermediate' && index === 1 && "2차시 | 상속: 클래스 상속 및 메소드 오버라이딩"}
                {level === 'python-intermediate' && index === 2 && "3차시 | 인터페이스: 인터페이스 정의 및 사용법"}
                {level === 'python-intermediate' && index === 3 && "4차시 | 예외 처리: try, catch 사용법"}
                {level === 'python-intermediate' && index === 4 && "5차시 | 파일 처리: 파일 읽기 및 쓰기"}
                {level === 'python-intermediate' && index === 5 && "6차시 | 모듈: 모듈 만들기 및 가져오기"}
                {level === 'python-intermediate' && index === 6 && "7차시 | 데이터베이스: SQLite 사용법"}
                {level === 'python-intermediate' && index === 7 && "8차시 | 비동기 프로그래밍: asyncio 사용법"}
                {level === 'python-intermediate' && index === 8 && "9차시 | 웹 프로그래밍: Flask 기본 사용법"}
                {level === 'python-intermediate' && index === 9 && "10차시 | 데이터베이스: SQLAlchemy 사용법"}
                {level === 'python-intermediate' && index === 10 && "11차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'python-intermediate' && index === 11 && "12차시 | 데이터 구조: 리스트, 딕셔너리, 세트 사용법"}
                {level === 'python-intermediate' && index === 12 && "13차시 | 비동기 프로그래밍: asyncio 사용법"}
                {level === 'python-intermediate' && index === 13 && "14차시 | API 사용: REST API 호출하기"}
                {level === 'python-intermediate' && index === 14 && "15차시 | 웹 스크래핑: Beautiful Soup 사용법"}

                {/* Python 고급 문법 */}
                {level === 'python-advanced' && index === 0 && "1차시 | 고급 데이터 구조: 연결 리스트, 스택, 큐"}
                {level === 'python-advanced' && index === 1 && "2차시 | 알고리즘: 정렬 및 검색 알고리즘 이해하기"}
                {level === 'python-advanced' && index === 2 && "3차시 | 동시성: 쓰레드 개념 및 사용법"}
                {level === 'python-advanced' && index === 3 && "4차시 | 시스템 프로그래밍: 파일 처리 및 프로세스 관리"}
                {level === 'python-advanced' && index === 4 && "5차시 | 네트워킹: 소켓 프로그래밍 기초"}
                {level === 'python-advanced' && index === 5 && "6차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}
                {level === 'python-advanced' && index === 6 && "7차시 | 다중 파일: 다중 파일 관리 및 사용"}
                {level === 'python-advanced' && index === 7 && "8차시 | 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'python-advanced' && index === 8 && "9차시 | 함수 포인터: 함수 포인터 사용법"}
                {level === 'python-advanced' && index === 9 && "10차시 | 메모리 할당: calloc, realloc 사용법"}
                {level === 'python-advanced' && index === 10 && "11차시 | 전처리기: 전처리기 사용법"}
                {level === 'python-advanced' && index === 11 && "12차시 | 비트 연산: 비트 연산자 사용법"}
                {level === 'python-advanced' && index === 12 && "13차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'python-advanced' && index === 13 && "14차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}

                {/* Java 필수 문법 */}
                {level === 'java-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, String 등"}
                {level === 'java-basic' && index === 1 && "2차시 | 입출력: System.out.println() 및 Scanner 사용법"}
                {level === 'java-basic' && index === 2 && "3차시 | 조건문: if, else 구문 사용법"}
                {level === 'java-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'java-basic' && index === 4 && "5차시 | 배열: 배열 선언 및 사용"}
                {level === 'java-basic' && index === 5 && "6차시 | 메서드: 메서드 정의 및 호출 방법"}
                {level === 'java-basic' && index === 6 && "7차시 | 예외 처리: try, catch 사용법"}
                {level === 'java-basic' && index === 7 && "8차시 | 클래스: 클래스 정의 및 객체 생성"}
                {level === 'java-basic' && index === 8 && "9차시 | 상속: 상속의 개념과 사용법"}
                {level === 'java-basic' && index === 9 && "10차시 | 인터페이스: 인터페이스 정의 및 사용법"}
                {level === 'java-basic' && index === 10 && "11차시 | 파일 입출력: 파일 읽기 및 쓰기"}
                {level === 'java-basic' && index === 11 && "12차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'java-basic' && index === 12 && "13차시 | 멀티스레딩: 스레드 개념 및 사용법"}
                {level === 'java-basic' && index === 13 && "14차시 | 데이터베이스: JDBC 사용법"}
                {level === 'java-basic' && index === 14 && "15차시 | 네트워킹: 소켓 프로그래밍 기초"}

                {/* Java 중급 문법 */}
                {level === 'java-intermediate' && index === 0 && "1차시 | 클래스와 객체: 객체 지향 프로그래밍의 기초"}
                {level === 'java-intermediate' && index === 1 && "2차시 | 상속: 클래스 상속 및 메소드 오버라이딩"}
                {level === 'java-intermediate' && index === 2 && "3차시 | 인터페이스: 인터페이스 정의 및 사용법"}
                {level === 'java-intermediate' && index === 3 && "4차시 | 예외 처리: try, catch 사용법"}
                {level === 'java-intermediate' && index === 4 && "5차시 | 파일 처리: 파일 읽기 및 쓰기"}
                {level === 'java-intermediate' && index === 5 && "6차시 | 다중 파일: 다중 파일 관리 및 사용"}
                {level === 'java-intermediate' && index === 6 && "7차시 | 데이터베이스: JDBC 사용법"}
                {level === 'java-intermediate' && index === 7 && "8차시 | 멀티스레딩: 스레드 개념 및 사용법"}
                {level === 'java-intermediate' && index === 8 && "9차시 | 데이터베이스: SQLAlchemy 사용법"}
                {level === 'java-intermediate' && index === 9 && "10차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'java-intermediate' && index === 10 && "11차시 | 동시성: 동시성 프로그래밍 개념"}
                {level === 'java-intermediate' && index === 11 && "12차시 | API 사용: REST API 호출하기"}
                {level === 'java-intermediate' && index === 12 && "13차시 | 비동기 프로그래밍: CompletableFuture 사용법"}
                {level === 'java-intermediate' && index === 13 && "14차시 | 디자인 패턴: MVC 패턴 이해하기"}
                {level === 'java-intermediate' && index === 14 && "15차시 | 소프트웨어 설계: 설계 원칙 이해하기"}

                {/* Java 고급 문법 */}
                {level === 'java-advanced' && index === 0 && "1차시 | 고급 데이터 구조: 연결 리스트, 스택, 큐"}
                {level === 'java-advanced' && index === 1 && "2차시 | 알고리즘: 정렬 및 검색 알고리즘 이해하기"}
                {level === 'java-advanced' && index === 2 && "3차시 | 동시성: 쓰레드 개념 및 사용법"}
                {level === 'java-advanced' && index === 3 && "4차시 | 시스템 프로그래밍: 파일 처리 및 프로세스 관리"}
                {level === 'java-advanced' && index === 4 && "5차시 | 네트워킹: 소켓 프로그래밍 기초"}
                {level === 'java-advanced' && index === 5 && "6차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}
                {level === 'java-advanced' && index === 6 && "7차시 | 다중 파일: 다중 파일 관리 및 사용"}
                {level === 'java-advanced' && index === 7 && "8차시 | 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'java-advanced' && index === 8 && "9차시 | 함수 포인터: 함수 포인터 사용법"}
                {level === 'java-advanced' && index === 9 && "10차시 | 메모리 할당: calloc, realloc 사용법"}
                {level === 'java-advanced' && index === 10 && "11차시 | 전처리기: 전처리기 사용법"}
                {level === 'java-advanced' && index === 11 && "12차시 | 비트 연산: 비트 연산자 사용법"}
                {level === 'java-advanced' && index === 12 && "13차시 | 기본 알고리즘: 정렬 및 검색 알고리즘"}
                {level === 'java-advanced' && index === 13 && "14차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}
                {level === 'java-advanced' && index === 14 && "15차시 | 고급 알고리즘: 그래프 탐색 알고리즘"}
              </td>
              <td>
                <button onClick={() => onNavigate('exercise-content', level,`${index + 1}차시`)}>문제풀기</button>
              </td>
              <td>
                <span>학습전</span> {/* 학습 전 상태 표시 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => onNavigate('home')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

function ExerciseContentSection({ level, language, chapter, onNavigate }) {
  return (
    <section>
      <h3>{`${language} ${level.replace('-', ' ')} ${chapter}`}</h3>
      {chapter === '1차시' && (
        <div>
          <h4>4지선다형 문제</h4>
          <p>문제를 풀어보세요.</p>
          <ul>
            <li>
              <button onClick={() => alert('정답입니다!')}>정답 1</button>
            </li>
            <li>
              <button onClick={() => alert('오답입니다.')}>오답 2</button>
            </li>
            <li>
              <button onClick={() => alert('오답입니다.')}>오답 3</button>
            </li>
            <li>
              <button onClick={() => alert('오답입니다.')}>오답 4</button>
            </li>
          </ul>
        </div>
      )}
      <button onClick={() => onNavigate('exercise')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

export default App;
