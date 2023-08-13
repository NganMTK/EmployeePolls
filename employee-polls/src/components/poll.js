import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handAddQuestionAnswer } from "../actions/questions";
import users from "../reducers/users";

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
  const {
    id,
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
  const navigate = useNavigate();

  const handleOptionOne = (e) => {
    dispatch(handAddQuestionAnswer(id, "optionOne"));
    navigate("/dashboard");
  };

  const handleOptionTwo = (e) => {
    dispatch(handAddQuestionAnswer(id, "optionTwo"));
    navigate("/dashboard");
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
                {isVotedOp1 && <span>your voted</span>}
                <input
                  type="text"
                  value={`Total: ${optionOneVotes} vote(s) - ${optionOnePercentage}%`}
                ></input>
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
                {isVotedOp2 && <span>your voted</span>}
                <input
                  type="text"
                  value={`Total: ${optionTwoVotes} vote(s) - ${optionTwoPercentage}%`}
                ></input>
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

  return {
    id,
    author: question.author,
    avatar: users[question.author].avatarURL,
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
};

export default withRouter(connect(mapStateToProps)(Poll));
