import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import imageUrl from './../../../src/assets/island.png'
import { MdClose, MdEdit } from "react-icons/md";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ProfileEditModal({ setIsModalOpen, user, username, setUsername, firstName, setFirstName, lastName, setLastName, location, setLocation, about, setAbout, email, setEmail }) {
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate()

  const fileInput = useRef(null);


  const onCloseClick = () => setIsModalOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !username || !password || !passwordRepeat) {
      setErrorMessage("Required fields are missing.");
      return;
    }

    // Clear error message if form submission is successful
    setErrorMessage("");
  };


  
  const handleImageClick = () => {
    fileInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onHandleClickImage = () => {
    console.log("testing click for image upload")
  }


  const handleSubmitProfile = () => {
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        console.log(location)
        axiosDayVenture
            .patch(`/users/me/`, {username: username, first_name: firstName, last_name: lastName, location: location, about: about}, config)
            .then((res) => {
              console.log(res)
              setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }






  return (
    <Modal
      isOpen={true} // Set the isOpen prop to control the visibility of the modal
      onRequestClose={onCloseClick} // Handle the close event
      contentLabel="Edit Profile" // Optional label for accessibility
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          zIndex: "9999",
        },
        content: {
          position: "relative",
          background: "white",
          width: "90%",
          height: "75%",
          minWidth: "250px",
          maxWidth: "750px",
          borderRadius: "10px",
          overflow: "auto",
          margin: "auto",
        },
      }}
    >
      <div
        className="flex flex-col flex-grow justify-between gap-10 p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2>Edit Profile</h2>
          <MdClose style={{ position: "absolute", top: 0, right: 0, cursor: "pointer", margin: "10px" }} onClick={onCloseClick} size={30} />
        </div>

        

        <div className="flex flex-row justify-around">
          <div className="relative">
            <input type="file" ref={fileInput} onChange={handleImageChange} style={{ display: "none" }} />
            <img className={`h-32 w-32 rounded-full shadow appearance-none border text-venture-black leading-tight focus:outline-none focus:shadow-outline`} src={imageUrl} alt={"profile picture"} />
            <MdEdit
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              transform: "translate(50%, 50%)",
              fontSize: "1.875rem",
              color: "#FFF",
              cursor: "pointer",
              backgroundColor: "#00A987",
              borderRadius: "50%",
              padding: "0.3rem",
            }} onClick={handleImageClick} />
          </div>
          

          <div className="flex flex-col gap-3">
            
            
            <div className="flex flex-col h-full justify-evenly ">
              <Button onClickFunction={onHandleClickImage}>Upload</Button>
              <Button color="venture-gray">Remove</Button>
            </div>
          </div>
        </div>
        {selectedFile && (
          <p className="text-venture-green-hovered self-center">Selected file: {selectedFile.name}</p>
        )}

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={setFirstName}
            
          />
          <InputField
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={setLastName}
            
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            disabled={true}

            
          ></InputField>
          <InputField
            type="text"
            placeholder="username"
            onChange={setUsername}
            value={username}
            
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="location"
            placeholder="Location"
            value={location}
            onChange={setLocation}
            
          />

        </div>

        {isVisible ?         <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="password"
            placeholder="Password"
            onChange={setPassword}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            onChange={setPasswordRepeat}
          />
        </div> : <Button type={"submit"} onClickFunction={setIsVisible(true)}>Change Password</Button>}


        <textarea
          placeholder="About"
          onChange={(e) =>setAbout(e.target.value)}
          value={about}
          className={`shadow appearance-none border rounded py-2 px-3 text-venture-black leading-tight focus:outline-none focus:shadow-outline h-24 `} 
        />
        <div>
          <div className="flex justify-center  gap-3">
            <Button type={"submit"} onClickFunction={handleSubmitProfile}>SAVE</Button>
            <Button color="venture-red">DELETE ACCOUNT</Button>
          </div>

          {errorMessage && (
            <div className={"w-full h-1"}>
              <p className="signup-erro-message text-venture-red">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
