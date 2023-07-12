import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionList }) => {
  return (
    <div>
      {questionList?.map((question, index) => (
        <Questions question={question} key={index} />
      ))}
    </div>
  );
};

export default QuestionList;