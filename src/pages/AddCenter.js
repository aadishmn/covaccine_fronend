import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import "../styles/AddCenters.css";
import { useEffect, useState } from "react";

const AddCenter = () => {
  const handleFinish = async (values) => {
    try {
      console.log(values.timing[0].format("HH:MM"));
      const res = await axios.post("http://:8080/api/v1/admin/addCenter", {
        ...values,

        timing: [
          values.timing[0].format("HH:mm"),
          values.timing[1].format("HH:mm"),
        ],
      });

      if (res.data.success) {
        message.success("Insert Successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      message.error("something went wrong");
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleFinish} className="form">
        <h4 className="">Center Details : </h4>
        <Row gutter={20} className="formRow">
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Center Name"
              name="centerName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                className="formInp"
                placeholder="center name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" className="formInp" placeholder="address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="dose1"
              name="dose1"
              required
              rules={[{ required: true }]}
            >
              <Input type="number" className="formInp" placeholder="dose 1" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="dose2"
              name="dose2"
              required
              rules={[{ required: true }]}
            >
              <Input type="number" className="formInp" placeholder="dose 1" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="phone no"
              name="phoneNo"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                className="formInp"
                placeholder="your clinic ph no"
              />
            </Form.Item>
          </Col>{" "}
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timing" name="timing" required>
              <TimePicker.RangePicker className="formInp" format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <Col xs={24} md={24} lg={8}></Col>
        <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary form-btn" type="submit">
            Submit
          </button>
        </Col>
      </Form>
    </>
  );
};
export default AddCenter;
