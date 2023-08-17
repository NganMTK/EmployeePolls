# Emplyee Poll project

This is the starter template for the final assessment project for Udacity's React&Redux course.

## Data 
The _DATA.js file has a data fake and some method access this data.

There are two type of the data:
 - users
 - questions
 

### Get Initial data
 - _getUsers: Get the information of user:
	+ Id
	+ Username
	+ Password
	+ AvataURL
	+ Answers
	+ Questions
  
 - _getQuestions: Get the information of questions in poll:
	+ id,
	+ timestamp
	+ author
	+ option and voted
 
 
### Save data
 - _saveQuestion: Save the question has created in the poll.
 
 Method Signature:
	optionOne: the content of option one
	optionTwo: the content of option two
	author: who creat the question
	
 - _saveQuestionAnswer
 
	authedUser: user is login 
	qid: question id,
	answer: the answer has voted