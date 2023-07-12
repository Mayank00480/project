import React, { useState } from "react";
import "./QuestionDetails.css";
import { useParams, Link, useNavigate,useLocation } from "react-router-dom";
import moment from 'moment'
import copy from 'copy-to-clipboard'
import Avator from "../../components/Avator/Avator";
import up from "../../Assets/UpVote.svg";
import Down from "../../Assets/DownVote.svg";
import { useSelector, useDispatch } from "react-redux";
import DisplayAnswers from "./DisplayAnswers";
import { postAnswer,deleteQuestion,voteQuestion } from "../../actions/question";
export default function QuestionDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Location = useLocation();
  const url = "http://localhost:3000/"

  const User = useSelector((state) => state.currentUserReducer);
  const questionList = useSelector((state) => state.questionReducer);

  const [Answer, setAnswer] = useState("");

  const handlePosAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("login or signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an Answer Before Submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId : User.result._id
          })
        );
        setAnswer("");
      }
    }
  };
  const handleShare = () =>{
      copy(url + Location.pathname)
      alert("Copied url : " + url+Location.pathname)
  }
  const handleUpVote = () =>{
    dispatch(voteQuestion(id , 'upVote' , User.result._id))
  }
  const handleDownVote = () =>{
    dispatch(voteQuestion(id , 'downVote' , User.result._id))
  }
const handleDelete = () =>{
    dispatch(deleteQuestion(id , Navigate))
}
  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id == id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img src={up} alt="upvotes" onClick = {handleUpVote} className = "votes"/>
                      <p>{question.upVote.length - question.downVote.length }</p>
                      <img src={Down} alt="downvotes" className = "votes" onClick = {handleDownVote}/>
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tags, index) => (
                          <p key={index}>{tags}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick = {handleShare}>Share</button>
                          {
                            User?.result?._id === question?.userId && (
                            <button type="button" onClick = {handleDelete}>Delete</button>)
                            }
                        </div>
                        <div>
                          <p>asked {moment(question.AskedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avator backgroundColor="Orange" px="8px" py="5px">
                              {" "}
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avator>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} answers</h3>
                    <DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePosAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      value={Answer}
                      rows="10"
                      cols="30"
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <input
                      type="submit"
                      value="Post Your Answer"
                      className="post-ans-btn"
                    />
                  </form>
                  <p>
                    Browse Other Question Tagged
                    {question.questionTags.map((tags, index) => (
                      <Link to="/Tags" key={index} className="ans-tags">
                        {tags}{" "}
                      </Link>
                    ))}{" "}
                    or{" "}
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      Ask Your Own Question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}