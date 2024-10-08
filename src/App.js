import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const handleNavigation = (section, level = null, chapter = null) => {
    setCurrentSection(section);
    setCurrentLevel(level);
    setCurrentChapter(chapter);
  };

  return (
    <div className="App">
      <Header onNavigate={() => handleNavigation('home')} />
      <Main 
        currentSection={currentSection} 
        currentLevel={currentLevel} 
        currentChapter={currentChapter}
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

function Main({ currentSection, currentLevel, currentChapter, onNavigate }) {
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
          chapter={currentChapter} 
          onNavigate={onNavigate} 
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
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-basic')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-intermediate')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'c-advanced')}>고급</button>
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
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-basic')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-intermediate')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'python-advanced')}>고급</button>
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
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-basic')}>초급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-intermediate')}>중급</button>
        <button className="level-button" onClick={() => onNavigate('exercise', 'java-advanced')}>고급</button>
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
          {[...Array(5)].map((_, index) => ( 
            <tr key={index}>
              <td>{index + 1}차시</td>
              <td>
                {/* C언어 필수 문법 */}
                {level === 'c-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, char 등"}
                {level === 'c-basic' && index === 1 && "2차시 | 입출력: printf() 및 scanf() 사용법"}
                {level === 'c-basic' && index === 2 && "3차시 | 조건문: if, else 구문 사용법"}
                {level === 'c-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'c-basic' && index === 4 && "5차시 | 배열: 배열 선언 및 사용"}

                {/* Python 필수 문법 */}
                {level === 'python-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, str, list 등"}
                {level === 'python-basic' && index === 1 && "2차시 | 입출력: print() 및 input() 사용법"}
                {level === 'python-basic' && index === 2 && "3차시 | 조건문: if, elif, else 구문 사용법"}
                {level === 'python-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'python-basic' && index === 4 && "5차시 | 리스트: 리스트 기본 사용법"}

                {/* Java 필수 문법 */}
                {level === 'java-basic' && index === 0 && "1차시 | 변수와 데이터 타입: int, float, String 등"}
                {level === 'java-basic' && index === 1 && "2차시 | 입출력: System.out.println() 및 Scanner 사용법"}
                {level === 'java-basic' && index === 2 && "3차시 | 조건문: if, else if, else 구문 사용법"}
                {level === 'java-basic' && index === 3 && "4차시 | 반복문: for, while 사용법"}
                {level === 'java-basic' && index === 4 && "5차시 | 배열: 배열 선언 및 사용"}
                
                {/* C언어 중급 문법 */}
                {level === 'c-intermediate' && index === 0 && "1차시 | 함수: 함수 정의 및 호출 방법"}
                {level === 'c-intermediate' && index === 1 && "2차시 | 포인터: 포인터 기본 개념"}
                {level === 'c-intermediate' && index === 2 && "3차시 | 구조체: 구조체 정의 및 사용법"}
                {level === 'c-intermediate' && index === 3 && "4차시 | 동적 메모리 할당: malloc, free 사용법"}
                {level === 'c-intermediate' && index === 4 && "5차시 | 파일 입출력: 파일 열기 및 쓰기"}

                {/* Python 중급 문법 */}
                {level === 'python-intermediate' && index === 0 && "1차시 | 함수: 함수 정의 및 호출 방법"}
                {level === 'python-intermediate' && index === 1 && "2차시 | 모듈: 모듈 만들기 및 가져오기"}
                {level === 'python-intermediate' && index === 2 && "3차시 | 예외 처리: try, except 사용법"}
                {level === 'python-intermediate' && index === 3 && "4차시 | 리스트 컴프리헨션: 리스트 이해하기"}
                {level === 'python-intermediate' && index === 4 && "5차시 | 파일 입출력: 파일 읽기 및 쓰기"}

                {/* Java 중급 문법 */}
                {level === 'java-intermediate' && index === 0 && "1차시 | 메소드: 메소드 정의 및 호출 방법"}
                {level === 'java-intermediate' && index === 1 && "2차시 | 상속: 클래스 상속 및 오버라이딩"}
                {level === 'java-intermediate' && index === 2 && "3차시 | 인터페이스: 인터페이스 정의 및 사용법"}
                {level === 'java-intermediate' && index === 3 && "4차시 | 예외 처리: try, catch 사용법"}
                {level === 'java-intermediate' && index === 4 && "5차시 | 컬렉션: ArrayList 및 HashMap 사용법"}

                {/* C언어 고급 문법 */}
                {level === 'c-advanced' && index === 0 && "1차시 | 고급 데이터 구조: 연결 리스트, 스택, 큐"}
                {level === 'c-advanced' && index === 1 && "2차시 | 알고리즘: 정렬 및 검색 알고리즘 이해하기"}
                {level === 'c-advanced' && index === 2 && "3차시 | 동시성: 쓰레드 개념 및 사용법"}
                {level === 'c-advanced' && index === 3 && "4차시 | 시스템 프로그래밍: 파일 처리 및 프로세스 관리"}
                {level === 'c-advanced' && index === 4 && "5차시 | 네트워킹: 소켓 프로그래밍 기초"}

                {/* Python 고급 문법 */}
                {level === 'python-advanced' && index === 0 && "1차시 | 고급 함수: 람다 함수 및 고차 함수"}
                {level === 'python-advanced' && index === 1 && "2차시 | 데이터베이스: SQLite 사용법"}
                {level === 'python-advanced' && index === 2 && "3차시 | 비동기 프로그래밍: asyncio 사용법"}
                {level === 'python-advanced' && index === 3 && "4차시 | 웹 프로그래밍: Flask 기본 사용법"}
                {level === 'python-advanced' && index === 4 && "5차시 | 데이터 분석: Pandas 기본 사용법"}

                {/* Java 고급 문법 */}
                {level === 'java-advanced' && index === 0 && "1차시 | 고급 클래스: 추상 클래스 및 인터페이스 구현"}
                {level === 'java-advanced' && index === 1 && "2차시 | 예외 처리: 사용자 정의 예외 만들기"}
                {level === 'java-advanced' && index === 2 && "3차시 | 디자인 패턴: Singleton 및 Factory 패턴 이해하기"}
                {level === 'java-advanced' && index === 3 && "4차시 | 멀티스레딩: 스레드 생성 및 동기화"}
                {level === 'java-advanced' && index === 4 && "5차시 | 네트워크 프로그래밍: 클라이언트-서버 모델 이해하기"}
              </td>
              <td>
                <button onClick={() => onNavigate('exercise-content', level)}>문제풀기</button>
                <button style={{ marginLeft: '10px' }}>AI 문제 풀어보기</button> {/* AI 문제 풀어보기 버튼 추가. 시간나면 도전...*/}
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

function ExerciseContentSection({ level, chapter, onNavigate }) {
  return (
    <section>
      <h3>{level ? level.replace('-', ' ') : '문제 풀이 페이지'} - {chapter}차시</h3>
      <p>
        문제: 
        {/* 문제 내용 부분을 비워두었습니다. */}
      </p>
      <textarea placeholder="문제 내용을 입력하세요..." />
      <button onClick={() => {
          alert("정답입니다! 다음 문제 풀기로 이동할까요?");
          onNavigate('exercise-content', level); // 다음 문제로 이동
      }}>문제 제출</button>
      <button onClick={() => onNavigate('exercise')}>이전 페이지로 돌아가기</button>
    </section>
  );
}

export default App;

  );
}

export default App;
