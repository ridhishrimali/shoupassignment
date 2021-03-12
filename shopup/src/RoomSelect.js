import React, { useState, useEffect } from "react";
import "./RoomSelector.css";
import { useHistory } from "react-router-dom";

function RoomSelect(props) {
  const [rooms, setRooms] = useState([]);
  const [selectedBuid, setSelectedBuild] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});

  const history = useHistory();

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("selectedBuilding"));
    setSelectedBuild(selected);
    setRooms(selected.building.totalRooms);
  }, []);

  const saveClickHandler = () => {
    if (!selectedRoom.roomId) {
      alert("Please select a room before saving!!!");
    } else {
      alert("Meeting Created Successfully!!!");
      history.push("/");
    }
  };

  const roomClickHanlder = (room) => {
    setSelectedRoom(room);
  };

  return (
    <React.Fragment>
      <div className="room_main">
        <h3 className="text-center mt-3">
          Please select one of the free rooms
        </h3>
        <div className="room_container">
          {rooms.map((room, id) => (
            <div
              className="room_item"
              onClick={() => roomClickHanlder(room)}
              style={{ cursor: "pointer" }}
            >
              <h3>{room.roomName}</h3>
              <h5>Building {selectedBuid.building.id}</h5>
              <h6>Floor {room.floor}</h6>
            </div>
          ))}
          <button
            className="add_room_btn mb-3"
            onClick={saveClickHandler}
            // disabled={!selectedRoom.roomId}
          >
            Save
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RoomSelect;
