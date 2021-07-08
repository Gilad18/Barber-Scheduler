import React, { useEffect, useState } from "react";
import "./manageDaysOff.css";
import axios from "axios";
import { DATABASE } from "../../utility";
import moment from "moment";
import { Checkbox } from "semantic-ui-react";
import { Dimmer, Loader} from 'semantic-ui-react'

export default function ViewDaysOff() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vactionDays, setVacationDays] = useState([]);
  const [pickedDays, setPickedDays] = useState([]);

  useEffect(() => {
    setLoading(true)
    const search = async () => {
      const vacayDays = await axios.get(`${DATABASE}/daysoff/fullybooked`);
      setVacationDays(vacayDays.data.mydaysOff[0].vacation);
      setLoading(false)
    };
    search();
  }, []);

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
      {loading && (
        <div className="loaderWeekely">
          <Dimmer active>
            <Loader size="huge" indeterminate>
              Loading, Please wait
            </Loader>
          </Dimmer>
        </div>
      )}
      {infoOpen && (
        <div className="infoDiv">
          <p style={{ textAlign: "center" }}>Change in plans? </p>
          <p style={{ textAlign: "center" }}>No worries!</p>
          <p>
            If you want to turn a vaction day back into work day, just pick it
            from the list and click the button below.
          </p>
          <p>
            Pay attention that only the dates that appear in the "Picked Days"
            box will be reverted and clients will be able to book them again.
          </p>
        </div>
      )}
      <div className="daysOffActionSec">
        <div className="daysoffSecHeader">
          <i
            className="big info circle icon"
            onClick={() => setInfoOpen(!infoOpen)}
          ></i>
        </div>
        {vactionDays.length > 0 ? (
          <>
            <div className="viewDaysBody">
              <div className="viewDayBodyInput">
                <h3>Vacation Days:</h3>
                {vactionDays.map((item, index) => {
                  return (
                    <div className="viewDaysItemDiv">
                      <Checkbox
                        key={index}
                        label={item}
                        onChange={() => handleClick(item)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="viewDaysBodyResults">
                <h3 style={{ color: "var(--back)" }}>Picked Days:</h3>
                {pickedDays.map((item, index) => {
                  return (
                    <div className="viewDaysItemDiv">
                      <h4 key={index}>{item}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="daysoffSecButton">
              <button
                className={`ui primary button ${loading ? "loading" : ""}`}
              >
                Set Days Back To Working Days
              </button>
            </div>
          </>
        ) : (
          <div className="noVacyDayMessage">
            <h1>You dont have any vacation days set yet</h1>
            <h2>Go ahead and set them</h2>
          </div>
        )}
      </div>
    </div>
  );
}
