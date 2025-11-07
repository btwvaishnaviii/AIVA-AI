# AIVA-AI Deployment Instructions

## 🚨 Fix for GitHub Pages 405 Error

The 405 error (`AIVA-AI/undefined/functions/v1/ai-chat`) occurs because environment variables are not properly configured for production deployment. Follow these steps to fix it:

## Prerequisites

1. **Supabase Account**: You need a Supabase project with Edge Functions enabled
2. **GitHub Repository**: Your code should be pushed to a GitHub repository
3. **Lovable API Key**: Required for the AI chat functionality

## Step 1: Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project (or use existing)
2. Note down your:
   - **Project URL**: `https://YOUR_PROJECT_ID.supabase.co`
   - **Anon/Public Key**: Found in Settings > API

## Step 2: Deploy Supabase Edge Function

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

4. Deploy the AI chat function:
   ```bash
   supabase functions deploy ai-chat
   ```

5. Set the LOVABLE_API_KEY secret:
   ```bash
   supabase secrets set LOVABLE_API_KEY=your_lovable_api_key_here
   ```

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Add the following repository secrets:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key

## Step 4: Deploy to GitHub Pages

### Option A: Using GitHub Actions (Recommended)

The repository now includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Builds the project with environment variables
- Deploys to GitHub Pages

To use it:
1. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions
2. Push to main branch or manually trigger the workflow

### Option B: Manual Deployment with npm

If you prefer manual deployment:

1. Create a `.env.production` file locally:
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Step 5: Verify Deployment

1. Visit your GitHub Pages URL: `https://YOUR_USERNAME.github.io/AIVA-AI/`
2. Open browser console (F12)
3. Try sending a chat message
4. Check that:
   - No `undefined` in the API URL
   - No 405 errors
   - Chat messages are processed correctly

## Troubleshooting

### Still getting 405 error?
- Verify environment variables are set correctly in GitHub Secrets
- Check that the Supabase Edge Function is deployed and accessible
- Ensure the function has CORS headers configured (already set in `supabase/functions/ai-chat/index.ts`)

### "undefined" in URL?
- Environment variables are not being passed during build
- Check GitHub Actions logs for build errors
- Verify secret names match exactly

### AI not responding?
- Check Supabase Edge Function logs: `supabase functions logs ai-chat`
- Verify LOVABLE_API_KEY is set in Supabase secrets
- Check API rate limits and credits

## Environment Variables Reference

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Anon/Public key for client access | Supabase Dashboard > Settings > API |
| `LOVABLE_API_KEY` | API key for AI service | Your Lovable account |

## Security Notes

- Never commit `.env` files to version control
- Use GitHub Secrets for sensitive data
- The anon/public key is safe to expose (it's meant for client-side use)
- Keep your LOVABLE_API_KEY secret (only in Supabase secrets, never in client code)

## Support

If you continue to experience issues:
1. Check the browser console for detailed error messages
2. Review GitHub Actions logs for build failures
3. Verify all environment variables are correctly set
4. Ensure Supabase Edge Functions are properly deployed
