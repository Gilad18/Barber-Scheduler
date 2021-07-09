import React, { useState } from "react";
import "./manageDaysOff.css";
import Calendar from "react-calendar";
import axios from "axios";
import { DATABASE } from "../../utility";
import moment from "moment";
import ButtonF from "../../Assets/ButtonF";

export default function ManageDaysOff() {
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const setDaysOff = async () => {
    if (!value[0] || !value[1]) {
      return setMessage("please select start and end days");
    }
    setLoading(true);
    setMessage("");
    let thedays = [];
    let nextDay = new Date(value[0]);
    thedays.push(moment(nextDay).format("DD-MM-YYYY"));
    while (
      nextDay.toLocaleDateString("en-GB") !==
      value[1].toLocaleDateString("en-GB")
    ) {
      nextDay.setDate(nextDay.getDate() + 1);
      thedays.push(moment(nextDay).format("DD-MM-YYYY"));
    }

    try {
      const sendRequest = await axios({
        method: "post",
        url: `${DATABASE}/daysoff/setvacationdates`,
        data: {
          days: thedays,
        },
      });
      setMessage(sendRequest.data.success);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); // show the error message text
    }
  };

  return (
    <div className="manageDaysOffSec">
      {infoOpen && (
        <div className="infoDiv">
          <p style={{ textAlign: "center" }}>Taking a Break? </p>
          <p style={{ textAlign: "center" }}>You surly deserve it!</p>
          <p>
            Here you can set your vacation days, pick the days you need so they
            will be close for client's booking.
          </p>
          <p>
            You will be able to set these days only if there are no slots
            reserverd alreday!
          </p>
          <p style={{ textAlign: "center" }}>Enjoy your time :)</p>
        </div>
      )}
      <div className="daysOffActionSec">
        <div className="daysoffSecHeader">
          <i
            className="big info circle icon"
            onClick={() => setInfoOpen(!infoOpen)}
          ></i>
          <h2 style={{ textAlign: "center" }}>Set Your Days Off :</h2>
        </div>
        <div className="calnderDiv">
          <Calendar
            onChange={onChange}
            value={value}
            calendarType="Hebrew"
            defaultView="month"
            maxDetail="month"
            selectRange={true}
            returnValue="range"
          />
        </div>
        <div className="pickedDaysOffs">
          <div className="selectedDaysOff">
            <h2>Start: </h2>
            <div className="singleSelectedDate">
              {value[0] && value[0].toLocaleDateString("en-GB")}
            </div>
            <h2>End: </h2>
            <div className="singleSelectedDate">
              {value[1] && value[1].toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>
        <div className="currentfooter">
          <ButtonF onClick={setDaysOff} text="Set Days Off" loading={loading} />
          <h3 style={{ color: "white" }}>{message}</h3>
        </div>
        <h3 className="daysoffmessage">{message}</h3>
      </div>
    </div>
  );
}
