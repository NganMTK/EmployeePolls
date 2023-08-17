import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { handAddQuestionAnswer } from "../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  const [answered, setAnswered] = useState(props.answered);
  const [vote1, setVote1] = useState(props.isVotedOp1);
  const [vote2, setVote2] = useState(props.isVotedOp2);

  const {
    id,
    question,
    author,
    avatar,
    optionOneText,
    optionOneVotes,
    optionOnePercentage,
    isVotedOp1,
    optionTwoText,
    optionTwoVotes,
    optionTwoPercentage,
    isVotedOp2,
    dispatch,
  } = props;

  if (!question) {
    return <Navigate to={"/404"} />;
  }
  const handleOptionOne = (e) => {
    if (vote1) {
      setAnswered(false);
      setVote1(false);
    } else {
      setAnswered(true);
      setVote1(true);
      setVote2(false);
      dispatch(handAddQuestionAnswer(id, "optionOne"));
    }
  };

  const handleOptionTwo = (e) => {
    if (vote2) {
      setAnswered(false);
      setVote2(false);
    } else {
      setAnswered(true);
      setVote2(true);
      setVote1(false);
      dispatch(handAddQuestionAnswer(id, "optionTwo"));
    }
  };

  return (
    <div className="poll-container">
      <div className="poll-user">
        <input type="text" value={`Poll by ${author}`}></input>
        <div
          style={{
            width: 250,
            height: 250,
            backgroundImage: `url(${avatar})`,
          }}
        ></div>
        <label>Would you rather</label>
      </div>
      <div className="poll-option">
        <table>
          <tr>
            <th>
              <div className="poll-answer">
                <input
                  style={{ fontSize: 18, backgroundColor: "#8FBC8F" }}
                  type="text"
                  data-testid="option-one"
                  value={optionOneText}
                ></input>
                {answered && vote1 && <span>your voted</span>}
                {answered && (
                  <input
                    type="text"
                    value={`Total: ${optionOneVotes} vote(s) - ${optionOnePercentage}%`}
                  ></input>
                )}
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <input
                type="submit"
                value="Click"
                onClick={(e) => handleOptionOne(e.target.value)}
              ></input>
            </th>
          </tr>
        </table>
        <table>
          <tr>
            <th>
              <div className="poll-answer">
                <input
                  style={{ fontSize: 18, backgroundColor: "#8FBC8F" }}
                  type="text"
                  data-testid="option-two"
                  value={optionTwoText}
                ></input>
                {answered && vote2 && <span>your voted</span>}
                {answered && (
                  <input
                    type="text"
                    value={`Total: ${optionTwoVotes} vote(s) - ${optionTwoPercentage}%`}
                  ></input>
                )}
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <input
                type="submit"
                value="Click"
                onClick={(e) => handleOptionTwo(e.target.value)}
              ></input>
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  try {
    const { id } = props.router.params;
    const question = questions[id];
    const op1Votes = question.optionOne.votes.length;
    const op2Votes = question.optionTwo.votes.length;
    const isVotedOp1 = Object.values(question.optionOne.votes).includes(
      authedUser
    );
    const isVotedOp2 = Object.values(question.optionTwo.votes).includes(
      authedUser
    );
    const answered =
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser);

    return {
      id,
      question,
      answered,
      author: question.author,
      avatar: users[question.author] ? users[question.author].avatarURL : "",
      optionOneText: question.optionOne.text,
      optionOneVotes: op1Votes,
      optionOnePercentage: (op1Votes / Object.keys(users).length) * 100,
      isVotedOp1: isVotedOp1,
      optionTwoText: question.optionTwo.text,
      optionTwoVotes: op2Votes,
      optionTwoPercentage: (op2Votes / Object.keys(users).length) * 100,
      isVotedOp2: isVotedOp2,
      dispatch: props.dispatch,
    };
  } catch (e) {
    <Navigate to={"/404"} />;
  }
};

export default withRouter(connect(mapStateToProps)(Poll));
