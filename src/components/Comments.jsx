import React, { useState, useEffect, useContext } from "react";
import { createComment, getCommentPost } from "../services/comments";
import UserContext from "../context/userContext";
import { textSubstr } from "../utils/getStr";

export default ({ postid }) => {
  const state = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentVisible, setCommentVisible] = useState(true);
  useEffect(() => {
    getCommentPost(postid)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [loading]);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      //setComments([...comments, commentInput.trim()]);
      createComment(state.token, commentInput, postid)
        .then((res) => {
          console.log("send comment");
          setLoading(!loading);
        })
        .catch((err) => {
          console.log(err);
        });
      setCommentInput("");
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-2">
          <p
            className=" cursor-pointer"
            onClick={() => setCommentVisible(!commentVisible)}
          >
            {commentVisible ? textSubstr(comment.Comment, 30) : comment.Comment}
          </p>
        </div>
      ))}
      <div className="mt-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Leave a comment..."
            className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
