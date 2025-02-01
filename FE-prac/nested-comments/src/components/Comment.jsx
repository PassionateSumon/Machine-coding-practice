import React, { useRef, useState } from "react";

const Comment = ({ comment, addReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [currReplyText, setCurrReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReply(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  };
  const handleCancle = () => {
    setCurrReplyText("");
    setShowReply(false);
  };

  const handleReplySave = (cmntId) => {
    addReply(cmntId, currReplyText);
    handleCancle();
  };

  const handleKeyDown = (e, commentId) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      handleReplySave(commentId);
    }
    if (e.key === "Escape") {
      handleCancle();
    }
  };

  return (
    <li key={comment} className="comment-line">
      {comment.display}
      {!showReply && (
        <button className="btn" onClick={handleReply}>
          Reply
        </button>
      )}
      {showReply && (
        <div className="nested-comment-outside">
          <input
            type="text"
            ref={inputRef}
            value={currReplyText}
            onChange={(e) => setCurrReplyText(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, comment.id)}
          />
          <div className="">
            <button className="btn" onClick={() => handleReplySave(comment.id)}>
              comment
            </button>
            <button className="btn" onClick={handleCancle}>
              cancle
            </button>
          </div>
        </div>
      )}
      {comment.children.length ? (
        <ul>
          {comment.children.map((ch) => (
            <Comment key={ch.id} comment={ch} addReply={addReply} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Comment;
