import React, { useEffect, useState } from "react";
import "./manageDaysOff.css";
import axios from "axios";
import { DATABASE } from "../../utility";
import { Checkbox } from "semantic-ui-react";
import LoaderF from "../../Assets/LoaderF";
import ButtonF from "../../Assets/ButtonF";

// need to replace loader and loading
//sepreatee error message and succes message

export default function ViewDaysOff() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vactionDays, setVacationDays] = useState([]);
  const [pickedDays, setPickedDays] = useState([]);
  const [loader,setLoader] = useState(false)
  const [message,setMessgae]=useState('')
  const [refresh, setRefresh] = useState(null)

  useEffect(() => {
    setLoading(true)
    const search = async () => {
      const vacayDays = await axios.get(`${DATABASE}/daysoff/fullybooked`);
      setVacationDays(vacayDays.data.mydaysOff[0].vacation);
      setLoading(false)
    };
    search();
  }, [refresh]);

  const handleClick = (item) => {
    setMessgae('')
    if (pickedDays.includes(item)) {
      let arrayInstance = [...pickedDays];
      let filtered = arrayInstance.filter((it) => it !== item);
      return setPickedDays(filtered);
    }
    let arrayInstance = [...pickedDays];
    arrayInstance.push(item);
    setPickedDays(arrayInstance);
  };

  const handleSubmit = async () => {
    if(pickedDays.length<1) {
      return setMessgae('No days were picked')
    }
    setLoader(true)
    try {
     const revertedDays =  await axios({
       method:'Patch',
        url:`${DATABASE}/daysoff/revertVacationDay`,
        data:{days:pickedDays}
      })
      setLoader(false)
      setMessgae(revertedDays.data.success)
      setTimeout(() => {
        setRefresh(true)
        setPickedDays([])
      }, 1000);
    }
   catch(err){
     console.log(err)
     setLoader(false)
   }
  }

  return (
    <div className="manageDaysOffSec">
      {loading && <LoaderF/>}
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
                <p>Vacation Days:</p>
                {vactionDays.map((item, index) => {
                  return (
                    <div className="viewDaysItemDiv" key={index}>
                      <Checkbox
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
                    <div className="viewDaysItemDiv"  key={index}>
                      <h4>{item}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="currentfooter">
                <ButtonF onClick={handleSubmit} text='Confirm' loading={loader}/>
                <h3 style={{ color: 'red' }}>{message}</h3>
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
