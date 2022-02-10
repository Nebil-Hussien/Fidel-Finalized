import { CameraAlt, Cancel, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import axios from "../../axios";
import { requests } from "../../constants/requests";
import Loader from "../../components/Loader/Loader";
import { genderConvertor } from "../../helpers/genderConvertor";
import Form from "../../components/Form/Form";
import { isEmpty } from "../../helpers/isEmpty";
import { isTutor, _id } from "../../utils/token";
import Rating from "../../components/Rating/Rating";

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfileData] = useState({});
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // References

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subCity, setSubCity] = useState("");
  const [wereda, setWereda] = useState("");
  const [gender, setGender] = useState("");
  const [userName, setUserName] = useState("");

  const fetchProfileData = async () => {
    try {
      const { data } = await axios.get(requests.getProfile);
      if (data.success) {
        setProfileData(data.results);
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  const getRate = async () => {
    try {
      const { data } = await axios.get(requests.getRate, {
        params: { tutor_id: _id },
      });
      if (data.success) {
        setRating(data.results);
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  const updateProfile = async () => {
    if (isEmpty(fullName, email, gender, subCity, wereda, phone, userName)) {
      return alert("Please full all fields!");
    }
    let userType;
    if (isTutor) {
      userType = "tutor";
    } else {
      userType = "student";
    }
    const profileData = {
      [userType]: {
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1],
        gender: gender,
        dateOfBirth: profile.dateOfBirth,
        address: {
          subCity,
          wereda,
          houseNumber: profile.address.houseNumber,
          homePhoneNumber: profile.address.homePhoneNumber,
        },
        mobile_no: phone,
        email,
        userName,
      },
    };
    setIsUpdating(true);
    try {
      const { data } = await axios.post(requests.updateProfile, profileData);
      if (data.success) {
        setEditing(false);
        fetchProfileData();
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await fetchProfileData();
    if (isTutor) {
      await getRate();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    if (editing) {
      updateProfile();
    } else {
      setEditing(true);
      setFullName(`${profile.firstName} ${profile.lastName}`);
      setEmail(profile.email);
      setGender(profile.gender);
      setSubCity(profile.address.subCity);
      setWereda(profile.address.wereda);
      setPhone(profile.mobile_no);
      setUserName(profile.userName);
    }
  };
  const style = {
    display: "inline-block",
    width: "30rem",
    padding: ".5rem",
  };

  const updateInput = (type, value, cb, options = []) => {
    if (type === "select") {
      return (
        <Form.Select
          style={style}
          value={value}
          onChange={cb}
          options={options}
        />
      );
    } else {
      return (
        <Form.Control style={style} type={type} value={value} onChange={cb} />
      );
    }
  };

  return (
    <>
      <Header />
      {!isLoading ? (
        <div className="profile">
          <div className="profile__user">
            <div className="profile__user-image-container">
              <img
                style={{ cursor: editing ? "pointer" : "unset" }}
                className="profile__user-image"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt="user"
              />
              {editing && (
                <div className="profile__user-image-edit">
                  <CameraAlt className="profile__user-image-edit-camera" />
                </div>
              )}
            </div>
            <h2 className="heading-secondary">
              {!editing
                ? `${profile.firstName} ${profile.lastName}`
                : updateInput("text", fullName, (e) => {
                    setFullName(e.target.value);
                  })}
            </h2>
            {isTutor && (
              <>
                <Rating value={rating} readOnly />
                <p className="paragraph">Rating: {rating}</p>
              </>
            )}
          </div>
          <ul className="profile__detail">
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">Email:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? profile.email
                  : updateInput("email", email, (e) => {
                      setEmail(e.target.value);
                    })}
              </span>
            </li>
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">Phone:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? profile.mobile_no
                  : updateInput("text", phone, (e) => {
                      setPhone(e.target.value);
                    })}
              </span>
            </li>
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">Sub City:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? profile?.address?.subCity
                  : updateInput("text", subCity, (e) => {
                      setSubCity(e.target.value);
                    })}
              </span>
            </li>
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">Wereda:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? profile?.address?.wereda
                  : updateInput("text", wereda, (e) => {
                      setWereda(e.target.value);
                    })}
              </span>
            </li>
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">Gender:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? genderConvertor(profile.gender)
                  : updateInput(
                      "select",
                      gender,
                      (e) => {
                        setGender(e.target.value);
                      },
                      [
                        { value: "M", name: "Male" },
                        { value: "F", name: "Female" },
                      ],
                    )}
              </span>
            </li>
            <li className="profile__detail-item">
              <span className="profile__detail-item__label">User Name:</span>
              <span className="profile__detail-item__value">
                {!editing
                  ? profile.userName
                  : updateInput("text", userName, (e) => {
                      setUserName(e.target.value);
                    })}
              </span>
            </li>
          </ul>
          <div className="profile__button">
            <Button
              loading={isUpdating}
              disabled={isUpdating}
              success={editing}
              onClick={handleEdit}
            >
              <Edit className="btn__icon small" /> {editing ? "Update" : "Edit"}
            </Button>
            <div className="sized-box w-lg"></div>
            {editing && (
              <Button danger onClick={() => setEditing(false)}>
                <Cancel className="btn__icon small" /> Cancel
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfilePage;
