//Auth token we will use to generate a meeting and connect to it

// the authToken is generated from noname's account and is valid for 5 years
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5YzgwYTM0ZC0wN2Y2LTRlYjktYWI3My1lY2JkOTkxMDYyOGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4Njc1NjM3OSwiZXhwIjoxODQ0NTQ0Mzc5fQ.R4q5PTzJRusLf7Mn7SxXZXRIB153UUQP0rLZjObsHNQ";

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};