# Deployment Guide

## Backend Deployment on Render

1. **Push your code to GitHub** (already done ✅)

2. **Go to [Render Dashboard](https://dashboard.render.com/)**
   - Sign up or log in with your GitHub account

3. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Jayant-26/Spirit_Animal`
   - Configure the service:
     - **Name**: `spirit-animal-backend`
     - **Region**: Oregon (US West)
     - **Branch**: `main`
     - **Root Directory**: Leave empty
     - **Runtime**: Node
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Plan**: Free

4. **Add Environment Variables** in Render:
   - `PORT` = `3001`
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = `AIzaSyAMA1veIBUaO3GOEZ-NBOZlmypRaqd2xno`
   - `BYTEZ_API_KEY` = `edc1012a276c956de200d0f78e610bba`
   - `FRONTEND_URL` = `*` (will update after Vercel deployment)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://spirit-animal-backend.onrender.com`)

---

## Frontend Deployment on Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/)**
   - Sign up or log in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import `Jayant-26/Spirit_Animal` repository
   - Vercel will auto-detect Vite configuration

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`
   - Replace with your actual Render backend URL from step 5 above

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://spirit-animal.vercel.app`)

---

## Update CORS Settings

After both deployments:

1. **Update Backend Environment Variable on Render**
   - Go to your Render service → Environment
   - Update `FRONTEND_URL` = `https://your-vercel-url.vercel.app`
   - Save changes (this will trigger a redeploy)

2. **Test Your Application**
   - Visit your Vercel URL
   - Complete the quiz
   - Verify the backend connection works

---

## Important Notes

- **Free Tier Limitations**:
  - Render free tier: Backend may sleep after 15 minutes of inactivity (first request takes ~30 seconds to wake up)
  - Vercel free tier: Unlimited bandwidth for personal projects

- **API Keys**: Already configured in your `.env` file (not committed to GitHub)

- **Automatic Deployments**: Both platforms will auto-deploy when you push to the `main` branch

---

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure the backend is not sleeping (free tier limitation)

### CORS errors
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check browser console for specific CORS error messages

### Images not generating
- Verify `BYTEZ_API_KEY` is set in Render environment variables
- Check Render logs for image generation errors
