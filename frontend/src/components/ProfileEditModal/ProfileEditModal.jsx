import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import imageUrl from './../../../src/assets/island.png'
import { MdClose, MdEdit } from "react-icons/md";

function ProfileEditModal({ setIsModalOpen }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInput = useRef(null);

  const onCloseClick = () => setIsModalOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !username || !password) {
      setErrorMessage("Required fields are missing.");
      return;
    }

    // Clear error message if form submission is successful
    setErrorMessage("");
  };

  // Add error handling to input onChange functions
  const handleFirstNameChange = (e) => {
    if (!e.target.value) {
      setErrorMessage("First name is a required field.");
    } else {
      setErrorMessage("");
      setFirstName(e.target.value);
    }
  };

  const handleLastNameChange = (e) => {
    if (!e.target.value) {
      setErrorMessage("Last name is a required field.");
    } else {
      setErrorMessage("");
      setLastName(e.target.value);
    }
  };

  const handleUsernameChange = (e) => {
    if (!e.target.value) {
      setErrorMessage("Username is a required field.");
    } else {
      setErrorMessage("");
      setUsername(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    if (!e.target.value) {
      setErrorMessage("Password is a required field.");
    } else {
      setErrorMessage("");
      setPassword(e.target.value);
    }
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
        },
        content: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: "white",
          width: "30%",
          height: "80%",
          minWidth: "350px",
          maxHeight: "100%",
          borderRadius: "10px",
          overflow: "auto",
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
              <Button>Upload</Button>
              <Button color="venture-red">Remove</Button>
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
            onChange={setFirstName}
            
          />
          <InputField
            type="text"
            placeholder="Last Name"
            onChange={setLastName}
            
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            disabled={setEmail}
            
          />
          <InputField
            type="text"
            placeholder="Username"
            onChange={setUsername}
            
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="location"
            placeholder="Location"
            value={location}
            disabled={setLocation}
            
          />
          <InputField
            type="phone"
            placeholder="Phone"
            onChange={setPhone}
            
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center w-full justify-around">
          <InputField
            type="password"
            placeholder="Password"
            onChange={setPassword}
            
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            onChange={setPassword}
            
          />
        </div>

        <textarea
          placeholder="About"
          onChange={setAbout}
          className={`shadow appearance-none border rounded py-2 px-3 text-venture-black leading-tight focus:outline-none focus:shadow-outline h-24 `} 
        />
        <div>
          <div className="flex justify-center  gap-3">
            <Button type={"submit"}>SAVE</Button>
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
