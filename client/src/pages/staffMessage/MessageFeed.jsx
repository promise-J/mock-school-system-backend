import { DeleteOutline } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const MessageFeed = ({ message, messages, setMessages }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const deleteMessage = async (id) => {
    if (message.sender.id !== user?.user.id)  return alert("You can not delete someone post");
    try {
      setLoading(true);
      await axios.delete(`/message/${id}`);
      setMessages(messages.filter(message=> message._id !==id))
      // setCb(!cb);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        message.sender._id === user?.user.id
          ? "staffMessageContent own"
          : "staffMessageContent"
      }
    >
      <div className="mesInfo">
        <span>{message?.sender.loginID[0]}</span>
        <span>{message?.sender.loginID}</span>
        <span
          onClick={() => deleteMessage(message._id)}
          className="messageDelete"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <DeleteOutline style={{ fontSize: 12 }} />
          )}
        </span>
      </div>
      <p>{message?.message}</p>
    </div>
  );
};

export default MessageFeed;
