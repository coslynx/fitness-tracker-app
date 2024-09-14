<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-app
</h1>
<h4 align="center">A web application for setting fitness goals, tracking progress, and staying motivated.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used for building the application">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend technologies used">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend technology used">
  <img src="https://img.shields.io/badge/Database-Supabase-black" alt="Database used for storing user data">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "fitness-tracker-app" that provides a comprehensive solution for fitness enthusiasts using a combination of frontend and backend technologies. The application leverages React for a dynamic and user-friendly interface, Next.js for a robust and scalable framework, Node.js for backend logic, Supabase for secure data storage, and various third-party libraries for features like authentication, charting, and social sharing.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** |  Allows users to create accounts, securely log in, and manage their profiles. This ensures data privacy and access control.    |
| 🎯 | **Goal Setting**       |  Enables users to define personalized fitness goals with customizable parameters like target weight, distance, and timeframes. |
| 🏋️ | **Workout Tracking**    |  Provides a way for users to log their workouts, including type, duration, intensity, and key metrics.                      |
| 📈 | **Progress Visualization** |  Visualizes user progress towards their goals through interactive charts and graphs for better insights and motivation. |
| 🤝 | **Social Community** |  Allows users to connect with others, share their achievements, and receive support and encouragement.           |
| 🌐 | **API Integration** |  Integrates with third-party fitness trackers to automatically import user data, providing a comprehensive view of their fitness activity.  |
| 🛡️ | **Data Security**  |  Implements robust security measures like encryption, access control, and data sanitization to protect user information.  |
| ⚡️ | **Performance Optimization** |  Designed for fast loading times, smooth user interactions, and efficient data retrieval using techniques like caching and optimized database queries. |
| 🏗️ | **Scalable Architecture** |  Built with a scalable architecture that can accommodate increasing user traffic and data volume.                   |

## 📂 Structure
```text
fitness-tracker-app
├── components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── GoalInput.tsx
│   ├── ProgressChart.tsx
│   └── SocialShareButton.tsx
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── utils
│   ├── helpers.ts
│   ├── api.ts
│   ├── auth.ts
│   └── validation.ts
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
├── .env
└── package.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker (optional, for deployment)

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fitness-tracker-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏗️ Usage
### 🏃‍♂️ Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `config/next-auth.config.ts` or `.env` to customize database credentials and other environment-specific variables. 

### 📚 Examples
- 📝 **Example 1**: **Goal Creation:** Users can create a new goal by providing the goal type (e.g., weight loss, distance running) and target value.
- 📝 **Example 2**: **Workout Logging:** Users can record workouts by specifying the type (e.g., running, cycling), duration, intensity, and other relevant details.
- 📝 **Example 3**: **Social Sharing:** Users can share their achievements on social media platforms like Facebook, Twitter, or Instagram.

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Vercel Deployment (Recommended):
1. **Create a Vercel Account:** If you don't already have one, sign up for a Vercel account at [https://vercel.com/](https://vercel.com/).
2. **Initialize Vercel Project:** In your project directory, run:
   ```bash
   npx create-next-app@latest -e with-vercel
   ```
3. **Deploy to Vercel:** Follow the Vercel CLI prompts to configure your project and deploy to Vercel. 
4. **Configure Environment Variables:** Set up your environment variables (e.g., database credentials) on the Vercel dashboard.

#### Other Hosting Options:
- **Netlify:**  Follow similar steps as with Vercel, using the Netlify CLI or web interface.
- **GitHub Pages:**  Build a static version of your application and deploy it to GitHub Pages.
- **AWS:** Use AWS services like Elastic Beanstalk or EC2 to host your application.
- **Google Cloud:** Use Google Cloud Platform services like App Engine or Compute Engine to host your application.

### 🔑 Environment Variables
- **`SUPABASE_URL`**: Your Supabase URL (found in your Supabase project settings)
- **`SUPABASE_KEY`**: Your Supabase API key (found in your Supabase project settings)

## 📜 API Documentation
### 🔍 Endpoints
- **`GET /api/auth/session`**: Retrieves the user's session information.
- **`POST /api/auth/signin`**: Authenticates a user with email and password.
- **`POST /api/auth/signup`**: Registers a new user with email and password.
- **`GET /api/goals`**: Retrieves a list of the user's goals.
- **`POST /api/goals`**: Creates a new goal for the user.
- **`PUT /api/goals/:id`**: Updates an existing goal.
- **`DELETE /api/goals/:id`**: Deletes a goal.
- **`POST /api/progress`**: Logs a new workout and updates progress for a goal.
- **`GET /api/progress/:goalId`**: Retrieves progress data for a specific goal.

### 🔒 Authentication
The API uses JWT tokens for authentication. When a user logs in, they receive a JWT token that is used for subsequent requests to protected endpoints.

### 📝 Examples
- **Retrieve user session data:**
   ```bash
   curl -X GET http://localhost:3000/api/auth/session
   ```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: fitness-tracker-app

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>