import { connect } from "react-redux";

const PageNotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found!</h2>
    </div>
  );
};

const mapStateToProps = () => ({
  loggedIn: false,
});

export default connect(mapStateToProps)(PageNotFound);
