import { useState } from "react"
import axios from "axios"
import styles from "./newsletter.module.css"

export default function Newsletter () {
  const [email, setEmail] = useState("")
  const [state, setState] = useState("IDLE")
  const [errorMessage, setErrorMessage] = useState(null)


  const mailchimp = require("@mailchimp/mailchimp_marketing");

  mailchimp.setConfig({
    apiKey: "a953e159e00f6e8e5580d4a9531eb5a2-us6",
    server: "us6",
  });
  
  async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
  }
  



  const subscribe = async () => {

 




    console.log("click")
    setState("LOADING")
    setErrorMessage(null)
    try {
      console.log("click2")
      const response = await axios.post("/api/newsletter", { email })
      setState("SUCCESS")
      console.log("click3")
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setState("ERROR")
    }

    
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Subscribe to my newsletter!</h2>
      <p className={styles.details}>
        It includes interesting tech content as well as some information on how
        to live life to the fullest!
      </p>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          disabled={state === "LOADING"}
          onClick={run}
        >
          {state === "LOADING" ? "Loading" : "Subscribe"}
        </button>
      </div>
      {state === "ERROR" && <p className={styles.errorMsg}>{errorMessage}</p>}
      {state === "SUCCESS" && <p className={styles.successMsg}>Success!</p>}
    </div>
  )
}
