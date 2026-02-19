# 🧹 URAZ Pro Website

Professional cleaning services landing page for URAZ Pro - "Your A to Z Cleaning Needs"

![URAZ Pro](https://img.shields.io/badge/URAZ-Pro-blue?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Customization](#customization)

## 🎯 Overview

URAZ Pro is a professional single-page website for a cleaning services business. It includes:

- Hero section with grand opening promotion
- Services showcase (Power Washing, Carpet Cleaning, Vehicle Detailing, etc.)
- Pricing with 40% opening discount
- Contact form with SMS notifications via Twilio
- Testimonials section
- About section featuring the founder's story
- SEO optimized and mobile-responsive design

## ✨ Features

- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **SEO Optimized** - Meta tags, structured data, semantic HTML
- ✅ **Fast Loading** - Static site with optimized assets
- ✅ **Contact Form** - Netlify Forms with spam protection
- ✅ **SMS Notifications** - Instant alerts via Twilio when leads come in
- ✅ **Smooth Animations** - Scroll effects and micro-interactions
- ✅ **Accessible** - WCAG compliant with proper ARIA labels

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Inter (Google Fonts)
- **Icons**: Font Awesome
- **Forms**: Netlify Forms
- **Functions**: Netlify Functions (Node.js)
- **SMS**: Twilio API
- **Hosting**: Netlify

## 📁 Project Structure

```
uraz-website/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── script.js               # Main JavaScript file
├── netlify.toml            # Netlify configuration
├── README.md               # This file
└── netlify/
    └── functions/
        ├── package.json    # Functions dependencies
        └── sms-notification.js  # SMS webhook function
```

## 💻 Local Development

### Option 1: Simple HTTP Server

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx serve)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Netlify Dev (Recommended)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site (after first deploy)
netlify link

# Start local dev server with functions support
netlify dev
```

This will start the site at `http://localhost:8888` with hot reload and function support.

## 🚀 Deployment

### Step 1: Create Git Repository

```bash
cd uraz-website
git init
git add .
git commit -m "Initial commit - URAZ Pro website"
```

### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/uraz-pro.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Netlify

#### Option A: Via Netlify UI (Recommended for beginners)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select the `uraz-pro` repository
5. Configure build settings:
   - Build command: (leave empty for static site)
   - Publish directory: `.`
6. Click "Deploy site"

#### Option B: Via Netlify CLI

```bash
# Deploy directly from CLI
netlify deploy --prod --dir=.

# Or use the deploy wizard
netlify deploy
```

### Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Enter your domain (e.g., `urazpro.com`)
4. Follow DNS configuration instructions

## 🔐 Environment Variables

To enable SMS notifications, set these environment variables in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID | ACxxxxxxxxxxxxxxxx |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token | xxxxxxxxxxxxxxxx |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | +1234567890 |
| `OWNER_PHONE_NUMBER` | Your phone to receive SMS | +1234567890 |

### Getting Twilio Credentials

1. Sign up at [twilio.com](https://twilio.com)
2. Get a phone number from Twilio console
3. Copy Account SID and Auth Token from dashboard
4. Add your personal phone number as verified caller ID

## 🎨 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary: #0066cc;        /* Main brand color */
    --primary-dark: #0052a3;   /* Darker shade */
    --primary-light: #4d94e6;  /* Lighter shade */
    --accent: #ff6b00;         /* Highlight/CTA color */
    /* ... more variables */
}
```

### Updating Content

- **Business Info**: Edit text in `index.html`
- **Services**: Modify cards in the Services section
- **Pricing**: Update prices in the Pricing section
- **Testimonials**: Edit testimonial cards

### Adding Images

1. Add images to the project folder
2. Reference them in HTML:
```html
<img src="path/to/image.jpg" alt="Description">
```

### Form Configuration

The contact form uses Netlify Forms. To modify:

1. Edit form fields in `index.html`
2. Update the function in `netlify/functions/sms-notification.js` to handle new fields

## 📱 Testing

### Form Submission

1. Deploy the site
2. Fill out and submit the contact form
3. Check Netlify Forms dashboard for submissions
4. Verify SMS received (if Twilio configured)

### Responsive Testing

Use browser DevTools to test on different device sizes:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1200px+)

## 🔧 Troubleshooting

### SMS Not Sending

1. Check environment variables are set correctly
2. Verify Twilio phone number is valid
3. Check Netlify Functions logs in dashboard
4. Ensure phone numbers include country code (+1 for US)

### Form Not Submitting

1. Ensure `data-netlify="true"` is on the form
2. Check form has `name="contact"`
3. Verify honeypot field is present
4. Check browser console for errors

### Styles Not Loading

1. Verify `style.css` path is correct
2. Check browser console for 404 errors
3. Clear browser cache (Ctrl+F5)

## 📞 Support

For issues or questions:
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Twilio Docs: [twilio.com/docs](https://twilio.com/docs)
- Web issues: Check browser DevTools console

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for URAZ Pro
