import React, { useState } from "react";
import "./manageDaysOff.css";
import axios from "axios";
import { DATABASE } from "../../utility";
import moment from "moment";
import { Checkbox } from "semantic-ui-react";

export default function ViewDaysOff() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vactionDays, setVacationDays] = useState([
    "22-06-2021",
    "23-06-2021",
    "24-06-2021",
  ]);
  const [pickedDays, setPickedDays] = useState([]);

  const handleClick = (item) => {
    if (pickedDays.includes(item)) {
      let arrayInstance = [...pickedDays];
      let filtered = arrayInstance.filter((it) => it !== item);
      return setPickedDays(filtered);
    }
    let arrayInstance = [...pickedDays];
    arrayInstance.push(item);
    setPickedDays(arrayInstance);
  };

  return (
    <div className="manageDaysOffSec">
      {infoOpen && (
        <div className="infoDiv">
          <p>Here you can view your vacation days</p>

          <p>
            If you want to change them just pick the relevant days and turn them
            back into work days
          </p>

          <p>Once they reversed, client will be able to book themself again</p>
        </div>
      )}
      <div className="daysOffActionSec">
        <div className="daysoffSecHeader">
          <i
            className="big info circle icon"
            onClick={() => setInfoOpen(!infoOpen)}
          ></i>
          <h2 style={{ textAlign: "center" }}>Your Days Off :</h2>
        </div>
        <div className="viewDaysBody">
            <div className="viewDayBodyInput">
            {vactionDays.map((item, index) => {
            return (
              <Checkbox
                key={index}
                label={item}
                onChange={() => handleClick(item)}
              />
            );
          })}
            </div>
            <div className="viewDaysBodyResults">
            {pickedDays.map((item, index) => {
            return (
                 <h4 key={index}>{item}</h4>
            );
          })}
            </div>
          
        </div>
        <div className="daysoffSecButton">
          <button className={`ui primary button ${loading ? "loading" : ""}`}>
            Set Days Back To Working Days
          </button>
        </div>
      </div>
    </div>
  );
}
