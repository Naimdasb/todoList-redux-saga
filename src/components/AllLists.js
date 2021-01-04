import React from "react";
import { useSelector } from "react-redux";
import { TodoList } from "./TodoList";

export const AllLists = () => {
  const lists = useSelector((state) => state.lists);
  return (
    <div className="d-flex flex-wrap">
      {lists.map((list) => (
        <div className="col-6">
          <TodoList key={list.name} listName={list.name} items={list.items} />
        </div>
      ))}
    </div>
  );
};
