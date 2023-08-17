import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const PollCreation = ({ dispatch, id }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const onChangeOptionOne = (e) => {
    setOptionOne(e);
  };

  const onChangeOptionTwo = (e) => {
    setOptionTwo(e);
  };

  const handleSubmit = () => {
    if (optionOne || optionTwo) {
      dispatch(handleAddQuestion(optionOne, optionTwo));
      navigate("/dashboard");
    } else {
      alert("Please input Option One and Option Two");
    }
  };

  return (
    <div className="pollcreaetion-container">
      <h1>Would You Rather</h1>
      <h3> Create Your Own Poll</h3>
      <div>
        <label>First Option</label>
        <input
          type="text"
          data-testid="optionOne-input"
          value={optionOne}
          onChange={(e) => onChangeOptionOne(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Second Option</label>
        <input
          type="text"
          data-testid="optionTwo-input"
          value={optionTwo}
          onChange={(e) => onChangeOptionTwo(e.target.value)}
        ></input>
      </div>
      <input type="submit" data-testid="submit-button" value="Submit" onClick={handleSubmit}></input>
    </div>
  );
};

export default connect()(PollCreation);
