import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OrderState } from "../../Contexts";
export default function SinglePhysicianDisplay() {
  const { selectedAppointment } = OrderState();

  const [patientInfo, setPatientInfo] = useState("");
  const [singleAppointmentDetails, setSingleAppointmentDetails] = useState([]);
	const [pdfPath, setPdfPath] = useState("");
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const [prescriptions, setPrescriptions] = useState([
    {
      date: "14 Nov 2023",
      name: "Prescription 1",
      doctor: {
        name: "Dr. Ruby Perrin",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-01.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "13 Nov 2023",
      name: "Prescription 2",
      doctor: {
        name: "Dr. Darren Elder",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-02.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "12 Nov 2023",
      name: "Prescription 3",
      doctor: {
        name: "Dr. Deborah Angel",
        specialty: "Cardiology",
        avatar: "assets/img/doctors/doctor-thumb-03.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "11 Nov 2023",
      name: "Prescription 4",
      doctor: {
        name: "Dr. Sofia Brient",
        specialty: "Urology",
        avatar: "assets/img/doctors/doctor-thumb-04.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "10 Nov 2023",
      name: "Prescription 5",
      doctor: {
        name: "Dr. Marvin Campbell",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-05.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "9 Nov 2023",
      name: "Prescription 6",
      doctor: {
        name: "Dr. Katharine Berthold",
        specialty: "Orthopaedics",
        avatar: "assets/img/doctors/doctor-thumb-06.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "8 Nov 2023",
      name: "Prescription 7",
      doctor: {
        name: "Dr. Linda Tobin",
        specialty: "Neurology",
        avatar: "assets/img/doctors/doctor-thumb-07.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "7 Nov 2023",
      name: "Prescription 8",
      doctor: {
        name: "Dr. Paul Richard",
        specialty: "Dermatology",
        avatar: "assets/img/doctors/doctor-thumb-08.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "6 Nov 2023",
      name: "Prescription 9",
      doctor: {
        name: "Dr. John Gibbs",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-09.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      date: "5 Nov 2023",
      name: "Prescription 10",
      doctor: {
        name: "Dr. Olga Barlow",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-10.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    // Add more prescriptions here if needed
  ]);
  const [records, setRecords] = useState([
    {
      id: "#MR-0010",
      date: "14 Nov 2023",
      description: "Dental Filling",
      attachment: "dental-test.pdf",
      doctor: {
        name: "Dr. Ruby Perrin",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-01.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      id: "#MR-0009",
      date: "13 Nov 2023",
      description: "Teeth Cleaning",
      attachment: "dental-test.pdf",
      doctor: {
        name: "Dr. Darren Elder",
        specialty: "Dental",
        avatar: "assets/img/doctors/doctor-thumb-02.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      id: "#MR-0008",
      date: "12 Nov 2023",
      description: "General Checkup",
      attachment: "cardio-test.pdf",
      doctor: {
        name: "Dr. Deborah Angel",
        specialty: "Cardiology",
        avatar: "assets/img/doctors/doctor-thumb-03.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      id: "#MR-0007",
      date: "11 Nov 2023",
      description: "General Test",
      attachment: "general-test.pdf",
      doctor: {
        name: "Dr. Sofia Brient",
        specialty: "Urology",
        avatar: "assets/img/doctors/doctor-thumb-04.jpg",
        profileLink: "doctor-profile.html",
      },
    },
    {
      id: "#MR-0006",
      date: "10 Nov 2023",
      description: "Eye Test",
      attachment: "eye-test.pdf",
      doctor: {
        name: "Dr. Marvin Campbell",
        specialty: "Ophthalmology",
        avatar: "assets/img/doctors/doctor-thumb-05.jpg",
        profileLink: "doctor-profile.html",
      },
    },
  ]);

  const [observations, setObservations] = useState([
    {
      srNo: "#INV-0010",

      name: "Observation 1",
      date: "14 Nov 2023",
    },
    {
      srNo: "#INV-0009",

      name: "Observation 2",
      date: "13 Nov 2023",
    },
    // Add more observations as needed
  ]);

  const { id } = useParams();

  const getSingleAppointment = async () => {
    const isAuthenticated = localStorage.getItem("token");

    try {
      const appointment = await axios.get(
        `https://healthcare-backend-o4vb.onrender.com/appointment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(`Single Appointment `,appointment);
      setSingleAppointmentDetails(appointment?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const openPdf = (path) => {
    		setPdfPath(`https://healthcare-backend-o4vb.onrender.com/files/${path}`);
        setIsPdfOpen(true);

	};

  const closePdf = () => {
		setIsPdfOpen(false);
		setPdfPath("");
  };

  const downloadFile = async (path) => {
    const isAuthenticated = localStorage.getItem("token");
    
    try {
      const response = await axios.get(`https://healthcare-backend-o4vb.onrender.com/files/${path}`, {
        responseType: 'blob',
        headers: {
          Authorization: isAuthenticated,
        },
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', path.split('/').pop()); // Use the file name as the download name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };
  
  //   console.log(singleAppointmentDetails)
  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);

    getSingleAppointment();
  }, []);

  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Dashboard</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src={
                            patientInfo?.profilePicture ||
                            "/assets/img/banners/defualtImgjpg.jpg"
                          }
                          alt="/assets/img/banners/defualtImgjpg.jpg"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{patientInfo?.userId?.name}</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake" />
                            {new Date(patientInfo?.dob).toDateString(
                              patientInfo?.patient?.dob
                            )}
                            , {patientInfo?.age} years
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-map-marker-alt" />{" "}
                            {patientInfo?.city}, {patientInfo?.contry}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li className="active">
                          <Link to="/user/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>

                       

                        {/* <li>
                          <Link to="/user/orders">
                            <i className="fas fa-list-alt" />
                            <span>Orders</span>
                            <small className="unread-msg">7</small>
                          </Link>
                        </li> */}
                        <li>
                          <Link to="/user/medical-records">
                            <i className="fas fa-clipboard" />
                            <span>Add Medical Records</span>
                          </Link>
                        </li>

                        <li>
                          <Link to="/user/profile-settings">
                            <i className="fas fa-user-cog" />
                            <span>Profile Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/change-password">
                            <i className="fas fa-lock" />
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/login">
                            <i className="fas fa-sign-out-alt" />
                            <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body pt-0">
                    <nav className="user-tabs mb-4">
                      <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#pat_prescriptions"
                            data-bs-toggle="tab">
                            Prescriptions
                          </a>
                        </li>
                        
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#pat_medical_records"
                            data-bs-toggle="tab">
                            <span className="med-records"> Reports</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#pat_observation"
                            data-bs-toggle="tab">
                            Observation Notes
                          </a>
                        </li>
                      </ul>
                    </nav>

                    <div className="tab-content pt-0">
                      <div
                        className="tab-pane fade show active"
                        id="pat_prescriptions">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>Quantities</th>
                                    <th>Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {singleAppointmentDetails?.prescriptions?.map(
                                    (prescription, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{prescription.name}</td>
                                        <td>{prescription.quantity}</td>
                                        <td>
                                          {prescription.times.map(
                                            (time, index) => (
                                              <span key={index}>{time} </span>
                                            )
                                          )}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div id="pat_medical_records" className="tab-pane fade">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Sr</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Attachment</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {singleAppointmentDetails?.reports?.map(   
                                  (reports, index)=> (
                                  <tr key={index}>
                                      <td>
                                        <a href="javascript:void(0);">
                                          {index+1}
                                        </a>
                                      </td>
                                      <td>{new Date(reports.date).toLocaleDateString()}</td>

                                      <td>{reports.description}</td>
                                      <td>
                                        <a href="#">{reports.attachment}</a>
                                      </td>
                                      {/* <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href={reports.doctor.profileLink}
                                            className="avatar avatar-sm me-2">
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={record.doctor.avatar}
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href={record.doctor.profileLink}>
                                            {record.doctor.name}{" "}
                                            <span>
                                              {record.doctor.specialty}
                                            </span>
                                          </a>
                                        </h2>
                                      </td> */}
                                      <td></td>
                                      <td>
                                        <div className="table-action">
                                        <button
            onClick={() => downloadFile(reports.path)}
            className="btn btn-primary btn-sm"
            title="Download attachment"
          >
            <i className="fa fa-download" />
          </button>
                                          <button
																							className="btn btn-sm bg-info-light me-2"
																							onClick={() =>
                                                
                                                
																								openPdf(
																									reports.path,
																								)
																							}
																						>
																							<i className="far fa-eye" />{" "}
																							View
																						</button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {isPdfOpen && (
			                      <div className="pdf-container w-full h-500 ">
                              <iframe
                                style={{
                                  width: "100%",
                                  height: "600px",
                                }}
                                id="pdf-iframe"
                                className="w-full h-500"
                                frameBorder="0"
                                src={pdfPath}
                              ></iframe>
                              <button
                                onClick={closePdf}
                                className="btn btn-sm bg-danger-light m-3"
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div id="pat_observation" className="tab-pane fade">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Sr No</th>
                                    <th>Observation</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {singleAppointmentDetails?.observations?.map(
                                    (observation, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{observation}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="appt_details">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Prescription Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <a href="path_to_your_pdf.pdf" download>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade custom-modal" id="observation">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Observations</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, temporibus esse expedita illum explicabo voluptates
                consectetur odit maxime voluptatibus sequi vel porro!
                Consequatur ut totam dolores. Dolor beatae mollitia modi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
          className="progress-wrap active-progress"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          <svg
            className="progress-circle svg-content"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path
              d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              style={{
                transition: "stroke-dashoffset 10ms linear 0s",
                strokeDasharray: "307.919px, 307.919px",
                strokeDashoffset: "228.265px",
              }}
            ></path>
          </svg>
        </div>
    </div>
  );
}
