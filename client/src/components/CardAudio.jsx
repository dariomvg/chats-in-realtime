import "../styles/card-message.css";

export const CardAudio = ({ username, date, content }) => {

  return (
    <div className="msg">
        <div className="container-msg">
            <p>{username}</p>
        <strong>{date}</strong>
        </div>
        <audio src={content} controls />
    </div>
  );
};
