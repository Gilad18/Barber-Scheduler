import React, { useEffect, useState } from "react";
import Schedule from "../Schdule";
import "./weekly.css";
import {
  daysOfTheWeek,
  closingHoursFriday,
  avaiabilty,
  DATABASE,
} from "../../utility";
import axios from "axios";
import { Dimmer, Loader} from 'semantic-ui-react'

export default function Weekly() {
  const [loadingweekly, setloadingWeekly] = useState(false);
  const [weekly, setweekly] = useState([]);
  const [chosenDay, setChosenDay] = useState(null);

  useEffect(() => {
    const getWeekly = async () => {
      setloadingWeekly(true);
      const theWeek = await axios.get(`${DATABASE}/getnextsevendays`);
      setweekly(theWeek.data.days);
      setloadingWeekly(false);
    };
    getWeekly();
  }, []);

  const getavailabilty = (theDay, slots) => {
    if (new Date(theDay).getDay() === 1 || new Date(theDay).getDay() === 6) {
      return "OFF";
    }
    if (new Date(theDay).getDay() === 5) {
      let theAvailabilty =
        slots / [avaiabilty.length - closingHoursFriday.length];
      return `${(theAvailabilty * 100).toFixed(0)}%`;
    }
    let theAvailabilty = slots / avaiabilty.length;
    return `${(theAvailabilty * 100).toFixed(0)}%`;
  };

  const [didChooseDay, setDidChooseDay] = useState(false);

  const handleChooseDay = (day) => {
    setDidChooseDay(true);
    setChosenDay(day);
  };

  return (
    <React.Fragment>
      {didChooseDay ? (
        <React.Fragment>
          <i
            className="big reply icon"
            onClick={() => setDidChooseDay(false)}
          ></i>
          <Schedule givenDate={chosenDay} />
        </React.Fragment>
      ) : (
        <div className="weeklyPage">
          <div className="daysGrid">
            {weekly.map((item, index) => {
              return (
                <div
                  key={index}
                  className="daysGridSingleItem"
                  onClick={() => handleChooseDay(item.day)}
                >
                  <h5> {item.day} </h5>
                  <h5>{daysOfTheWeek[new Date(item.day).getDay()]}</h5>
                  <h5>{getavailabilty(item.day, item.booked)}</h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {loadingweekly && (
        <div className="loaderWeekely">
          <Dimmer active>
            <Loader size='huge' indeterminate>Loading, Please wait</Loader>
          </Dimmer>
        </div>
      )}
    </React.Fragment>
  );
}
