import React, { useState } from "react";
import axios from "axios";
import { DATABASE, avaiabilty, closingHoursFriday ,theTypes } from "../utility";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button, Icon } from "semantic-ui-react";
import "./admin.css";


export default function EditModal({ modalContent, givenDate }) {
  const [loading, setLoading] = useState(false);

  const [succes, setSucces] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [content, setContent] = useState(modalContent);
  const [value, onChange] = useState(new Date(givenDate));
  const [availableHours, setAvailableHours] = useState(avaiabilty);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const deleteSlot = await axios({
        method: "delete",
        url: `${DATABASE}/deleteslot`,
        data: {
          slotID: modalContent._id,
        },
      });
      setMessage(deleteSlot.data.success);
      setLoading(false);
      setSucces(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setMessage('')
    const { name, date, hour, price, threat, phone } = content;
    try {
      const editSlot = await axios({
        method: "patch",
        url: `${DATABASE}/updateslot/${content._id}`,
        data: {
          name,
          date,
          hour,
          phone,
          price,
          threat,
        },
      });
      setMessage(editSlot.data.succes);
    } catch ( error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e, property) => {
    console.log(e);
    setContent({
      ...content,
      [property]: e.target.value,
    });
  };

  const handlePickedDay = async (e) => {
    const theDate = moment(e).format("LL");
    setContent({
      ...content,
      date: theDate,
    });
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
      if (
        e.toLocaleDateString("en-GB") === new Date().toLocaleDateString("en-GB")
      ) {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modalBody">
            <Button icon onClick={() => setEditMode(true)}>
                <Icon name="edit" /> Edit Resevation
              </Button>
      {/* <button className="modalBodyButton" onClick={() => setEditMode(true)}>Edit Reservation</button> */}
      <h2>{givenDate}</h2>
      <h2>{content.hour}</h2>
      <h2>{content.name}</h2>
      <h2>{content.threat}</h2>
      <h2>{content.phone}</h2>

      {succes ? (
        <h3 className="successMessage">{message}</h3>
      ) : (
        <>
          <div className="deleteButton">
            <button
              className={`ui primary button  ${loading ? "loading" : ""}`}
              onClick={handleDelete}
            >
              Delete Reservation
            </button>
          </div>
        </>
      )}
      {editMode && (
        <div className="editModeSec">
          <div className="closeEditModalDiv">
          <i onClick={()=>setEditMode(false)} className="big close icon" />
          </div>
          <div className="calnderDiv">
          <h3> {content.date}</h3>
          <Calendar
            onChange={onChange}
            value={value}
            calendarType="Hebrew"
            defaultView="month"
            maxDetail="month"
            onClickDay={(e) => handlePickedDay(e)}
            tileDisabled={({ date }) =>
              date.getDay() === 1 || date.getDay() === 6
            }
          />
          </div>
          <select
            name="hour"
            onChange={(e) => handleChangeInput(e, "hour")}
            value={content.hour}
          >
            {availableHours.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={content.name}
            onChange={(e) => handleChangeInput(e, "name")}
          ></input>
          <input
            type="text"
            value={content.phone}
            onChange={(e) => handleChangeInput(e, "phone")}
          ></input>
          <select name="treat" value={content.treat} >
            {
              theTypes.map((item,index)=> {
                return <option key={index} value={item.name}>{item.name}</option>
              })
            }
          </select>
          <button className={`ui primary button`} onClick={handleEdit}>
            Edit Reservation
          </button>
          <h2>{message}</h2>
        </div>
      )}
    </div>
  );
}
