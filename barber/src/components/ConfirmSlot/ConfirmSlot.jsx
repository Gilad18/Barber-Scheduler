import React from "react";
import axios from "axios";
import "./confirm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { disable } from "../../features/actions";
import { DATABASE, daysOfTheWeek } from "../utility";
import { Button, Icon } from "semantic-ui-react";
import { useHistory , Link } from 'react-router-dom'
import ButtonF from "../Assets/ButtonF";

const ConfirmSlot = () => {
  const history = useHistory()
  const mySlot = useSelector((state) => state);
  const dispatch = useDispatch();

  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroeMessage, setError] = useState("");

  // const getTheDayName = () => {
  //   const parseDate = mySlot.slot.date.date.replaceAll("-", "/");
  //   console.log(parseDate);
  //   const theDate = new Date(parseDate);
  //   console.log(theDate);

  //   return daysOfTheWeek[theDate.getDay()];
  // };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      const newSlot = await axios({
        method: "post",
        url: `${DATABASE}/newslot`,
        data: {
          name: mySlot.slot.details.name,
          phone: mySlot.slot.details.phone,
          threat: mySlot.slot.threat,
          price: mySlot.slot.price,
          date: mySlot.slot.date.date,
          hour: mySlot.slot.date.hour,
          scheduled: mySlot.slot.date.date + mySlot.slot.date.hour,
        },
      });
      setTimeout(() => {
        setSucces(true);
        setLoading(false);
        dispatch(disable());
      }, 1000);
      console.log(newSlot.data);
    } catch (error) {
      console.log(error.response.data.error.message);
      setLoading(false);
      setError(error.response.data.error.message);
    }
  };

  const handleLogOut = () => {
    history.push('/')
  }

  return (
    <div className="currentPage confirmSlot">
      <div className="currentHeader">
        {!succes ? (
          <h3>{`Review & Confirm`}</h3>
        ) : (
          <div className="logOutIconDiv">
            <Link to={"/"}>
            <i className="big log out icon" />
            </Link>
          </div>
        )}
      </div>
      <div className="currentBody">
        <div className="slotDetails">
          <div className="confirmCard">
            <div className="confirmItemName">
              <h1>{mySlot.slot.details.name}</h1>
            </div>
            <div className="confirmItemDate">
              <h2>Sunday</h2>
            </div>
            <div className="confirmItemDay">
              <h2>{mySlot.slot.date.date}</h2>
            </div>
            <div className="confirmItemHour">
              <h2>{mySlot.slot.date.hour}</h2>
            </div>
            <div className="confirmItemTreat">
              <h3>{mySlot.slot.threat}</h3>
              <h3>{mySlot.slot.price} ILS</h3>
            </div>
            {
              !succes && 
              <div className="modifyBeforeConfirm">
                <Link to={'/user/what/1'}>
                <Button icon>
                <Icon name="edit" /> Change
              </Button>
                </Link>
            
            </div>
            }
          </div>
        </div>
      </div>
      <div className="currentfooter">
        {!succes ? 
          <React.Fragment>
            <ButtonF onClick={handleConfirm} text="Confirm" loading={loading}/>
            <p style={{ color: "red" }}>{erroeMessage}</p>
          </React.Fragment> 
          :
          <h2 className="succcesMsgConfirm">Reservation is booked! </h2>
        }
      </div>
    </div>
  );
};

export default ConfirmSlot;
