import React from "react";

import TodoListItem from "../todo-list-item";

import "./todo-list.css";

const TodoList = ({ data, onDeleteItem, onToggleDone, onToggleImportant }) => {
  const todos = data.map(todo => {
    const { id, ...restProps } = todo;

    return (
      <li className="list-group-item" key={id}>
        <TodoListItem
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onDeleted={() => onDeleteItem(id)}
          {...restProps}
        />
      </li>
    );
  });

  return <ul className="todo-list list-group">{todos}</ul>;
};

export default TodoList;
