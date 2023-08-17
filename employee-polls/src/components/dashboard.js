import { connect } from "react-redux";
import { useState } from "react";
import Question from "./question";

const Dashboard = (props) => {
  const [isToggle, setIsToggle] = useState(true);

  const toggleChange = () => {
    setIsToggle(!isToggle);
  };

  const unanswered = (question) =>
    !question.optionOne.votes.includes(props.authedUser) &&
    !question.optionTwo.votes.includes(props.authedUser);

  const answered = (question) =>
    question.optionOne.votes.includes(props.authedUser) ||
    question.optionTwo.votes.includes(props.authedUser);

  return (
    <div className="dashboard-body">
      <div className="dashboard-toggle">
        <input
          type="radio"
          value={true}
          name="toggle"
          checked={isToggle}
          onChange={toggleChange}
        />
        <label>Answered </label>
        <input
          type="radio"
          value={false}
          name="toggle"
          onChange={toggleChange}
        />
        <label>Unanswered </label>
      </div>
      <div>
        {isToggle ? (
          <div>
            <h2 className="dashboard-question-title">Done</h2>
            <div className="dashboard-question-body">
              <ul>
                {props.questions.filter(answered).map((question) => (
                  <Question key={question.id} id={question.id} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="dashboard-question-title">New questions</h2>
            <div className="dashboard-question-body">
              <ul>
                {props.questions.filter(unanswered).map((question) => (
                  <Question key={question.id} id={question.id} />
                ))}
              </ul>
            </div>
          </div>
        )}
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
