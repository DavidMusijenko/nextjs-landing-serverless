import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { SendEmail } from "../API";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { Transition } from "react-transition-group";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import {
  validateEmail,
  validateFullName,
  validateMessage,
  validatePhone,
} from "../components/Validation";

export default function Home() {
  const [hidden, setHidden] = useState(true);
  const [hiddenSent, setHiddenSent] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState();
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");

  emailjs.init("QFtttwpShWNlnzmyU");

  //validate email, phone, message, fullname

  const validateAll = () => {
    validateMessage({ message, setMessageError });
    validateEmail({ email, setEmailError });
    validatePhone({ phone, setPhoneError });
    validateFullName({ fullName, setFullNameError });
  };

  const handleSent = () => {
    validateAll();
    if (fullName !== "" && email !== "" && message !== "" && phone !== "") {
      if (
        emailError === "" &&
        fullNameError === "" &&
        messageError === "" &&
        phoneError === ""
      ) {
        //  send mail
        const serviceId = "service_9axcgil";
        const templateId = "template_l2i42xu";
        const userId = "user_id";
        const templateParams = {
          fullName,
          email,
          message,
          phone,
        };

        emailjs
          .send(serviceId, templateId, templateParams)
          .then((response) => console.log(response))
          .then((error) => console.log(error));

        setHiddenSent(false);
      }
    } else {
      alert(
        `Please fill in all fields properly.${fullNameError} ${emailError} ${phoneError} ${messageError}`
      );
    }
  };

  const handleClick = () => {
    setHidden(false);
  };

  return (
    <div className="container">
      <Head>
        <title>David Musijenko | Web Dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="nameAuthor">
          <h1 className="title">David Musijenko</h1>

          <h2>webov?? str??nky pro ka??d??ho</h2>
        </div>
        <div className="formContainer">
          <p className="description">
            Chcete <strong>vlastn?? str??nky</strong>? A?? u?? m??te blog, podnik??te,
            ??i chcete prod??vat v??ci p??es e-shop, najdeme pro v??s to{" "}
            <strong>ide??ln?? ??e??en??</strong>.
          </p>

          <button
            type="button"
            className={hidden ? "reveal-button" : "hidden"}
            onClick={handleClick}
          >
            <span>Jdem na to!</span>
          </button>

          <form
            action=""
            method="post"
            className={hidden === true ? "hidden" : "form .form-change"}
          >
            <div className="contactContainer">
              <h3>
                Kontaktujte m?? na{" "}
                <u>
                  <a href="mailto:david.musijenko@gmail.com">
                    david.musijenko@gmail.com
                  </a>
                </u>{" "}
                nebo vyu??ijte tento formul????.
              </h3>

              <div className="fields">
                <div className="row">
                  <div className="column">
                    <input
                      type="text"
                      name="name"
                      placeholder="Va??e jm??no"
                      required=""
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="column">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="column">
                    <input
                      type="tel"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telefon"
                    />
                  </div>
                </div>
                <div className="row">
                  <textarea
                    name="message"
                    placeholder=" Va??e zpr??va"
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="send-button"
                  onClick={handleSent}
                >
                  <span>Odeslat zpr??vu</span>
                </button>
              </div>
            </div>
            <div className={hiddenSent === true ? "hidden" : "sent"}>
              <h3>
                <strong>Odesl??no</strong>, <br /> brzy se v??m ozvu zp??t.
              </h3>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/david-musijenko/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by???<b> One Man Army </b>
        </a>
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            marginLeft: "10px",
            marginBottom: "10px",
            height: "35px",
          }}
        >
          <Image
            width="35px"
            height="35px"
            src="/pic.jpg"
            alt="Avatar"
            className="logo"
            style="border-radius: 25px;"
          />
        </div>
      </footer>

      <style jsx>{`
        @media (min-width: 200px) {
          .container {
            width: 90%;
          }
          .description {
            font-size: 1.5rem;
          }
          .column {
            width: 100%;
          }
          input {
            width: 100%;
          }
          .send-button {
            width: 100%;
          }
          .sent {
            margin-top: 120px;
            margin-left: 10px;
          }
        }

        @media (min-width: 800px) {
          .container {
            width: 75%;
          }
          .formContainer {
            margin-top: 70px;
          }
          .description {
            font-size: 2rem;
          }
          .column {
            margin: 0 0px 0 0;
            display: flex;
            padding: 0 3px 0 3px;
          }
          .row {
            width: 100%;
            display: flex;
          }

          .send-button {
            width: 250px;
            margin-left: 00px;
          }
          .sent {
            margin-top: 30px;
            margin-left: 22px;
          }
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          margin: 0 auto;
        }

        main {
          padding: 4rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: fade 1.5s 1200ms;
          animation-fill-mode: forwards;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h2 {
          font-size: 1.75rem;
          line-height: 1.25;
          letter-spacing: -0.05rem;
          margin-top: 0px;
          margin-left: 2px;
          margin-bottom: 2rem;
          font-weight: 300;
          opacity: 0;
          animation: fade 1.5s 200ms;
          animation-fill-mode: forwards;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.3rem;
          letter-spacing: -0.1rem;
          opacity: 0;
          animation: fade 1.5s 200ms;
          animation-fill-mode: forwards;
        }

        .description {
          line-height: 1.5;
          opacity: 0;
          animation: fade 1.5s 800ms;
          animation-fill-mode: forwards;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .send-button:hover,
        .send-button:focus {
          background: #0070f3;
          transition: 0.4s;
        }

        .send-button:active {
          background: #6699ff;
        }

        .reveal-button:hover {
          background: #0070f3;
          transition: 0.4s;
        }

        .reveal-button:active {
          background: #6699ff;
        }

        p {
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          text-align: justify;
        }

        @-webkit-keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        form {
          opacity: 0;
          color: #7b3fa1;
          max-width: 700px;
          padding: 15px 20px;

          background: #fcf2fc;
          box-sizing: border-box;
          border-radius: 20px;
          animation-delay: 250ms;
          animation: fade 1.5s 200ms;
          animation-fill-mode: forwards;
        }

        .form-change {
          opacity: 1;
        }

        .hidden {
          display: none;
        }

        textarea {
          margin-top: 40px;
          height: 150px;
          resize: vertical;
          width: 100%;
          border: none;
          height: 100px;
          padding: 12px 0px;
        }

        .column {
          margin-top: 10px;
          margin-bottom: 3px;

          border: none;
          float: left;

          box-sizing: border-box;
          height: 40px;
          padding: auto;
        }

        input {
          border: none;
          height: 50px;
          padding: 12px 15px;
        }

        .send-button {
          font: inherit;
          overflow: visible;

          color: #fff;
          float: right;

          padding: 15px 30px;
          font-size: 1.4rem;
          background: #2ecc71;
          border: none;
          transition: width 300ms;
          text-decoration: none;
          margin-top: 40px;
        }

        .reveal-button {
          opacity: 0;
          font: inherit;
          float: left;
          overflow: visible;
          position: relative;

          color: #fff;
          margin: 20px 0 20px 0px;
          padding: 15px 30px;
          font-size: 1.4rem;
          background: #2ecc71;
          border: none;
          transition: width 300ms;
          text-decoration: none;
          width: 250px;
          animation: fade 1.5s 2500ms;
          animation-fill-mode: forwards;
        }

        .contactContainer {
          position: relative;
        }

        .logo {
          height: 2.5em;
          border-radius: 25px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
