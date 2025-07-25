# Online Job Portal (React + Firebase)

This is a full-featured Job Portal Web Application built using React.js and Firebase Firestore. 
Users can filter and explore job listings with pagination, search, and category filters.

---

##  Features

- Filter jobs by title, type, location, experience, or skills
- Real-time data from Firebase Firestore
- Shows how many days ago each job was posted
- Pagination (5 jobs per page with page shift navigation)
- Dummy data uploader (Node.js script to seed jobs in Firestore)
- Responsive and clean UI

---

##  Tech Stack

| Technology   | Purpose                 |
|--------------|--------------------------|
| React.js     | Frontend UI Framework    |
| Firebase     | Backend Database (Firestore) |
| Node.js      | Data uploader for seeding jobs |
| JavaScript   | App Logic & Components   |
| TailwindCSS  | Styling and Layout       |

---

## Folder Structure

Job-Portal/
├── firebase-job-uploader/ # Node.js job uploader script
│ └── uploadJobs.js
├── public/
├── src/
│ ├── Components/
│ │ ├── Header/
│ │ ├── Job Card/
│ │ ├── Navbar/
│ │ └── SearchBar/
│ ├── assets/
│ ├── App.jsx
│ ├── firebase.config.js
│ ├── firebase.config.example.js
│ ├── JobDummyData.js
│ └── index.css / main.jsx
├── .gitignore
├── package.json
└── README.md

