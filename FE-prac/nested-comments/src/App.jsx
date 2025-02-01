import React, { useState } from "react";
import Comment from "./components/Comment";

const App = () => {
  const [ip, setIp] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      display: "hi first",
      children: [
        {
          id: 2,
          display: "hey first inside",
          children: [
            {
              id: 5,
              display: "hey first-1st inside",
              children: [],
            },
          ],
        },
        {
          id: 4,
          display: "hey first-1 inside",
          children: [],
        },
      ],
    },
    {
      id: 3,
      display: "hi second",
      children: [],
    },
  ]);

  const handleInputChange = (e) => {
    setIp(e.target.value);
  };

  const newComment = (text) => {
    return {
      id: Date.now(),
      display: text,
      children: [],
    };
  };

  const handleNewComment = (e) => {
    if (ip) {
      setComments([...comments, newComment(ip)]);
      setIp("");
    }
  };

  const addReply = (cmntId, text) => {
    // console.log(cmntId, text);
    const newReply = newComment(text);
    const prevComments = [...comments];
    addReplies(prevComments, cmntId, newReply);
  };
  const addReplies = (allCmnt, pId, text) => {
    for (let i = 0; i < allCmnt.length; i++) {
      let currComment = allCmnt[i];
      if (currComment.id === pId) {
        currComment.children.unshift(text);
      }
    }
    for (let i = 0; i < allCmnt.length; i++) {
      let currComment = allCmnt[i];
      if (currComment.children.length > 0) {
        addReplies(currComment.children, pId, text);
      }
    }
  };

  return (
    <div>
      <h1>Nested Comments</h1>

      {/* Input box */}
      <div>
        <input
          type="text"
          value={ip}
          placeholder="Enter your comments.."
          className="input-box"
          onChange={handleInputChange}
        />
      </div>

      {/* Button */}
      <div>
        <button className="comment-button" onClick={handleNewComment}>
          Comment
        </button>
      </div>

      {/* Comments */}
      <div>
        {comments.map((item) => (
          <Comment key={item.id} comment={item} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default App;
