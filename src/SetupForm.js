import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, isError } = useGlobalContext();

  return (
    <main>
      <article className="quiz quiz-small">
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>Setup Quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input"
              min={1}
              max={50}
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              className="form-input"
              name="category"
              id="category"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">Select Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {isError ? (
            <p className="error">
              Can't load the questions. Please try some other questions
            </p>
          ) : (
            ''
          )}
          <button className="btn submit-btn">Start</button>
        </form>
      </article>
    </main>
  );
};

export default SetupForm;
