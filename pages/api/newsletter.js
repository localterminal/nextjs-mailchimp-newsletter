import axios from "axios"

function getRequestParams(email) {
  console.log("HEY 0")
  // get env variables
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  console.log(API_KEY)
  console.log("HEY")


  // get the mailchimp datacenter - mailchimp API keys always look like this:
  // c0e214879c8542a54e716f38edf1635d-us2
  // we need the us2 part
  const DATACENTER = process.env.MAILCHIMP_API_KEY.split("-")[1]

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

  // you can add aditional paramaters here. See full list of available paramaters at:
  // https://mailchimp.com/developer/reference/lists/list-members/
  const data = {
    email_address: email,
    status: "subscribed",
  }
  console.log("HEY2")
  // API key needs to be encoded in base 64 format
  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64ApiKey}`,
    
  }
  console.log("HEY3")
  return {
    url,
    data,
    headers,
  }
}
console.log("HEY31")

export default async (req, res) => {
  const { email } = req.body
  console.log("HEY4")

  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?",
    })
  }

  try {
    const { url, data, headers } = getRequestParams(email)

    const response = await axios.post(url, data, { headers })

    // Success
    return res.status(201).json({ error: null })
  } catch (error) {
    return res.status(400).json({
      error: `Oops, something went wrong... Send me an email at djsfdavid@gmail.com and I'll manually add you to the list.`,
    })
  }
}





// export default (req, res) => {
//   return res.status(200).json({
//     message: "Hello world!",
//   })
// }





// import axios from 'axios'

// export async function subscribe({ email }) {
//   try {
//     const LIST_ID = process.env.MAILCHIMP_LIST_ID
//     const API_KEY = process.env.MAILCHIMP_API_KEY

//     const data = {
//       email_address: email,
//       status: 'subscribed',
//     }

//     const res = await axios.post(
//       `https://us19.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
//       data,
//       {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`
//         }
//       }
//     )

//     return res;
//   } catch (error) {
//     throw error;
//   }
// }