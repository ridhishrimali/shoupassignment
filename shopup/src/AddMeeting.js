import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddMeeting.css";

const AddMeeting = (props) => {
  const [totalBuilding, setTotalBuildings] = useState([]);
  const [buildData, setBuildData] = useState([]);

  useEffect(() => {
    setTotalBuildings(JSON.parse(localStorage.getItem("totalBuilding")));
    setBuildData(JSON.parse(localStorage.getItem("buildData")));
  }, []);

  const [formData, setFormData] = useState({
    building: {},
    date: "",
    startTime: "",
    endTime: "",
  });

  const onChangeHandelr = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "building") {
      let selectedBuidling = buildData[value - 1];
      setFormData({
        ...formData,
        [name]: selectedBuidling,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextClickHandler = () => {
    localStorage.setItem("selectedBuilding", JSON.stringify(formData));
  };

  return (
    <div className="addmeeting_main">
      <div className="add_meet_heading">
        <h2>Add Meeting</h2>
      </div>
      <div className="add_meet_form">
        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label>Building:</label>
              <select
                className="form-control"
                name="building"
                onChange={onChangeHandelr}
              >
                <option disabled selected>
                  Select
                </option>
                {totalBuilding.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label>Date:</label>
              <input
                type="date"
                class="form-control"
                name="date"
                onChange={onChangeHandelr}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label>Start Time:</label>
              <input
                type="time"
                class="form-control"
                name="startTime"
                onChange={onChangeHandelr}
              />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label>End Time:</label>
              <input
                type="time"
                class="form-control"
                name="endTime"
                onChange={onChangeHandelr}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Link to="/">
              <button className="btn-block btn btn-primary"> Back</button>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to={{
                pathname: `/roomselect`,
              }}
            >
              <button
                className="btn-block btn btn-primary"
                onClick={nextClickHandler}
                disabled={!formData.building.id}
              >
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;
