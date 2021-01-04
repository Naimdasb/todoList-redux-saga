import React from "react";
import "./styles.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { TodoInput } from "./components/TodoInput";
import { AllLists } from "./components/AllLists";

export default function App() {
  return (
    <div className="App">
      <div className="container py-5">
        <Provider store={store}>
          <TodoInput />
          <AllLists />
        </Provider>
      </div>
    </div>
  );
}
