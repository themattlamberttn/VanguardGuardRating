# Vanguard Security — Guard Rating System
## Setup Instructions (10 minutes)

---

### What you're setting up

The rating app (index.html) needs a place to save data so your whole team
sees the same ratings. We use Google Sheets as the database — it's free,
requires no server, and Brad can manage the spreadsheet directly.

---

### Step 1 — Create a Google Sheet

1. Go to https://sheets.google.com and sign in with a Vanguard Google account
2. Click **Blank** to create a new spreadsheet
3. Name it: **Vanguard Guard Ratings**
4. Leave it open — you'll come back to it

---

### Step 2 — Open Apps Script

1. In your Google Sheet, click the menu: **Extensions → Apps Script**
2. A new tab opens showing a code editor
3. Delete everything in the editor (Ctrl+A, Delete)
4. Open the file **Code.gs** included with this package
5. Copy the entire contents and paste it into the Apps Script editor
6. Click the **Save** button (disk icon) or press Ctrl+S

---

### Step 3 — Deploy the Script

1. Click the blue **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon next to "Type" and select **Web app**
4. Fill in the settings:
   - Description: `Vanguard Ratings API`
   - Execute as: **Me**
   - Who has access: **Anyone** (this is what allows your team to use it)
5. Click **Deploy**
6. Click **Authorize access** and follow the Google sign-in prompts
   - You may see a warning saying "Google hasn't verified this app"
   - Click **Advanced → Go to Vanguard Ratings API (unsafe)** — this is safe,
     it's just your own script
7. After authorizing, you'll see a **Web app URL** that looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`
8. **Copy that URL** — you'll need it in the next step

---

### Step 4 — Connect the App

1. Open **index.html** in any browser (just double-click it)
2. A setup screen will appear asking for the Google Apps Script URL
3. Paste the URL you copied in Step 3
4. Click **Connect & Save**
5. The app will load and sync with your Google Sheet

---

### Step 5 — Share with your team

**Option A — Shared network drive (recommended for office use)**
1. Place the **index.html** file on a shared network drive everyone can access
2. Team members just double-click the file to open it in their browser
3. Everyone reads and writes to the same Google Sheet automatically

**Option B — SharePoint or Teams**
1. Upload index.html to your SharePoint or Teams files
2. Share the link with your team

**Option C — Send by email**
1. Email the index.html file to your team
2. Each person saves it locally and opens it — they all point to the same Google Sheet

---

### Re-deploying after edits

If you ever need to update the Apps Script code:
1. Go back to Extensions → Apps Script
2. Make your changes and save
3. Click Deploy → **Manage deployments**
4. Click the pencil (edit) icon
5. Change version to **New version**
6. Click Deploy — the URL stays the same, no need to update the app

---

### Troubleshooting

**"Could not connect to Google Sheets"**
- Make sure you deployed as a Web app with access set to "Anyone"
- Try re-deploying as a new version
- Check that the URL in Settings starts with https://script.google.com

**Ratings not saving**
- Check your internet connection
- Open browser developer tools (F12) and look for errors in the Console tab
- Make sure the Apps Script is deployed with "Execute as: Me"

**Team members see different data**
- Everyone must be using the same script URL
- Click the Refresh button in the app to pull the latest data

---

### Data backup

The Google Sheet itself is your backup. Brad can open it at any time to
view, edit, or export all rating data. Each quarter gets its own tab
(Q1 2026, Q2 2026, etc.) automatically.

---

*Vanguard Security — Guard Performance Rating System*
