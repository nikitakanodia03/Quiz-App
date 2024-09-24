import React from 'react';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    isStarted,
    isLoading,
    questions,
    index,
    correctAnswers,
    checkAnswer,
    nextQuestion,
  } = useGlobalContext();

  if (!isStarted) return <SetupForm />;
  if (isLoading) return <Loading />;

  const curQuestion = questions[index];
  const { question, correct_answer, incorrect_answers } = curQuestion;
  const tempIndex = Math.floor(Math.random() * 4);
  let j = 0,
    options = [];
  options[tempIndex] = correct_answer;
  for (let i = 0; i < 4; i++) {
    if (i === tempIndex) {
      continue;
    } else {
      options[i] = incorrect_answers[j++];
    }
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <div className="container">
          <p className="correct-answers">
            Correct Answers : {correctAnswers}/{questions.length}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          {options.map((option) => {
            return (
              <button
                className="btn answer-btn"
                dangerouslySetInnerHTML={{ __html: option }}
                onClick={() => checkAnswer(option === correct_answer)}
              />
            );
          })}
          <button className="btn next-question" onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
