import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
function StateTable() {
  const [stateData, setStateData] = useState([]);
  axios({
    method: "GET",
    url:
      "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
  })
    .then((response) => {
      const Data = response.data.data.statewise;
      setStateData(Data);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <table className="stateTable">
        <tr>
          <th
            style={{
              color: "#6c757d",
              background: "#f6f6f7",
              fontSize: ".75rem",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            State:
          </th>
          <th
            style={{
              color: "#6c757d",
              background: "#f6f6f7",
              fontSize: ".75rem",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Confirmed:
          </th>
          <th
            style={{
              color: "#6c757d",
              background: "#f6f6f7",
              fontSize: ".75rem",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Active:
          </th>
          <th
            style={{
              color: "#6c757d",
              background: "#f6f6f7",
              fontSize: ".75rem",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Recovered:
          </th>
          <th
            style={{
              color: "#6c757d",
              background: "#f6f6f7",
              fontSize: ".75rem",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Deaths:
          </th>
        </tr>

        {stateData.map((n) => (
          <tr>
            <td
              style={{
                color: "#6c757d",
                background: "#f6f6f7",
                fontSize: ".75rem",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              {n.state}
            </td>
            <td style={{ color: "#6c757d" }}>{n.confirmed}</td>
            <td style={{ color: "#6c757d" }}>{n.active}</td>
            <td style={{ color: "#6c757d" }}>{n.recovered}</td>
            <td style={{ color: "#6c757d" }}>{n.deaths}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default StateTable;
