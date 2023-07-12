import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";

export default function HomeMainbar() {
  const User = useSelector((state) => state.currentUserReducer);
  const questionList = useSelector((state) => state.questionReducer);

  const navigate = useNavigate();
  const Location = useLocation();

  const checkMedia = () => {
    if (User === null) {
      alert("Login or Signup to ask a question");
      navigate("/Login");
    } else {
      navigate("/Media");
    }
  };

  const checkAuth = () => {
    if (User === null) {
      alert("Login or Signup to ask a question");
      navigate("/Login");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {Location.pathname === "/" ? (
          <h1>Top Questions </h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Questions
        </button>
        <button style ={{margin : '10px'}} onClick= {checkMedia} className="ask-btn">
          Post Experience
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <h1>Loading......</h1>
        ) : (
          <>
            <p> {questionList.data?.length} Questions </p>
            <QuestionList questionList={questionList.data} />
          </>
        )}
      </div>
    </div>
  );
}