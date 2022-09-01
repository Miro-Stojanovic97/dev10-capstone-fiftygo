
function Messages({ messages }) { // pass array of messages to this function and receive a nice div in an alert with the message(s).
    if (!messages || messages.length == 0) {
        return null;
    }

      return (
        <div className="bg-success bg-opacity-10">
          <ul className="list-group list-group-flush p-2">
            {messages.map(message => (
              <li  className="list-group-item bg-danger bg-opacity-10" key={message}>{message}</li>
            ))}
          </ul>
        </div>
      );
}

export default Messages;