import { connect } from "react-redux";

const LeaderBoard = (props) => {

  return (
    <div className="leaderboard-container">
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props &&
            props.users &&
            props.users.map((user) => (
              <tr key={user.id}>
                <td >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundImage: `url(${user.avatarURL ? user.avatarURL : ""})`,
                    }}
                  ></div>
                  <span style={{marginLeft: "5px"}}>{user.name}</span>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(LeaderBoard);
