import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion, formatDate } from "../utils.js/helper";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Question = (props) => {
  const { authedUser, id, author, avatar, optionOne, optionTwo, timestamp } =
    props.question;

  return (
    <li className="question">
      <div className="question-info">
        <input style={{ fontWeight: "600" }} type="text" value={author}></input>
        <input type="text" value={formatDate(timestamp)}></input>
      </div>
      <div className="question-submit">
        <Link to={`/question/${id}`}>Show</Link>
      </div>
    </li>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const user = users[question.author];

  return {
    authedUser,
    question: question ? formatQuestion(question, user, authedUser) : null,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
