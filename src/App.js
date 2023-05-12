import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import Navbar from "./Navbar";

function App() {
  const [itemText, setText] = useState("");
  const [listitem, setListItem] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4500/api/item", {
        item: itemText,
      });
      setListItem((prev) => [...prev, res.data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:4500/api/item");
        setListItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4500/api/item/${id}`);
      const newListItem = listitem.filter((item) => item._id !== id);
      setListItem(newListItem);
    } catch (error) {
      console.log(error);
    }
  };

  // const updateItem = async (id, newItem) => {
  //   try {
  //     const res = await axios.put(`http://localhost:4500/api/item/${id}`, {
  //       item: newItem,
  //     });
  //     const updatedListItem = listitem.map((item) =>
  //       item._id === id ? { ...item, item: newItem } : item
  //     );
  //     setListItem(updatedListItem);
  //     setIsUpdating("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:4500/api/item/${isUpdating}`,
        { item: updateItemText }
      );

      console.log(res.data);
      const updatedItemIndex = listitem.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listitem[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };

  const renderUpdatesForm = (id) => {
    return (
      <form
        className="update-form"
        onSubmit={(e) => {
          updateItem(e);
        }}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   const newItem = e.target.elements.newItem.value;
        //   updateItem(id, newItem);
        // }}
      >
        <input
          className="update-new-input"
          type="text"
          placeholder="New Item"
          name="newItem"
          onChange={(e) => {
            setUpdateItemText(e.target.value);
          }}
          value={updateItemText}
        />
        <button className="update-new-button" type="submit">
          <MdDoneOutline />
        </button>
      </form>
    );
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <h1>TODO APP</h1>
        <form className="form" onSubmit={addItem}>
          <input
            type="text"
            placeholder="ADD TODO ITEM"
            onChange={(e) => setText(e.target.value)}
            value={itemText}
          />
          <button type="submit">
            {" "}
            <IoSend />{" "}
          </button>
        </form>
        <div className="todo-listitem">
          {listitem.map((item) => (
            <div className="todo-item" key={item._id}>
              {isUpdating === item._id ? (
                renderUpdatesForm(item._id)
              ) : (
                <>
                  <p className="item-content">{item.item}</p>
                  <button
                    className="update-item"
                    onClick={() => setIsUpdating(item._id)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="delete-item"
                    onClick={() => deleteItem(item._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
