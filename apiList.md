# Dev Tinder API
authRouter
- POST /signup
- POST /Login
- POST /logout

profileRouter
- PATCH /profile/edit [age, gender, skills [not emailID]]
- GET /profile/view
- PATCH /profile/password //Forget password


connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:reqId
- POST /request/review/rejected/:reqId


userRouter
- GET /user/requests
- GET /user/connections
- GET /user/feed [Result will provide you n IDs together]




status - ignored, rejected, interested, accepted