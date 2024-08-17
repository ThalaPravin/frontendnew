import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../api/otp.ts";

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const countryCodes = [

  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
 
  { code: "+44", name: "UK" },
  { code: "+61", name: "Australia" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+55", name: "Brazil" },
  { code: "+7", name: "Russia" },
  { code: "+34", name: "Spain" },
  { code: "+82", name: "South Korea" },
  { code: "+27", name: "South Africa" },
  { code: "+64", name: "New Zealand" },
  { code: "+52", name: "Mexico" },
  { code: "+31", name: "Netherlands" },
  { code: "+32", name: "Belgium" },
  { code: "+46", name: "Sweden" },
  { code: "+47", name: "Norway" },
  { code: "+48", name: "Poland" },
  { code: "+351", name: "Portugal" },
  { code: "+30", name: "Greece" },
  { code: "+20", name: "Egypt" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+90", name: "Turkey" },
  { code: "+62", name: "Indonesia" },
  { code: "+60", name: "Malaysia" },
  { code: "+63", name: "Philippines" },
  { code: "+66", name: "Thailand" },
  { code: "+65", name: "Singapore" },
  { code: "+358", name: "Finland" },
  { code: "+45", name: "Denmark" },
  { code: "+41", name: "Switzerland" },
  { code: "+43", name: "Austria" },
  { code: "+36", name: "Hungary" },
  { code: "+353", name: "Ireland" },
  { code: "+420", name: "Czech Republic" },
  { code: "+421", name: "Slovakia" },
  { code: "+375", name: "Belarus" },
  { code: "+380", name: "Ukraine" },
  { code: "+48", name: "Poland" },
  { code: "+359", name: "Bulgaria" },
  { code: "+386", name: "Slovenia" },
  { code: "+372", name: "Estonia" },
  { code: "+371", name: "Latvia" },
  { code: "+370", name: "Lithuania" },
  { code: "+64", name: "New Zealand" },
  { code: "+61", name: "Australia" },
  { code: "+93", name: "Afghanistan" },
  { code: "+355", name: "Albania" },
  { code: "+213", name: "Algeria" },
  { code: "+376", name: "Andorra" },
  { code: "+244", name: "Angola" },
  { code: "+54", name: "Argentina" },
  { code: "+374", name: "Armenia" },
  { code: "+297", name: "Aruba" },
  { code: "+43", name: "Austria" },
  { code: "+994", name: "Azerbaijan" },
  { code: "+973", name: "Bahrain" },
  { code: "+880", name: "Bangladesh" },
  { code: "+32", name: "Belgium" },
  { code: "+501", name: "Belize" },
  { code: "+229", name: "Benin" },
  { code: "+975", name: "Bhutan" },
  { code: "+591", name: "Bolivia" },
  { code: "+387", name: "Bosnia and Herzegovina" },
  { code: "+267", name: "Botswana" },
  { code: "+55", name: "Brazil" },
  { code: "+673", name: "Brunei" },
  { code: "+359", name: "Bulgaria" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+257", name: "Burundi" },
  { code: "+855", name: "Cambodia" },
  { code: "+237", name: "Cameroon" },
  { code: "+1", name: "Canada" },
  { code: "+238", name: "Cape Verde" },
  { code: "+236", name: "Central African Republic" },
  { code: "+235", name: "Chad" },
  { code: "+56", name: "Chile" },
  { code: "+86", name: "China" },
  { code: "+57", name: "Colombia" },
  { code: "+269", name: "Comoros" },
  { code: "+243", name: "Congo (DRC)" },
  { code: "+242", name: "Congo (Republic)" },
  { code: "+682", name: "Cook Islands" },
  { code: "+506", name: "Costa Rica" },
  { code: "+385", name: "Croatia" },
  { code: "+53", name: "Cuba" },
  { code: "+357", name: "Cyprus" },
  { code: "+420", name: "Czech Republic" },
  { code: "+45", name: "Denmark" },
  { code: "+253", name: "Djibouti" },
  { code: "+1767", name: "Dominica" },
  { code: "+1-809", name: "Dominican Republic" },
  { code: "+593", name: "Ecuador" },
  { code: "+20", name: "Egypt" },
  { code: "+503", name: "El Salvador" },
  { code: "+240", name: "Equatorial Guinea" },
  { code: "+291", name: "Eritrea" },
  { code: "+372", name: "Estonia" },
  { code: "+251", name: "Ethiopia" },
  { code: "+500", name: "Falkland Islands" },
  { code: "+298", name: "Faroe Islands" },
  { code: "+679", name: "Fiji" },
  { code: "+358", name: "Finland" },
  { code: "+33", name: "France" },
  { code: "+241", name: "Gabon" },
  { code: "+220", name: "Gambia" },
  { code: "+995", name: "Georgia" },
  { code: "+49", name: "Germany" },
  { code: "+233", name: "Ghana" },
  { code: "+350", name: "Gibraltar" },
  { code: "+30", name: "Greece" },
  { code: "+299", name: "Greenland" },
  { code: "+1473", name: "Grenada" },
  { code: "+502", name: "Guatemala" },
  { code: "+224", name: "Guinea" },
  { code: "+245", name: "Guinea-Bissau" },
  { code: "+592", name: "Guyana" },
  { code: "+509", name: "Haiti" },
  { code: "+504", name: "Honduras" },
  { code: "+852", name: "Hong Kong" },
  { code: "+36", name: "Hungary" },
  { code: "+354", name: "Iceland" },
  { code: "+91", name: "India" },
  { code: "+62", name: "Indonesia" },
  { code: "+98", name: "Iran" },
  { code: "+964", name: "Iraq" },
  { code: "+353", name: "Ireland" },
  { code: "+972", name: "Israel" },
  { code: "+39", name: "Italy" },
  { code: "+225", name: "Ivory Coast" },
  { code: "+1876", name: "Jamaica" },
  { code: "+81", name: "Japan" },
  { code: "+962", name: "Jordan" },
  { code: "+7", name: "Kazakhstan" },
  { code: "+254", name: "Kenya" },
  { code: "+686", name: "Kiribati" },
  { code: "+383", name: "Kosovo" },
  { code: "+965", name: "Kuwait" },
  { code: "+996", name: "Kyrgyzstan" },
  { code: "+856", name: "Laos" },
  { code: "+371", name: "Latvia" },
  { code: "+961", name: "Lebanon" },
  { code: "+266", name: "Lesotho" },
  { code: "+231", name: "Liberia" },
  { code: "+218", name: "Libya" },
  { code: "+423", name: "Liechtenstein" },
  { code: "+370", name: "Lithuania" },
  { code: "+352", name: "Luxembourg" },
  { code: "+853", name: "Macau" },
  { code: "+389", name: "Macedonia" },
  { code: "+261", name: "Madagascar" },
  { code: "+265", name: "Malawi" },
  { code: "+60", name: "Malaysia" },
  { code: "+960", name: "Maldives" },
  { code: "+223", name: "Mali" },
  { code: "+356", name: "Malta" },
  { code: "+692", name: "Marshall Islands" },
  { code: "+222", name: "Mauritania" },
  { code: "+230", name: "Mauritius" },
  { code: "+52", name: "Mexico" },
  { code: "+691", name: "Micronesia" },
  { code: "+373", name: "Moldova" },
  { code: "+377", name: "Monaco" },
  { code: "+976", name: "Mongolia" },
  { code: "+382", name: "Montenegro" },
  { code: "+212", name: "Morocco" },
  { code: "+258", name: "Mozambique" },
  { code: "+95", name: "Myanmar" },
  { code: "+264", name: "Namibia" },
  { code: "+674", name: "Nauru" },
  { code: "+977", name: "Nepal" },
  { code: "+31", name: "Netherlands" },
  { code: "+64", name: "New Zealand" },
  { code: "+505", name: "Nicaragua" },
  { code: "+227", name: "Niger" },
  { code: "+234", name: "Nigeria" },
  { code: "+683", name: "Niue" },
  { code: "+850", name: "North Korea" },
  { code: "+47", name: "Norway" },
  { code: "+968", name: "Oman" },
  { code: "+92", name: "Pakistan" },
  { code: "+680", name: "Palau" },
  { code: "+970", name: "Palestine" },
  { code: "+507", name: "Panama" },
  { code: "+675", name: "Papua New Guinea" },
  { code: "+595", name: "Paraguay" },
  { code: "+51", name: "Peru" },
  { code: "+63", name: "Philippines" },
  { code: "+48", name: "Poland" },
  { code: "+351", name: "Portugal" },
  { code: "+1", name: "Puerto Rico" },
  { code: "+974", name: "Qatar" },
  { code: "+40", name: "Romania" },
  { code: "+7", name: "Russia" },
  { code: "+250", name: "Rwanda" },
  { code: "+685", name: "Samoa" },
  { code: "+378", name: "San Marino" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+221", name: "Senegal" },
  { code: "+381", name: "Serbia" },
  { code: "+248", name: "Seychelles" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+65", name: "Singapore" },
  { code: "+421", name: "Slovakia" },
  { code: "+386", name: "Slovenia" },
  { code: "+677", name: "Solomon Islands" },
  { code: "+252", name: "Somalia" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+34", name: "Spain" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+249", name: "Sudan" },
  { code: "+597", name: "Suriname" },
  { code: "+268", name: "Swaziland" },
  { code: "+46", name: "Sweden" },
  { code: "+41", name: "Switzerland" },
  { code: "+963", name: "Syria" },
  { code: "+886", name: "Taiwan" },
  { code: "+992", name: "Tajikistan" },
  { code: "+255", name: "Tanzania" },
  { code: "+66", name: "Thailand" },
  { code: "+670", name: "Timor-Leste" },
  { code: "+228", name: "Togo" },
  { code: "+676", name: "Tonga" },
  { code: "+1868", name: "Trinidad and Tobago" },
  { code: "+216", name: "Tunisia" },
  { code: "+90", name: "Turkey" },
  { code: "+993", name: "Turkmenistan" },
  { code: "+688", name: "Tuvalu" },
  { code: "+256", name: "Uganda" },
  { code: "+380", name: "Ukraine" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+44", name: "United Kingdom" },
  { code: "+1", name: "United States" },
  { code: "+598", name: "Uruguay" },
  { code: "+998", name: "Uzbekistan" },
  { code: "+678", name: "Vanuatu" },
  { code: "+58", name: "Venezuela" },
  { code: "+84", name: "Vietnam" },
  { code: "+967", name: "Yemen" },
  { code: "+260", name: "Zambia" },
  { code: "+263", name: "Zimbabwe" },
];


const Main = (UserInfo) => {
  const initialMessage = { type: "", text: "" };
  const [code, setCode] = useState(countryCodes[0].code); // Default to first country code
  const [isVerified, setVerified] = useState(false);
  const [pno, setPno] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {

    const verifyUser = async () => {
      try {
        const response = await fetch(`https://healthcare-backend-o4vb.onrender.com/user/verifyMobile/${UserInfo._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserInfo }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Verified at backend", result);
        } else {
          console.error('Failed to verify user');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (isVerified) {
      verifyUser();
    }
  }, [isVerified, UserInfo]);

  const handleResendOtp = async () => {
    if (!pno || !code) return;

    const result = await sendOtp({ code, phone: pno });
    if (result.status) {
      setIsOtpVisible(true);
      setMessage({ type: "success", text: "OTP resent successfully" });

      setTimeout(() => setMessage(initialMessage), 2000);
    }
  };

  const handleBtnClick = async () => {
    if (!pno || !code) return;

    if (!isOtpVisible) {
      const result = await sendOtp({ code, phone: pno });
      if (result?.payload?.status) {
        setIsOtpVisible(true);
      }
    } else {
      if (!otp) return;
      const result = await verifyOtp({ code, phone: pno, otp });
      console.log(result);
      if (result?.payload?.status === 'approved') {
        setVerified(true);
        setMessage({ type: "success", text: "OTP is Verified" });
        setIsOtpVisible(false);
        setOtp("");
      } else {
        setMessage({ type: "error", text: "Could not verify OTP" });
        setOtp("");
      }

      setTimeout(() => setMessage(initialMessage), 2000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "35vh",
      }}
    >
      {isVerified ? (
        <div>
          <h3 style={{ marginLeft: 10, color: "#9f9f9f" }}>OTP is Verified</h3>
        </div>
      ) : (
        <div
          style={{
            padding: 25,
            flex: 1,
            marginTop: 20,
          }}
        >
          {!isOtpVisible ? (
            <h3 style={{ marginLeft: 10, color: "#9f9f9f" }}>Send OTP</h3>
          ) : (
            <button
              onClick={() => {
                setIsOtpVisible(false);
                setOtp("");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Back
            </button>
          )}
          <h3>{isOtpVisible ? "Enter the OTP" : "Enter your Phone Number"}</h3>
          {isOtpVisible && (
            <p>
              A One Time Password has been sent to your phone number for
              verification purposes.
            </p>
          )}
          <div>
            {!isOtpVisible ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0.5rem",
                }}
              >
                <select
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ flex: 1, maxWidth: "7rem" }}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  placeholder="Phone"
                  value={pno}
                  onChange={(e) => {
                    if (
                      (e.target.value[e.target.value.length - 1] >= "0" &&
                        e.target.value[e.target.value.length - 1] <= "9") ||
                      !e.target.value
                    ) {
                      setPno(e.target.value);
                    }
                  }}
                  style={{ flex: 2 }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {isOtpVisible && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                Didn't receive an OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                    fontSize: 15,
                    textTransform: "none",
                  }}
                >
                  Resend OTP
                </button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
              <button
                disabled={
                  pno?.length !== 10 ||
                  !code ||
                  !isNumeric(pno) ||
                  (isOtpVisible && otp?.length !== 6)
                }
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "none",
                  marginLeft: "auto",
                }}
                onClick={handleBtnClick}
              >
                {isOtpVisible ? "Verify" : "Send"}
              </button>
            </div>
            <br />
            {message.type === "success" && <p>{message.text}</p>}
            {!isOtpVisible && (
              <p>
                Make sure your Country Code And Mobile Number is Correct.
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <a href="#" style={{ textDecoration: "none", fontSize: 14 }}>
                Terms of service
              </a>
              <a
                href="#"
                style={{ textDecoration: "none", fontSize: 14, marginLeft: 10 }}
              >
                User agreement
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
