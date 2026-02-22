# 🎨 Imagen 3 Setup Guide for Kami Dōbutsu

This guide will help you set up Google Cloud's Imagen 3 for AI-generated mystical animal images.

## 📋 Prerequisites

- Google Cloud account
- Credit card for billing (Imagen has usage costs)
- Node.js installed

## 🚀 Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it (e.g., "kami-dobutsu-oracle")
4. Click "Create"

### 2. Enable Vertex AI API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Vertex AI API"
3. Click "Enable"

### 3. Enable Billing

1. Go to "Billing" in the left menu
2. Link a billing account to your project
3. Note: Imagen 3 costs approximately $0.02-0.04 per image

### 4. Create Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name: `kami-oracle-imagen`
4. Grant role: "Vertex AI User"
5. Click "Done"

### 5. Generate Service Account Key

1. Click on your new service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON"
5. Download the key file
6. Save it as `service-account-key.json` in the `server/` directory

### 6. Update Environment Variables

Edit `server/.env` and add:

```env
# Google Cloud Configuration for Imagen 3
GOOGLE_CLOUD_PROJECT=your-project-id-here
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

Replace `your-project-id-here` with your actual Google Cloud project ID.

### 7. Install Dependencies

```bash
cd server
npm install
```

### 8. Test the Setup

Start the server:
```bash
npm run dev
```

Look for this message:
```
✅ Imagen 3 initialized successfully
```

If you see:
```
⚠️  Imagen not configured, will use SVG placeholders
```

Then check your configuration.

## 🎨 How It Works

### With Imagen 3 Configured:
- Oracle generates detailed mystical prompts
- Imagen 3 creates hyper-realistic sacred animal images
- Images are returned as base64 data URLs
- Beautiful AI-generated art for each spirit animal

### Without Imagen 3:
- System falls back to beautiful SVG placeholders
- Sacred geometry designs with animal-specific colors
- No external API calls needed
- Still looks mystical and professional

## 💰 Cost Estimation

- **Imagen 3**: ~$0.02-0.04 per image
- **Average quiz**: 1 image per completion
- **100 users**: ~$2-4
- **1000 users**: ~$20-40

## 🔒 Security Notes

1. **Never commit** `service-account-key.json` to Git
2. The `.gitignore` already excludes it
3. Keep your `.env` file secure
4. Rotate keys periodically

## 🐛 Troubleshooting

### "Imagen not configured" message
- Check that all environment variables are set
- Verify service account key file exists
- Ensure Vertex AI API is enabled

### "Permission denied" errors
- Verify service account has "Vertex AI User" role
- Check billing is enabled on the project

### Images not generating
- Check server logs for detailed error messages
- Verify you have billing enabled
- Check API quotas in Google Cloud Console

## 📚 Additional Resources

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Imagen 3 Pricing](https://cloud.google.com/vertex-ai/pricing)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/best-practices-service-accounts)

## ✨ Optional: Keep Using SVG Placeholders

If you prefer not to use Imagen 3:
- Simply don't configure the Google Cloud variables
- The system will automatically use beautiful SVG placeholders
- No costs, instant generation, still looks great!
