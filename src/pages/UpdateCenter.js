import React from "react";
import axios from "axios";
import { useState } from "react";

export default async function UpdateCenter(props) {
  const [center, setCenter] = useState([]);

  try {
    const id = props.id;
    console.log(props);
    const res = await axios.post(
      `https://determined-ruby-getup.cyclic.app/api/v1/admin/getCenter/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      setCenter(res.data.data);
      console.log(res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
  return <div>updateCenter</div>;
}
