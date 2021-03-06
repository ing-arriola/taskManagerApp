import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import TaskContext from "../../context/task/taskContext";
const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const { isAuthenticated, logout, user } = authContext;

  const { clearTasks } = taskContext;

  const onLogout = () => {
    logout();
    clearTasks();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guesLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guesLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Task Tracker",
  icon: "fas fa-list",
};

export default Navbar;
