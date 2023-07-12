import React from "react";
import { Link ,useParams} from "react-router-dom";
import Avator from "../../components/Avator/Avator";
import moment from "moment";
import { useSelector,useDispatch } from "react-redux";
import {deleteAnswer} from '../../actions/question'

export default function DisplayAnswers(props) {
  const dispatch = useDispatch()
  const { id } = useParams();
  const User = useSelector((state) => state.currentUserReducer);
  const handleDelete =(answerId , noOfAnswers) =>{
   dispatch(deleteAnswer(id ,answerId ,noOfAnswers - 1))  
  }
  return (
    <div>
      {props.question.answer?.map((ans, index) => (
        <div key={index} className=" display-ans">
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick = {props.handleShare}>Share</button>
              {
                            User?.result?._id === ans?.userId && (
                            <button type="button" onClick = {() => handleDelete(ans._id , props.question.noOfAnswers)}>Delete</button>)
              }
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avator backgroundColor="green" px="8px" py="5px">
                  {" "}
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avator>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}