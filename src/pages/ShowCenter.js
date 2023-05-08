import React, { useEffect } from "react";
import axios from "axios";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useState } from "react";
import "../styles/ShowCenter.css";
export default function ShowCenter() {
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState([]);
  const [updUser, setUpdUser] = useState(null);
  const [upd, isUpd] = useState(false);
  useEffect(() => {
    getCenters();
    // console.log("j");
  }, [center, upd]);
  const getCenters = async () => {
    try {
      const headers = {
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      };
      const res = await axios.get(
        "https://determined-ruby-getup.cyclic.app/api/v1/admin/showCenter",
        {
          headers,
        }
      );

      if (res.data.success) {
        setCenters([...res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCenters = (id) => {
    isUpd(true);
    setUpdUser(id);
    // try {
    //   console.log(id);
    //   const res = await axios.post(
    //     `https://determined-ruby-getup.cyclic.app/api/v1/admin/getCenter/${id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   if (res.data.success) {
    //     setCenter(res.data.data);
    //     console.log(res.data.data);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(
        "https://determined-ruby-getup.cyclic.app/api/v1/admin/putCenter",
        { ...values, _id: updUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log("Success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCenters = async (id) => {
    console.log(id);

    try {
      const res = await axios.delete(
        `https://determined-ruby-getup.cyclic.app/api/v1/admin/deleteCenter/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="showBody">
      <Row className="showData">
        {centers.map((center, _id) => {
          return (
            <div key={_id} className="showDataItems">
              <h1 className="centerName">Center Name:{center.centerName}</h1>
              <h1>Address:{center.address}</h1>
              <h1>Covaxin:{center.dose1}</h1>
              <h1>Covishield:{center.dose1}</h1>
              <h1>From:{center.timing[0]}</h1>
              <h1>To:{center.timing[1]}</h1>

              <button onClick={() => updateCenters(center._id)}>update</button>
              <button onClick={() => deleteCenters(center._id)}>Delete</button>
            </div>
          );
        })}
      </Row>
      {upd && (
        <Form className="form" onFinish={handleUpdate}>
          <Col>
            <Form.Item label="Center Name" name="centerName">
              <Input
                type="text"
                placeholder="center name"
                className="formInp"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="dose1" name="dose1">
              <Input type="number" placeholder="dose 1" className="formInp" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Covaxin" name="dose2">
              <Input type="number" placeholder="dose 1" className="formInp" />
            </Form.Item>
          </Col>{" "}
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Form>
      )}
    </div>
  );
}
