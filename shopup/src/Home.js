import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const initialTotalBuildings = [
    {
      name: "Building One",
      id: 1,
    },
    {
      name: "Building Two",
      id: 2,
    },
    {
      name: "Building Three",
      id: 3,
    },
    {
      name: "Building Four",
      id: 4,
    },
  ];
  const [totalBuilding, setTotalBuildings] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState({});
  const [buildData, setBuildData] = useState([
    {
      id: 1,
      name: "building one",
      totalRooms: [
        {
          roomId: 11,
          roomName: "R1F1",
          floor: 1,
        },
        {
          roomId: 12,
          roomName: "R2F1",
          floor: 1,
        },
        {
          roomId: 13,
          roomName: "R1F2",
          floor: 2,
        },
        {
          roomId: 14,
          roomName: "R4F3",
          floor: 3,
        },
      ],
      allotedRooms: [],
      totalMeetings: [],
      onGoingMeetings: [],
      todayTotalMeeting: 10,
    },
    {
      id: 2,
      name: "building two",
      totalRooms: [
        {
          roomId: 21,
          roomName: "R2F1",
          floor: 1,
        },
        {
          roomId: 22,
          roomName: "R2F5",
          floor: 5,
        },
        {
          roomId: 23,
          roomName: "R3F2",
          floor: 2,
        },
        {
          roomId: 24,
          roomName: "R2F3",
          floor: 3,
        },
      ],
      allotedRooms: [],
      totalMeetings: [],
      onGoingMeetings: [],
      todayTotalMeeting: 10,
    },
    {
      id: 3,
      name: "building three",
      totalRooms: [
        {
          roomId: 31,
          roomName: "R3F1",
          floor: 1,
        },
        {
          roomId: 32,
          roomName: "R3F1",
          floor: 1,
        },
        {
          roomId: 33,
          roomName: "R3F2",
          floor: 2,
        },
        {
          roomId: 34,
          roomName: "R3F3",
          floor: 3,
        },
      ],
      allotedRooms: [],
      totalMeetings: [],
      onGoingMeetings: [],
      todayTotalMeeting: 20,
    },
    {
      id: 4,
      name: "building four",
      totalRooms: [
        {
          roomId: 41,
          roomName: "R4F1",
          floor: 1,
        },
        {
          roomId: 42,
          roomName: "R4F1",
          floor: 1,
        },
        {
          roomId: 43,
          roomName: "R4F2",
          floor: 2,
        },
        {
          roomId: 44,
          roomName: "R4F3",
          floor: 3,
        },
      ],
      allotedRooms: [],
      totalMeetings: [],
      onGoingMeetings: [],
      todayTotalMeeting: 10,
    },
  ]);
  const [allInfo, setAllInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("totalBuilding") === null) {
      setTotalBuildings(initialTotalBuildings);
      localStorage.setItem(
        "totalBuilding",
        JSON.stringify(initialTotalBuildings)
      );
    } else {
      setTotalBuildings(JSON.parse(localStorage.getItem("totalBuilding")));
    }
    if (localStorage.getItem("buildData") === null) {
      localStorage.setItem("buildData", JSON.stringify(buildData));
    } else {
      setBuildData(JSON.parse(localStorage.getItem("buildData")));
    }
    getAllInfo();
  }, []);

  const getAllInfo = () => {
    const allInfoTotalBuilds = buildData.length;
    let allInfoTotalRooms = 0;
    let allInfoTotalAvailRooms = 0;
    let allInfoTotalMeetings = 0;
    let allInforTotalGoingOnMeets = 0;
    for (let i = 0; i <= buildData.length - 1; i++) {
      allInfoTotalRooms = allInfoTotalRooms + buildData[i].totalRooms.length;
      allInfoTotalAvailRooms =
        allInfoTotalAvailRooms +
        (buildData[i].totalRooms.length - buildData[i].allotedRooms.length);
      allInfoTotalMeetings =
        allInfoTotalMeetings + buildData[i].todayTotalMeeting;
      allInforTotalGoingOnMeets =
        allInforTotalGoingOnMeets + buildData[i].onGoingMeetings.length;
    }
    setAllInfo({
      allInfoTotalBuilds: allInfoTotalBuilds,
      allInfoTotalRooms: allInfoTotalRooms,
      allInfoTotalAvailRooms: allInfoTotalAvailRooms,
      allInfoTotalMeetings: allInfoTotalMeetings,
      allInforTotalGoingOnMeets: allInforTotalGoingOnMeets,
    });
    console.log("allInforTotalGoingOnMeets", allInforTotalGoingOnMeets);
  };

  console.log("allInfo", allInfo);

  const selectBuildHandler = (e) => {
    console.log("e", e.target.value);
    let selectedBuidling = buildData[e.target.value - 1];
    setSelectedBuild(selectedBuidling);
  };

  useEffect(() => {
    getBuildDataOnSelect();
  }, [selectedBuild]);

  const getBuildDataOnSelect = () => {};

  return (
    <React.Fragment>
      <div className="home_main">
        <div className="mb-1">
          <div className="form-group">
            <label>Select Building</label>
            <select className="form-control" onChange={selectBuildHandler}>
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
        <div className="home">
          <div className="home_item">
            <h1>Building</h1>
            <h5>Total {allInfo.allInfoTotalBuilds}</h5>
          </div>
          <div className="home_item">
            <h1>Rooms</h1>
            <h5>
              Total{" "}
              {selectedBuild.id
                ? selectedBuild.totalRooms.length
                : allInfo.allInfoTotalRooms}
            </h5>
            <p>
              Free Now{" "}
              {selectedBuild.id
                ? selectedBuild.totalRooms.length -
                  selectedBuild.allotedRooms.length
                : allInfo.allInfoTotalAvailRooms}
            </p>
          </div>
          <div className="home_item">
            <h1>Meetings</h1>
            <h5>
              Total{" "}
              {selectedBuild.id
                ? selectedBuild.todayTotalMeeting
                : allInfo.allInfoTotalMeetings}{" "}
              Today
            </h5>
            <p>
              Total{" "}
              {selectedBuild.id
                ? selectedBuild.onGoingMeetings.length
                : allInfo.allInforTotalGoingOnMeets}{" "}
              going on now
            </p>
          </div>
        </div>
        <Link
          to={{
            pathname: `/addmeeting`,
          }}
        >
          <button className="add_meet_btn">Add a meeting</button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
