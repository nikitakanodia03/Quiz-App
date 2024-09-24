import React, { useState, useContext } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};
const url = '';
const API_ENDPOINT = 'https://opentdb.com/api.php?';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setIsStarted(true);
    setIsError(false);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const { results } = data;
      if (results.length > 0) {
        setQuestions(results);
      } else {
        setIsStarted(false);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setQuiz({ ...quiz, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  const checkAnswer = (response) => {
    if (response) {
      setCorrectAnswers(correctAnswers + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (index < quiz.amount - 1) {
      setIndex(index + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsStarted(false);
    setIsModalOpen(false);
    setIndex(0);
    setCorrectAnswers(0);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        isError,
        handleChange,
        handleSubmit,
        isLoading,
        isStarted,
        isModalOpen,
        questions,
        index,
        correctAnswers,
        checkAnswer,
        nextQuestion,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
