import "../styles/card-message.css";

export const CardMessage = ({ message }) => {

  return (
    <li className="msg">
      <p>
        <b>{message.username}: </b>
        {message.messages}
      </p>
    </li>
  );
};
