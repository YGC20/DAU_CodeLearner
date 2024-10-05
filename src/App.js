import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLevel, setCurrentLevel] = useState(null);

  const handleNavigation = (section, level = null) => {
    setCurrentSection(section);
    setCurrentLevel(level);
  };

  return (
    <div className="App">
      <Header onNavigate={() => handleNavigation('home')} />
      <Main 
        currentSection={currentSection} 
        currentLevel={currentLevel} 
        onNavigate={handleNavigation} 
      />
      <Footer />
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

function Main({ currentSection, currentLevel, onNavigate }) {
  return (
    <main>
      {currentSection === 'home' && <HomeSection onNavigate={onNavigate} />}
      {currentSection === 'c' && <CSection onNavigate={onNavigate} />}
      {currentSection === 'python' && <PythonSection onNavigate={onNavigate} />}
      {currentSection === 'java' && <JavaSection onNavigate={onNavigate} />}
      {currentSection === 'exercise' && <ExerciseSection level={currentLevel} onNavigate={onNavigate} />}
      {currentSection === 'exercise-content' && <ExerciseContentSection level={currentLevel} />}
    </main>
  );
}

function HomeSection({ onNavigate }) {
  return (
    <section id="home-section">
      <h2>플랫폼 설명 배너</h2>
      <div className="section-button-container">
        <button onClick={() => onNavigate('c')}>C언어</button>
        <button onClick={() => onNavigate('python')}>Python</button>
        <button onClick={() => onNavigate('java')}>Java</button>
      </div>
      <p>각 언어를 선택하여 학습을 시작하세요!</p>
    </section>
  );
}

function CSection({ onNavigate }) {
  return (
    <section id="c-section">
      <h3>C언어</h3>
      <h4>난이도 선택</h4>
      <div>
        <button onClick={() => onNavigate('exercise', 'c-basic')}>초급</button>
        <button onClick={() => onNavigate('exercise', 'c-intermediate')}>중급</button>
        <button onClick={() => onNavigate('exercise', 'c-advanced')}>고급</button>
      </div>
    </section>
  );
}

function PythonSection({ onNavigate }) {
  return (
    <section id="python-section">
      <h3>Python</h3>
      <h4>난이도 선택</h4>
      <div>
        <button onClick={() => onNavigate('exercise', 'python-basic')}>초급</button>
        <button onClick={() => onNavigate('exercise', 'python-intermediate')}>중급</button>
        <button onClick={() => onNavigate('exercise', 'python-advanced')}>고급</button>
      </div>
    </section>
  );
}

function JavaSection({ onNavigate }) {
  return (
    <section id="java-section">
      <h3>Java</h3>
      <h4>난이도 선택</h4>
      <div>
        <button onClick={() => onNavigate('exercise', 'java-basic')}>초급</button>
        <button onClick={() => onNavigate('exercise', 'java-intermediate')}>중급</button>
        <button onClick={() => onNavigate('exercise', 'java-advanced')}>고급</button>
      </div>
    </section>
  );
}

function ExerciseSection({ level, onNavigate }) {
  return (
    <section>
      <h3>{level.replace('-', ' ')} 학습 페이지</h3>
      <table>
        <tbody>
          {[...Array(14)].map((_, index) => (
            <tr key={index}>
              <td>{index + 1}차시</td>
              <td>강의내용</td>
              <td>
                <button onClick={() => onNavigate('exercise-content', level)}>문제풀기</button>
              </td>
              <td>
                <button>학습완료</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ExerciseContentSection({ level }) {
  return (
    <section>
      <h3>{level.replace('-', ' ')} 문제 풀이 페이지</h3>
      <p>여기에 문제를 추가하세요!</p>
      <textarea placeholder="문제 내용을 입력하세요..." />
      <button>문제 제출</button>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p></p>
    </footer>
  );
}

export default App;
