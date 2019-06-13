const React = require("react");

const User = ({ user }) => (
  <a href={user.infoLink} className="link">
    <img src={user.image} alt={user.caption} title={user.caption} />
    <span className="caption">{user.caption}</span>
  </a>
);

User.displayName = "User";

module.exports = User;
