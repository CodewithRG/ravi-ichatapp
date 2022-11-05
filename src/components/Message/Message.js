import React, {  useEffect, useState } from "react";
import "./Message.css";

const Message = ({ user, message, classs }) => {
  let date = new Date();
  // let  sec,min;
  const [hour, sethour] = useState();
  const [min, setmin] = useState();
  const [sec, setsec] = useState();

  useEffect(() => {
    setsec(date.getSeconds());
    setmin(date.getMinutes());
    sethour(date.getHours());
  }, []);

  console.log(hour - 12, min, sec);
  if (user === "Admin") {
    return <div className={`messageBox ${classs} `}> {message} </div>;
  } else if (user) {
    return (
      <div className={`messageBox ${classs} `}>
        {" "}
        <span className="userName">~{user}</span> <br /> {message} <br />{" "}
        <div className="timeZone timeLeft">
          {hour - 12}:{min}
        </div>{" "}
      </div>
    );
  } else {
    return (
      <div className={`messageBox ${classs}`}>
        {`${message}`} <br />{" "}
        <div className="timeZone">
          {hour - 12}:{min}
        </div>{" "}
      </div>
    );
  }
};

export default Message;
