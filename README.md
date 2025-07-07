# 📝 ApplySmart – Profile & Resume Upload Feature

Build your professional profile, upload your resume securely via Cloudinary, and store everything seamlessly in MongoDB.

---

## 📌 Project Overview

This feature allows users to:
- Create a **professional profile** with a name and resume (PDF only)
- Upload resumes securely to **Cloudinary**
- Store profile metadata (name, resume URL, timestamp) in **MongoDB**
- Manage UI state dynamically with status badges and UI modals

---

## ⚙️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React, Axios, React Router, Tailwind |
| Backend     | Node.js, Express.js, Multer          |
| Storage     | MongoDB, Cloudinary (Resume Hosting) |
| Tools       | dotenv, multer-storage-cloudinary    |

---

## 🚀 Features

- 🎯 Profile creation with status indicator (active/pending)
- 📄 Resume file upload via Cloudinary
- 📬 API integration with Axios
- 📦 MongoDB schema to store profile metadata
- 🧾 Modal-based resume uploader
- ⚠️ File validation (PDF only, max 10MB)

---

## 🧑‍💻 How to Use

### ✅ 1. Clone the Repo

```bash
git clone https://github.com/your-username/apply-smart.git
cd apply-smart
```

---

### ✅ 2. Set Up Backend

#### 🔹 Install dependencies:

```bash
cd backend
npm install
```

#### 🔹 Configure `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### 🔹 Start the server:

```bash
node server.js
```

---

### ✅ 3. Set Up Frontend

#### 🔹 Install dependencies:

```bash
cd frontend
npm install
```

#### 🔹 Start React app:

```bash
npm run dev
# or
npm start
```

---

## 🧪 API Reference

### `POST /api/profile/create`

| Field   | Type     | Description          |
|---------|----------|----------------------|
| name    | `string` | Profile name         |
| resume  | `file`   | PDF resume (max 10MB)|

#### ✅ Response:

```json
{
  "message": "Profile created",
  "profile": {
    "name": "John Doe",
    "resumeUrl": "https://res.cloudinary.com/...",
    "createdAt": "2025-07-06T10:00:00.000Z"
  }
}
```

---

## 📂 Folder Structure

```
apply-smart/
├── backend/
│   ├── routes/
│   │   └── profileRoutes.js
│   ├── models/
│   │   └── Profile.js
│   ├── middleware/
│   │   └── cloudinaryUpload.js
│   ├── utils/
│   │   └── cloudinary.js
│   └── server.js
├── frontend/
│   └── src/pages/
│       └── Profile.jsx
└── .env
```

---

## 🎯 Future Improvements

- [ ] Resume preview/download button
- [ ] Profile edit/update capability
- [ ] Resume re-upload feature
- [ ] Authentication + protected routes
- [ ] Multi-profile support

---

## 🛡️ Environment Variables

| Variable Name             | Required | Description                        |
|---------------------------|----------|------------------------------------|
| CLOUDINARY_CLOUD_NAME     | ✅       | From your Cloudinary dashboard     |
| CLOUDINARY_API_KEY        | ✅       | Cloudinary API key                 |
| CLOUDINARY_API_SECRET     | ✅       | Cloudinary API secret              |
| MONGO_URI                 | ✅       | MongoDB connection URI             |
| PORT                      | ❌       | Default is 5000                    |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
