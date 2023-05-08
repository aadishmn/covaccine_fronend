import React from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { useState, useEffect } from "react";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
function HomePage() {
  const [newcenters, setnewCenters] = useState([]);
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [CenterSearchVal, setCenterSearchVal] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAppoint, setAppoint] = useState(false);
  const [isAppointTime, setTimeAppoint] = useState("");
  const [phNo, setPhNo] = useState("");

  useEffect(() => {
    getCenters();
    // console.log("j");
  }, [center, time, isAppointTime, date]);
  const getCenters = async () => {
    try {
      const headers = {
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      };
      const res = await axios.get("http://:8080/api/v1/user/centers", {
        headers,
      });

      if (res.data.success) {
        setCenters([...res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    if (searchVal == "" && setCenterSearchVal == "") {
      setCenters([centers]);
    }
    //console.log(centers);
    const filterVal = centers.filter(
      (item) =>
        item.address
          .toString()
          .toLowerCase()
          .includes(searchVal.toLowerCase()) &&
        item.centerName
          .toString()
          .toLowerCase()
          .includes(CenterSearchVal.toLowerCase())
    );

    setnewCenters(filterVal);
  };

  const handleAppointment = async (phoneNo) => {
    setAppoint(true);
    setPhNo(phoneNo);
  };
  const setAppointment = async (phNo, isAppointTime, date) => {
    console.log(phNo);

    console.log(date);
    console.log(isAppointTime);

    try {
      const res = await axios.post("http://:8080/api/v1/user/appointments", {
        phoneNo: phNo,
        isAppointTime: isAppointTime,
        date: date,
      });
      if (res.data.success) {
        console.log("Success");
        message.success("Appointment Fixed");
      }
    } catch (error) {
      console.log(error);
      message.error("All slots are fixed");
    }
  };

  return (
    <div className="formSearch">
      <label>Search City</label>
      <input
        type="text"
        placeholder="City"
        className="formInput  "
        onChange={(e) => {
          setSearchVal(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <label>Search address</label>

      <input
        type="text"
        className="formInput"
        placeholder="center name"
        onChange={(e) => setCenterSearchVal(e.target.value)}
      />
      <label>Search by Time</label>

      <TimePicker
        format="HH:mm"
        className="formInput"
        onChange={(value) => {
          setTime(value.format("HH:mm"));
        }}
      />

      <button onClick={handleSearch} className="formSearch">
        Search
      </button>
      <>
        <table className="formTable">
          <tbody>
            {newcenters.map((center, _id) => {
              const start = center.timing[0];
              const end = center.timing[1];
              if (time >= start && time <= end) {
                return (
                  <tr key={_id}>
                    <td>
                      <h1>{center.centerName}</h1>
                    </td>
                    <td>
                      <h1>{center.address}</h1>
                    </td>
                    <td>
                      <h1>{start}</h1>
                    </td>
                    <td>
                      <h1>{end}</h1>
                    </td>
                    <td>
                      <button onClick={() => handleAppointment(center.phoneNo)}>
                        Appintment
                      </button>{" "}
                    </td>
                  </tr>
                );
              }
            })}
            <tr>
              {isAppoint && (
                <>
                  <DatePicker
                    aria-required={"true"}
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      setDate(value.format("DD-MM-YYYY"));
                      console.log(date);
                    }}
                  />
                  <TimePicker
                    format="HH:mm"
                    className="mt-3"
                    onChange={(value) => {
                      setTimeAppoint(value.format("HH:mm"));
                    }}
                  />
                  <button
                    onClick={() => setAppointment(phNo, isAppointTime, date)}
                  >
                    Book
                  </button>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </>
    </div>
  );
}

export default HomePage;
