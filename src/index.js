import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

function ComposeMessage({ defaultMessage, saveToLocalStorage }) {
  const [message, setMessage] = useState(defaultMessage || "");

  useEffect(() => {
    saveToLocalStorage(message);
  }, [message, saveToLocalStorage]);

  return (
    <input
      value={message}
      type="text"
      onChange={e => setMessage(e.target.value)}
    />
  );
}

function saveToLocalStorage(uid, message) {
  console.log("pretend to save to local storage", uid, message);
}

function getFromLocalStorage() {
  return "pretend to get from local storage";
}

function UserProfile({ uid }) {
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <ComposeMessage
        defaultMessage={getFromLocalStorage(uid)}
        saveToLocalStorage={message => saveToLocalStorage(uid, message)}
      />
      <hr />
      <p>
        Notice that changing state in this component (by clicking the button and
        changing `count`) will cause the identity of the arrow function being
        passed down to ComposeMessage. The `uid` hasn't changed but given the
        fact that a brand new arrow function is passed down every time, we're
        creating a scenario now where the ComposeMessage effect is being re-ran
        too much (and saving to local storage too much). You can see this in the
        console logs...
      </p>
      <button onClick={() => setCount(count + 1)}>count ({count})</button>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<UserProfile uid={12} />, rootElement);
