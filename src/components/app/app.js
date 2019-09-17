import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  state = {
    todoData: [
      this.createTodo("Learn React"),
      this.createTodo("Go to magazine"),
      this.createTodo("Walking"),
    ],
    term: "",
    filter: "all",
  };

  createTodo(label) {
    return {
      label,
      done: false,
      important: false,
      id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
    };
  }

  findTodoIndex(id) {
    const { todoData } = this.state;

    return todoData.findIndex(todo => todo.id === id);
  }

  toggleProperty(todoData, id, propName) {
    const idx = this.findTodoIndex(id);

    const oldTodo = todoData[idx];
    const newTodo = { ...oldTodo, [propName]: !oldTodo[propName] };

    return [...todoData.slice(0, idx), newTodo, ...todoData.slice(idx + 1)];
  }

  addTodo = text => {
    if (text.length === 0) return;

    this.setState(({ todoData }) => {
      const newTodo = this.createTodo(text);

      return {
        todoData: [...todoData, newTodo],
      };
    });
  };

  deleteTodo = id => {
    this.setState(({ todoData }) => {
      const idx = this.findTodoIndex(id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return {
        todoData: [...before, ...after],
      };
    });
  };

  searchTodo(todos, term) {
    if (term.length === 0) return todos;

    return todos.filter(({ label }) => {
      const lLabel = label.toLowerCase();
      const lTerm = term.toLowerCase();

      return lLabel.includes(lTerm);
    });
  }

  filterTodos(todos, filter) {
    switch (filter) {
      case "active":
        return todos.filter(todo => !todo.done);
      case "done":
        return todos.filter(todo => todo.done);
      default:
        return todos;
    }
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, "important"),
    }));
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, "done"),
    }));
  };

  onSearch = term => this.setState({ term });
  onFilter = filter => this.setState({ filter });

  render() {
    const { todoData, term, filter } = this.state;
    const { searchTodo, filterTodos } = this;

    const visibleTodos = filterTodos(searchTodo(todoData, term), filter);

    const done = todoData.filter(todo => todo.done).length;
    const toDo = todoData.length - done;

    return (
      <div className="todo-app">
        <AppHeader toDo={toDo} done={done}>
          ToDo List
        </AppHeader>
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter onFilter={this.onFilter} filter={filter} />
        </div>
        <TodoList
          onDeleteItem={this.deleteTodo}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          data={visibleTodos}
        />
        <ItemAddForm onItemAdded={this.addTodo} />
      </div>
    );
  }
}
