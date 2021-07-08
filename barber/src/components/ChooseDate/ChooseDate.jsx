import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { avaiabilty, closingHoursFriday, DATABASE } from "../utility";
import {getDaysOff} from '../functionUntilty'
import "./chooseDate.css";

import { useDispatch } from "react-redux";
import { addDate, nextPage } from "../../features/actions";
import Button from "../Assets/Button";

const ChooseDate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let offDays = [];

  const getmyDaysOff = async () => {
    if (localStorage.getItem("daysoff") === null) {
      getDaysOff()
    }

    offDays = localStorage.getItem("daysoff");
  };

  getmyDaysOff();

  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(null);
  const [availableHours, setAvailableHours] = useState(avaiabilty);
  const [hourPop, setPopHours] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const [loadingHours, setLoadingHours] = useState(false);

  const handleSubmit = () => {
    setErrorMSG("");
    if (date !== null && hour !== null) {
    //  const thePickedDay = date.toLocaleDateString("en-GB").replaceAll('/','-')
      dispatch(
        addDate({
          date: moment(date).format("LL"),
          hour
        })
      );

      return setTimeout(() => {
        history.push("/user/confirm/3");
        dispatch(nextPage());
        localStorage.removeItem("daysoff");
      }, 300);
    }
    setErrorMSG("some details are missing");
  };

  const handlePickedDay = async (e) => {
    setErrorMSG("")
    setHour(null)
    setLoadingHours(true);
    setPopHours(true);
    const theDate = moment(e).format("LL");
    try {
      const bookedHours = await axios({
        method: "get",
        url: `${DATABASE}/todaySlot/${theDate}`,
      });
      let theHoursObjects = bookedHours.data.theDaySlots;
      let reserved = [];
      theHoursObjects.forEach((item) => reserved.push(item.hour));
      let allHoursArray = avaiabilty;
      let avaiableHours = allHoursArray.filter(
        (item) => !reserved.includes(item)
      );
      setAvailableHours(avaiableHours);
      if (e.toLocaleDateString("en-GB") === new Date().toLocaleDateString("en-GB")){
        let timeNow = new Date().getHours();
        let filteredPriviousSlot = avaiableHours.filter(
          (item) => parseInt(item[0] + item[1]) >= timeNow
        );
        setAvailableHours(filteredPriviousSlot);
      }
      if (e.getDay() === 5) {
        let shortDay = avaiableHours.filter(
          (item) => !closingHoursFriday.includes(item)
        );
        setAvailableHours(shortDay);
      }
      setLoadingHours(false);
    } catch (err) {
      setLoadingHours(false);
    }
  };

  const handlePickHour = (pickedHour) => {
    setHour(pickedHour);
  };
  return (
    <div className="currentPage chooseDate">
      <div className="currentHeader">
        <h3>When?</h3>
      </div>
      <div className="currentBody">
        <Calendar
          onChange={setDate}
          value={date}
          calendarType="Hebrew"
          defaultView="month"
          maxDetail="month"
          tileDisabled={({ date }) =>
            offDays.includes(moment(date).format("DD-MM-YYYY")) ||
            date.getDay() === 1 ||
            date.getDay() === 6
          }
          onClickDay={(e) => handlePickedDay(e)}
          minDate={new Date()}
        />
        {hourPop && (
          <React.Fragment>
            {availableHours.length<1 ? 
                  <h3 className="noSlotsText">Sorry, no avaialble slots today. Please Try a difftent date</h3>
                  :
            <h4 style={{ color: "white" }}>
              Available slots for {moment(date).format("LL")}
              {/* Available slots for {date.toLocaleDateString()} */}
            </h4>}
            
            <div className="avaiabily">
              {loadingHours ? (
                <div className="ui huge  active loader"></div>
              ) : (
                <React.Fragment>
            {       availableHours.map((item, index) => {
                    return (
                      <div
                        className={`hourPick ${
                          hour !== null && hour === item ? "thePickedHour" : ""
                        }`}
                        key={index}
                        onClick={() => handlePickHour(item)}
                      >
                        {item}
                      </div>
                    );
                  })}
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="currentfooter">
        <h3 style={{ color: "red" }}>{errorMSG}</h3>
        <Button onClick={handleSubmit} text="Next"/>
      </div>
    </div>
  );
};

export default ChooseDate;
