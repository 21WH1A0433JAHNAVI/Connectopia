import React, { useState } from "react";
import './JoinScreen.css'
import {AiOutlineVideoCameraAdd} from 'react-icons/ai'
// import Hero from '../assets/undraw_remote_meeting_re_abe7.svg'


function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  const [type, setType] = useState(""); // State to store the participant type (host or participant)

  const onClick = async (mode, participantType) => {
    setMode(mode);
    setType(participantType); // Set the participant type (host or participant)
    console.log(participantType)
    await getMeetingAndToken(meetingId, participantType); // Pass the participant type to the function
  };

  return (
    <div className="">
      
    <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container">
    <a className="navbar-brand" href="/">
      <img
        src={require("../assets/connectopia_logo.png")}
        height="30"
        alt="Connectopia"
        loading="lazy"
        className="me-1 text-dark font-weight-bold"
      />
       Connectopia.
    </a>
    <div className="collapse navbar-collapse " id="navbarNav">
    <ul className="navbar-nav text-center">
      <li className="nav-item active ">
        <a className="nav-link text-dark font-weight-bold " href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-dark font-weight-bold" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-dark font-weight-bold" href="#">Pricing</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
    
    <div className="container text-dark col-lg-5 text-center mt-5">
      <h1 className="">Empowering Tutors with <br/> Advanced Virtual Classrooms</h1>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
        className="bg-light w-50 form-control mx-auto mt-4"
      />
      <br />
      <button className="btn btn-join" onClick={() => onClick("CONFERENCE", "host")}>
        Join
      </button>{" "}
      {" "}
      {/* <button className="btn btn-join" onClick={() => onClick("VIEWER", "participant")}>
        Join as Viewer
      </button> */}
      <br />
      <br />
      <button className="btn btn-create" onClick={() => onClick("CONFERENCE", "host")}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="me-2">
            <AiOutlineVideoCameraAdd />
          </div> 
          
           New Meeting
          
        </div>
      </button>
    </div>
    <p className="w-50 mx-auto text-center mt-5">Introducing Connectopia, the ultimate video conferencing application designed specifically for tutors to create immersive and interactive virtual classrooms. With a rich array of cutting-edge features, TeachConnect is tailored to meet the unique needs of educators and learners alike.</p>
    <div className="w-25 container mx-auto mt-5">
      <svg data-name="Layer 1" viewBox="0 0 813.04 658.85" xmlns="http://www.w3.org/2000/svg">
        <path transform="translate(-193.48 -120.58)" d="m1001.7 156.05h-803.38a4.5049 4.5049 0 0 1-4.5-4.5v-26.47a4.5049 4.5049 0 0 1 4.5-4.5h803.38a4.5049 4.5049 0 0 1 4.5 4.5v26.47a4.5049 4.5049 0 0 1-4.5 4.5z" fill="#e4e4e4"/>
        <circle cx="26.442" cy="16.444" r="6.3889" fill="#fff" data-name="Ellipse 90"/>
        <circle cx="50.692" cy="16.444" r="6.3889" fill="#fff" data-name="Ellipse 91"/>
        <circle cx="74.943" cy="16.444" r="6.3889" fill="#fff" data-name="Ellipse 92"/>
        <path transform="translate(-193.48 -120.58)" d="m995.61 779.42h-357.31a10.922 10.922 0 0 1-10.91-10.91v-252.58a10.922 10.922 0 0 1 10.91-10.91h357.31a10.922 10.922 0 0 1 10.91 10.91v252.58a10.922 10.922 0 0 1-10.91 10.91z" fill="#e6e6e6"/>
        <path transform="translate(-193.48 -120.58)" d="m980.73 519.9h-327.56a10.929 10.929 0 0 0-10.915 10.915v222.82a10.929 10.929 0 0 0 10.915 10.915h327.56a10.922 10.922 0 0 0 10.907-10.915v-222.82a10.922 10.922 0 0 0-10.907-10.915z" fill="#fff"/>
        <circle transform="translate(-169.8 1141.1) rotate(-77.07)" cx="803.93" cy="615.98" r="43.987" fill="#9e616a"/>
        <path transform="translate(-193.48 -120.58)" d="m930.44 723.13a43.187 43.187 0 0 0-30.176-32.521l-0.03277-0.01767a18.835 18.835 0 0 0-4.5105-1.5475l-52.862-10.816-10.591-11.364-45.066 2.8765-4.7043 13.072-51.767 23.007 0.85818-0.60191a54.62 54.62 0 0 0-6.4572 3.0947l-0.26218 0.1167a16.762 16.762 0 0 0-4.1149 2.6248c-13.164 9.1363-21.862 23.802-22.184 40.154l-1.3666 13.343h242.03z" fill="#15c39a"/>
        <path transform="translate(-193.48 -120.58)" d="m852.07 592.41c-3.601-11.248-14.137-20.746-25.943-20.444 0.91987-2.8057-0.65114-5.9517-3.0023-7.7374-2.3516-1.7858-5.3249-2.5-8.2158-3.1024-5.9752-1.2452-12.202-2.1959-18.143-0.79294-5.9404 1.4029-11.57 5.6646-12.907 11.62-5.4104-5.0715-15.415-3.6685-19.222 2.6958-1.9591 3.2752-2.2367 7.6754-0.11948 10.85 2.1037 3.1546 6.0884 4.575 9.8759 4.7536 3.7879 0.1788 7.5382-0.67115 11.309-1.0672 9.0078-0.946 18.522 0.86949 25.804 6.2552 7.2819 5.3857 11.935 14.621 10.64 23.585 2.911-1.8603 7.1044-0.56839 9.1374 2.2245s2.1935 6.609 1.2491 9.932c-0.94445 3.3229-2.8612 6.2715-4.7514 9.163q-5.2208 7.9867-10.441 15.973l1.4256 0.9484c5.2503 2.2141 10.93-1.9252 14.753-6.1509a85.2 85.2 0 0 0 15.357-24.164c4.5653-10.892 6.7963-23.295 3.1949-34.543z" fill="#2f2e41"/>
        <path transform="translate(-193.48 -120.58)" d="m662.32 583.84h-454.95a13.907 13.907 0 0 1-13.891-13.891v-321.6a13.907 13.907 0 0 1 13.891-13.891h454.95a13.907 13.907 0 0 1 13.891 13.891v321.6a13.907 13.907 0 0 1-13.891 13.891z" fill="#e6e6e6"/>
        <path transform="translate(-193.48 -120.58)" d="m643.38 253.4h-417.06a13.915 13.915 0 0 0-13.897 13.897v283.71a13.915 13.915 0 0 0 13.897 13.897h417.06a13.906 13.906 0 0 0 13.887-13.897v-283.71a13.906 13.906 0 0 0-13.887-13.897z" fill="#fff"/>
        <path transform="translate(-193.48 -120.58)" d="m494.86 386.54-0.76923 1.3866c6.8467-16.874 0.62081-37.666-11.593-50.39-12.214-12.723-29.193-18.54-45.912-20.848-12.412-1.7131-25.295-1.6636-37.096 2.8827-17.09 6.5837-30.147 21.824-41.049 37.679-4.9866 7.2516-9.8894 15.519-9.3927 24.583 0.46116 8.4112 5.4539 15.549 9.5425 22.685 4.0891 7.1362 7.5036 15.99 4.569 23.778-1.7487 4.6414-5.4445 7.9842-8.4432 11.781-2.9987 3.7968-5.4656 8.9288-4.017 13.693 1.1719 3.8536 4.6973 6.3883 8.3229 7.2332 3.6252 0.84483 7.3861 0.29279 11.058-0.262l95.3-14.398a40.615 40.615 0 0 0 29.481-59.803z" fill="#2f2e41"/>
        <circle cx="230.49" cy="278.51" r="46.594" fill="#ffb9b9"/>
        <path transform="translate(-193.48 -120.58)" d="m540.19 504.56a40.036 40.036 0 0 0-33.988-23.34l-12.986-0.786 0.03137 0.13613v6e-5l-33.011-19.858c0.81183 0.9297-53.695 2.8765-53.695 2.8765l-20.224 17.448-8.4816 0.51342a40.035 40.035 0 0 0-33.988 23.34l-27.543 60.336h54.896l1.2735-5.481q2.078 2.5319 4.0301 5.151h191.23z" fill="#15c39a"/>
        <path transform="translate(-193.48 -120.58)" d="m468.17 355.84c-1.2028-6.3628-7.6923-9.273-13.252-10.683a127.66 127.66 0 0 0-49.385-2.7119c-12.015 1.7134-24.314 5.4914-33.032 14.869-6.799 7.3143-10.913 17.792-11.233 28.61-0.18634 6.305 0.94105 12.866 4.0779 18.176 3.1373 5.3098 8.4844 9.1612 14.004 9.026l0.559 1.9442c23.393-3.2593 45.124-17.815 58.81-39.392a50.467 50.467 0 0 1-14.744 23.819 91.867 91.867 0 0 0 39.657-30.563c2.7674-3.6732 5.4544-8.254 4.5395-13.095z" fill="#2f2e41"/>
        <path transform="translate(-193.48 -120.58)" d="m977.93 132.62h-27.925a2.0685 2.0685 0 1 1 0-4.137h27.925a2.0685 2.0685 0 0 1 0 4.137z" fill="#fff"/>
        <path transform="translate(-193.48 -120.58)" d="m977.93 140.38h-27.925a2.0685 2.0685 0 1 1 0-4.137h27.925a2.0685 2.0685 0 0 1 0 4.137z" fill="#fff"/>
        <path transform="translate(-193.48 -120.58)" d="m977.93 148.14h-27.925a2.0685 2.0685 0 1 1 0-4.137h27.925a2.0685 2.0685 0 0 1 0 4.137z" fill="#fff"/>
      </svg>
      

    </div>
    <footer className="text-center bg-light p-2 mt-5">
    
    <p className="h6">&copy; 2023 Connectopia. All rights reserved.</p>
  </footer>

    </div>
  );
}

export default JoinScreen;
