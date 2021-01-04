import React, { useState } from "react";
import { Input, Button, Typography, Select, Slider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export const TodoInput = () => {
  const dispatch = useDispatch();
  const [itemText, setItemText] = useState(null);
  const [listText, setListText] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [delay, setDelay] = useState(0);

  const lists = useSelector((state) => state.lists);
  const loading = useSelector((state) => state.loading);

  const handleChange = (event) => {
    if (event.target.name === "item") {
      setItemText(event.target.value);
    } else {
      setListText(event.target.value);
    }
  };

  const handleList = (value) => {
    setCurrentList(value);
  };

  const handleClick = (event) => {
    if (event.target.textContent === "Add Todo") {
      dispatch({
        type: "ADD_ITEM_REQUEST",
        payload: { itemText, currentList, delay }
      });
      setItemText(null);
    } else {
      dispatch({ type: "ADD_LIST_REQUEST", payload: { listText, delay } });
      setListText(null);
    }
  };

  const handleDelay = (value) => {
    setDelay(value);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="col-6 my-3">
        <div style={{ height: 60, marginBottom: 20 }}>
          {loading ? <Spin indicator={antIcon} /> : null}
        </div>
        <Title level={4}>Select TodoList</Title>
        <Select className="w-100" onChange={handleList} disabled={loading}>
          {lists.map((list) => (
            <Option key={list.name} value={list.name}>
              {list.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="col-6 my-3">
        <Title level={4}>{listText ? listText : "Todo List Name"}</Title>
        <Input
          placeholder="Enter your Todo List Name..."
          value={listText}
          onChange={handleChange}
          name="list"
          disabled={loading}
        />
        <Button
          className="mt-3"
          type="primary"
          onClick={handleClick}
          disabled={loading}
        >
          Add List
        </Button>
      </div>
      <div className="col-6 my-3 flex-column">
        <Title level={4}>{itemText ? itemText : "Todo List Item"}</Title>
        <Input
          placeholder="Enter your Todo Item Name"
          value={itemText}
          onChange={handleChange}
          name="item"
          disabled={loading}
        />
        <Button
          className="mt-3"
          type="primary"
          onClick={handleClick}
          disabled={loading}
        >
          Add Todo
        </Button>
      </div>
      <div className="col-6 my-3 flex-column">
        <Title level={4}>Current Delay: {delay}</Title>
        <Slider
          value={delay}
          min={0}
          max={10}
          onChange={handleDelay}
          disabled={loading}
        />
      </div>
    </div>
  );
};
