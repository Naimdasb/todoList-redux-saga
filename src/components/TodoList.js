import React from "react";
import { List, Button } from "antd";
import { useDispatch } from "react-redux";
import { Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const TodoList = ({ items, listName }) => {
  const dispatch = useDispatch();

  const removeItem = (item, listName) => () => {
    dispatch({
      type: "DEL_ITEM",
      payload: { currentItem: item, currentList: listName }
    });
  };

  const removeList = () => {
    dispatch({ type: "DEL_LIST", payload: listName });
  };

  return (
    <div className="py-5">
      <div className="d-flex justify-content-center w-100">
        <Title level={2}>{listName}</Title>
        <Button
          onClick={removeList}
          icon={<DeleteOutlined />}
          style={{ marginLeft: 25 }}
          type="primary"
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={items}
        bordered
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex w-100 justify-content-around align-items-center">
              {item}
              <Button type="ghost" onClick={removeItem(item, listName)}>
                Remove
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
