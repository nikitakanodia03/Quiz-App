import React from 'react';
import { useGlobalContext } from './context';

const Modal = () => {
  const { isModalOpen, correctAnswers, quiz, closeModal } = useGlobalContext();
  const correctPercentage = Math.round((correctAnswers / quiz.amount) * 100);

  return (
    <div className={`modal-container ${isModalOpen ? 'isOpen' : ''}`}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>You ansewered {correctPercentage}% of questions correctly</p>
        <button className="btn close-btn" onClick={closeModal}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
