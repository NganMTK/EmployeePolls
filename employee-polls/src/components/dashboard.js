import { connect } from "react-redux";
import Question from "./question";

const Dashboard = (props) => {
  const newQuestion = (question) =>
    !question.optionOne.votes.includes(props.authedUser) &&
    !question.optionTwo.votes.includes(props.authedUser);

  const doneQuestion = (question) =>
    question.optionOne.votes.includes(props.authedUser) ||
    question.optionTwo.votes.includes(props.authedUser);

  return (
    <div className="dashboard-body">
      <div>
        <h2 className="dashboard-question-title">New questions</h2>
        <div className="dashboard-question-body">
          <ul>
            {props.questions.filter(newQuestion).map((question) => (
              <Question key={question.id} id={question.id} />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="dashboard-question-title">Done</h2>
        <div className="dashboard-question-body">
          <ul>
            {props.questions.filter(doneQuestion).map((question) => (
              <Question key={question.id} id={question.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  users,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
});

export default connect(mapStateToProps)(Dashboard);
