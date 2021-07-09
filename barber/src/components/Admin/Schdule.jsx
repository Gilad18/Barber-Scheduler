import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  avaiabilty,
  closingHoursFriday,
  DATABASE,
  daysOfTheWeek,
  holidays,
} from "../utility";
import { getavailabilty } from "../functionUntilty";
import Modal from "./ReserveSlotModal";
import EditModal from "./EditModal";
import axios from "axios";
import CloseDay from "./CloseDay";
import OpenDay from "./OpenDay";
import { Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import LoaderF from "../Assets/LoaderF";

export default function Scheudle({ givenDate }) {
  let workingHours = [];
  avaiabilty.forEach((item) => workingHours.push({ hour: item }));
  const theDate = givenDate;

  const [todaySlots, setTodaySlots] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditReservation, setOpenEditReservation] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selfBookClose, setSelfBookClose] = useState(true);
  const [isHoliday, setisHoliday] = useState(false);
  const [isdayOff, setisDayOff] = useState(false);
  const [closeDayMoadl, setModalisOpen] = useState(false);
  const [availabilty, setAvaiabily] = useState(null);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const serach = async () => {
      if (
        holidays.find(
          (item) => item.date === moment(theDate).format("DD-MM-YYYY")
        )
      ) {
        return setisHoliday(true);
      }
      if (
        new Date(givenDate).getDay() === 1 ||
        new Date(givenDate).getDay() === 6
      ) {
        return setisDayOff(true);
      }
      setisHoliday(false);
      setisDayOff(false);
      setLoading(true)
      const getSlots = await axios({
        method: "get",
        url: `${DATABASE}/schedule/${givenDate}`,
      });
      const theSlots = getSlots.data.theDaySlots;
      for (let i = 0; i < workingHours.length; i++) {
        for (let k = 0; k < theSlots.length; k++) {
          if (theSlots[k].hour === workingHours[i].hour) {
            workingHours[i] = theSlots[k];
          }
        }
      }
      setAvaiabily(getavailabilty(theDate, theSlots.length));
      if (new Date(givenDate).getDay() === 5) {
        let shortDay = workingHours.filter(
          (item) => !closingHoursFriday.includes(item.hour)
        );
        setLoading(false)
        return setTodaySlots(shortDay);
      }
      setTodaySlots(workingHours);
      setLoading(false)
    };
    serach();
  }, [givenDate, openModal, openEditReservation]);

  useEffect(() => {
    const isClosedForBooking = async () => {
      const theDateToCheck = moment(givenDate).format("DD-MM-YYYY");
      const isClosed = await axios.get(
        `${DATABASE}/daysoff/isclosed/${theDateToCheck}`
      );
      if (isClosed.data.isit === null) {
        return setSelfBookClose(false);
      }
      setSelfBookClose(true);
    };
    isClosedForBooking();
  }, [givenDate, closeDayMoadl]);

  const handleNewReservation = (item) => {
    setModalContent(item);
    setOpenModal(true);
  };

  const handleEdirResrvation = (item) => {
    setModalContent(item);
    setOpenEditReservation(true);
  };

  const getHolidayName = () => {
    let requested = holidays.find(
      (item) => item.date === moment(givenDate).format("DD-MM-YYYY")
    );
    if (requested.name) {
      return requested.name;
    }
  };

  return (
    <div className={`adminPage`}>
      <h2>{`${givenDate}   /  ${
        daysOfTheWeek[new Date(givenDate).getDay()]
      }`}</h2>
           {selfBookClose && (
        <React.Fragment>
          <p className="headingMessgaeSchedule">
            <i className="lock icon"></i> Closed for self-booking
          </p>
        </React.Fragment>
      )}
      {isHoliday || isdayOff ? (
        <>
          <h2>No Work Today</h2>
          {isHoliday && <h2>Holiday : {getHolidayName()}</h2>}
        </>
      ) : (
        <>
          {avaiabilty !== null && (
            <h3 style={{ textAlign: "center" }}>
              Capacity: <span>{availabilty} </span>
            </h3>
          )}
          {todaySlots.map((item, index) => {
            return (
              <div
                className={`slotHour ${item.name ? "reserved" : ""}`}
                key={index}
              >
                {item.hour}
                {item.name && <p>{item.name}</p>}
                {item.threat && <p>{item.threat}</p>}
                {item.name ? (
                  <i
                    className="edit icon"
                    onClick={() => handleEdirResrvation(item)}
                  />
                ) : (
                  <i
                    className="add circle icon"
                    style={{ float: "right" }}
                    onClick={() => handleNewReservation(item)}
                  />
                )}
              </div>
            );
          })}
          {selfBookClose ? (
            <div className="ModifySelfBookingBtn">
              <Button
                as="div"
                labelPosition="left"
                onClick={() => setModalisOpen(true)}
              >
                <Button color="green">
                  <Icon name="lock open" />
                </Button>
                <Label as="a" basic color="black">
                  Enable Self Booking
                </Label>
              </Button>
            </div>
          ) : (
            <div className="ModifySelfBookingBtn">
              <Button
                as="div"
                labelPosition="left"
                onClick={() => setModalisOpen(true)}
              >
                <Button color="red">
                  <Icon name="lock" />
                </Button>
                <Label as="a" basic color="red">
                  Disable Self Booking
                </Label>
              </Button>
            </div>
          )}
        </>
      )}
      {closeDayMoadl && (
        <>
          <div className="modalSlot">
            <button
              className="closeMidalBTN"
              onClick={() => setModalisOpen(false)}
            >
              <i aria-hidden="true" className="close  icon"></i>
            </button>
            {selfBookClose ? (
              <OpenDay givenDate={givenDate} />
            ) : (
              <CloseDay givenDate={givenDate} />
            )}
          </div>
        </>
      )}
      {openModal && (
        <div className="modalSlot">
          <button className="closeMidalBTN" onClick={() => setOpenModal(false)}>
            <i aria-hidden="true" className="close  icon"></i>
          </button>
          <Modal modalContent={modalContent} givenDate={theDate} />
        </div>
      )}
      {openEditReservation && (
        <div className="modalSlot">
          <button
            className="closeMidalBTN"
            onClick={() => setOpenEditReservation(false)}
          >
            <i aria-hidden="true" className="close  icon"></i>
          </button>
          <EditModal modalContent={modalContent} givenDate={theDate} />
        </div>
      )}
      {loading && <LoaderF/>}
    </div>
  );
}
