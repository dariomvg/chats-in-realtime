import "../styles/card-message.css";

export const CardMessage = ({ username, date, content }) => {
  return (
    <li className="msg">
      <div className="container-msg">
        <p>{username}</p>
        <strong>{date}</strong>
      </div>
      <p className="content-msg">{content}</p>
    </li>
  );
};
