import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = ({
  conversation: { id, title, board_id, list_id, position },
}) => {
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => a.position - b.position);
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.title, message.board_id, message.list.id, message.position}</li>;
  });
};
