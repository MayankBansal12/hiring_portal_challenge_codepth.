# Job Portal - Job portal to create or search tech related jobs.

JobPth is the Tech Job Portal, a platform where you can search and create tech-related job listings. This web application is built using React for the front end and Firebase for the backend, providing a seamless experience for users to log in, create job listings, view job details, manage responses, and receive real-time notifications for new job applications.

## Installation
To set the project on local machine, follow these steps:

### Client Side

1. Install dependencies:
   ```bash
   npm install
   
2. Build the project:
   ```bash
   npm run build
   
3. Run the server:
   ```bash
   npm run dev

Make sure to create a .env file with the following configurations:
   ```bash
   VITE_APIKEY=
VITE_DOMAIN=
VITE_PROJECTID=
VITE_STORAGE=
VITE_SENDERID=
VITE_APPID=
VITE_MEASUREMENT=
VITE_VAPID=
VITE_SERVERKEY=
```

Note:- Might have to setup a new firebase project and then connect to the project to get and write data to db


## Key Features

- **User Authentication:**
  - Secure user login using Firebase Authentication.
  - Email and password authentication with error message handling for unsuccessful attempts.

- **Job Listings:**
  - Logged-in users can easily create tech-related job listings.
  - Each job listing includes essential details such as job title, description, and skills.
  - Unique links are generated for each job listing to facilitate easy sharing.

- **Job Details Display:**
  - Dedicated pages to display comprehensive job details, including the job link.
  - Exclusive access granted to logged-in users for viewing job details.
  - Easy apply by filling a form for each job application.

- **Responses Management:**
  - A comprehensive page to manage and view responses for a specific job listing. 
  - Only accessible to owner/creator of job application to maintain privacy and security.

- **Real-Time Notifications:**
  - Owner to receive real-time notifications when a new job application is submitted.
  - Leveraging Firebase Cloud Messaging (FCM) for efficient and instant notifications.
Note:- Push Notifications might not work if notifications are not allowed by the user.

## Technologies Used

- Frontend: React.js, Material-UI
- Authentication: Firebase Auth
- Database: Firestore
- Noty.js for displaying notifications


## Demo
Access the website live:- [https://jobpth.vercel.app/](https://jobpth.vercel.app/)
![Site_Demo](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351466/Home_x7ilqv.png)

## Screenshots
![Login](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351463/Auth_vktzds.png)
![signup](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351462/Auth_Signup_hgi8sw.png)
![Home Page](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351464/Home_Page_nstfe1.png)
![Filter based search](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351463/Filter_onk88s.png)
![Create Job](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351471/New_job_fwqifm.png)
![Job Page](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351468/Job_page_l71uuz.png)
![Responses](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351474/Responses2_bbwdmz.png)
![Responses 2](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351474/Responses_pztazf.png)
![Apply](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703351462/Apply_puotut.png)


## Credits
Resources that I used while working on this project:
- Firebase Documentation
- Material UI Documentation
- Tailwind Documentation
- ChatGPT by OpenAI

## License
This is a personal project, not for commercial use. The design is original, and any resemblance is unintentional and I apologize for the same.

