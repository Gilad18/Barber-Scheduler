import React, { useEffect, useState } from "react";
import Schedule from "../Schdule";
import "./weekly.css";
import {
  daysOfTheWeek,
  DATABASE,
} from "../../utility";
import { getavailabilty } from "../../functionUntilty";
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
