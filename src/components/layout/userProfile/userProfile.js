import styles from "./userProfile.module.css";
import DateTimePicker from "react-datepicker";
import userSVG from "../../../assets/svg/user-solid.svg";
import { useState } from "react";
import { CustomInput } from "../../basic/input/input";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CustomButton } from "../../basic/btn/btn";
import { useEffect } from "react";
import axios from "axios";
import urlString from "../../../url";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDoctor, setIsDoctor] = useState(
    sessionStorage.getItem("userType") === "patient" ? false : true
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("token"));
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");
  const [hospital, setHospital] = useState("");
  const [position, setPosition] = useState("");
  const [specialization, setSpecialization] = useState("");

  const specializationHandler = (e) => {
    setSpecialization(e.target.value);
  };

  const positionHandler = (e) => {
    setPosition(e.target.value);
  };

  const hospitalHandler = (e) => {
    setHospital(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const countyHandler = (e) => {
    setCounty(e.target.value);
  };

  const countryHandler = (e) => {
    setCountry(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const editHandler = (e) => {
    setIsEditing(true);
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    if (isDoctor) {
      const response = await saveDoctor(
        userId,
        first_name,
        last_name,
        email,
        position,
        hospital,
        specialization
      );
    } else {
      const response = await savePacient(
        userId,
        first_name,
        last_name,
        email,
        date_of_birth,
        address,
        city,
        county,
        country
      );
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const savePacient = async (
    userId,
    first_name,
    last_name,
    email,
    date_of_birth,
    address,
    city,
    county,
    country
  ) => {
    const dateFormat = "YYYY-MM-DD";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const status = new Promise((resolve) => {
      axios
        .put(
          `${urlString}patient/${userId}`,
          {
            date_of_birth: moment(date_of_birth).format(dateFormat),
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: address,
            city: city,
            county: county,
            country: country,
            password: password,
          },
          {
            headers: headers,
          }
        )
        .catch((error) => {
          console.log(error);
          resolve(false);
        })
        .then(() => {
          setIsEditing(false);
          getProfileData();
        });
    });
    const result = await status;
    return result;
  };

  const saveDoctor = async (
    userId,
    first_name,
    last_name,
    email,
    position,
    hospital,
    specialization
  ) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const status = new Promise((resolve) => {
      axios
        .put(
          `${urlString}doctor/`,
          {
            id: userId,
            first_name: first_name,
            last_name: last_name,
            specialization: specialization,
            hospital: hospital,
            position: position,
          },
          {
            headers: headers,
          }
        )
        .catch((error) => {
          console.log(error);
          resolve(false);
        })
        .then(() => {
          setIsEditing(false);
          getProfileData();
        });
    });
    const result = await status;
    return result;
  };

  const getProfileData = () => {
    if (isDoctor) {
      fetch(`${urlString}doctor?id=${userId}`)
        .then((response) => response.json())
        .then((response) => {
          setFirstName(response.first_name);
          setLastName(response.last_name);
          setEmail(response.email);
          setPosition(response.position);
          setSpecialization(response.specialization);
          setHospital(response.hospital);
        });
    } else {
      fetch(`${urlString}patient/${userId}`)
        .then((response) => response.json())
        .then((response) => {
          setFirstName(response.first_name);
          setLastName(response.last_name);
          setEmail(response.email);
          setDob(new Date(response.date_of_birth));
          setPassword(response.password);
          setCity(response.city);
          setAddress(response.address);
          setCountry(response.country);
          setCounty(response.county);
        });
    }
  };

  return (
    <div
      className={`${styles["userContainer"]} d-flex flex-row justify-content-center`}
    >
      <div
        className={`d-flex flex-column justify-content-center ${styles["userCard"]} align-self-center`}
      >
        <div className={`align-self-center`}>
          <img
            src={userSVG}
            alt="user"
            className={`h-100 p-3 ${styles["userSVG"]}`}
          ></img>
        </div>
        <div className={`align-self-center ${styles[""]}`}>
          <h3 className="text-center">
            {first_name}&nbsp;{last_name}
          </h3>
        </div>
        <div className={`d-flex justify-content-center align-content-center`}>
          {isEditing && (
            <CustomButton
              title={"Save"}
              styleClass={"buttonSecondary"}
              type="button"
              handler={saveHandler}
            />
          )}
          {!isEditing && (
            <CustomButton
              title={"Edit"}
              styleClass={"buttonSecondary"}
              type="button"
              handler={editHandler}
            />
          )}
        </div>
      </div>
      <div
        className={`${styles["userDetails"]} d-flex flex-column justify-content-around p-4 align-self-center ps-5`}
      >
        <div className={`d-flex flex-row`}>
          <div className="d-flex flex-column g-2 ms-3 me-3">
            <label>First Name</label>
            <CustomInput
              disabled={!isEditing}
              type={"text"}
              hint="Please enter..."
              onChangeHandler={firstNameHandler}
              value={first_name}
            />
          </div>
          <div className="d-flex flex-column g-2 ms-3 me-3">
            <label>Last Name</label>
            <CustomInput
              disabled={!isEditing}
              type={"text"}
              hint="Please enter..."
              onChangeHandler={lastNameHandler}
              value={last_name}
            />
          </div>
          <div className="d-flex flex-column g-2 ms-3 me-3">
            <label>Email</label>
            <CustomInput
              disabled={true}
              type={"text"}
              hint="Please enter..."
              onChangeHandler={emailHandler}
              value={email}
            />
          </div>
          {!isDoctor && (
            <div
              className={`d-flex flex-column g-2 ms-3 me-3 ${styles["picker"]}`}
            >
              <label>Date of Birth</label>
              <DateTimePicker
                disabled={true}
                dateFormat="yyyy-MM-dd"
                selected={date_of_birth}
                onChange={(date) => {
                  setDob(date);
                }}
                maxDate={moment().toDate()}
              />
            </div>
          )}
        </div>

        <div className={`d-flex flex-row`}>
          {isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label className="">Position</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={positionHandler}
                value={position}
              />
            </div>
          )}
          {!isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label className="">Address</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={addressHandler}
                value={address}
              />
            </div>
          )}
          {isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label>Hospital</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={hospitalHandler}
                value={hospital}
              />
            </div>
          )}
          {!isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label>City</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={cityHandler}
                value={city}
              />
            </div>
          )}
          {isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label>Specialization</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={specializationHandler}
                value={specialization}
              />
            </div>
          )}
          {!isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label>State</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={countyHandler}
                value={county}
              />
            </div>
          )}
          {!isDoctor && (
            <div className="d-flex flex-column g-2 ms-3 me-3">
              <label>Country</label>
              <CustomInput
                disabled={!isEditing}
                type={"text"}
                hint="Please enter..."
                onChangeHandler={countryHandler}
                value={country}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
