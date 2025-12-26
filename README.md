# Influencer Marketing Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for influencer marketing management.

## Features

- Influencer discovery and filtering
- Campaign management
- Contact form for inquiries
- Responsive design
- RESTful API

## Project Structure

```
Influencer/
├── backend/                 # Node.js + Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   └── App.js          # Main app component
    └── package.json        # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file with your MongoDB connection string

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Influencers
- `GET /api/influencers` - Get all influencers (with optional filters)
- `GET /api/influencers/:id` - Get single influencer
- `POST /api/influencers` - Create new influencer
- `PUT /api/influencers/:id` - Update influencer
- `DELETE /api/influencers/:id` - Delete influencer

### Contact
- `GET /api/contact` - Get all contacts
- `POST /api/contact` - Submit contact form

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get single campaign
- `POST /api/campaigns` - Create new campaign

## Important Notes

⚠️ **This is a template with placeholder content**. You should:

1. Replace all placeholder images and content with your own
2. Add your own branding, logos, and color scheme
3. Customize the text and messaging for your business
4. Add actual influencer data to your database
5. Implement authentication if needed
6. Add file upload functionality for images
7. Configure environment variables properly
8. Never use copyrighted content from other websites

## Next Steps

1. Install and start MongoDB
2. Add sample data to the database
3. Customize styling and branding
4. Add authentication/authorization
5. Deploy to production (Heroku, Vercel, etc.)

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: CSS3

## License

This is a template project. Please ensure you have the rights to any content you add to it.
