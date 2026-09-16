# Supabase Setup for Service Requests

## Quick Setup (2 minutes)

### Step 1: Run the SQL Migration
1. Go to: https://app.supabase.com
2. Select your project (aokzkrwhbywjgzsjczib)
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy & paste everything from `supabase/migrations/create_service_requests_table.sql`
6. Click **Run** (or Ctrl+Enter)

### Step 2: Verify the Table
In Supabase dashboard:
1. Go to **Table Editor** (left sidebar)
2. You should see `service_requests` table listed
3. Click it to view the columns

### Step 3: Deploy to Netlify
```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git push
```

Netlify will auto-deploy. Form will be live at: https://catenalanguagepartners.com/providers

---

## What Was Built

### Database Schema (`service_requests` table)
- **Provider fields:** name, organization, email, phone
- **Appointment fields:** type (video/phone/in-person), date, duration
- **Patient fields:** name, age, gender, primary language
- **Service fields:** specialty, notes, special requests
- **Compliance:** HIPAA attestation checkbox, status tracking
- **System fields:** created_at, updated_at, ip_address, user_agent
- **Integration:** notion_page_id (links to Notion database)

### API Endpoint (`/api/submit-request`)
- Validates all form data server-side
- Writes to **Supabase** (source of truth)
- Writes to **Notion** (workflow visibility)
- Returns request ID for tracking
- Fails gracefully if Notion is down (Supabase is primary)

### Form Component (`RequestInterpreterButton`)
- Full provider information section
- Appointment scheduling fields
- Patient demographics
- Service specialty selector
- Special requests & notes
- HIPAA compliance checkbox
- Client-side validation
- Success/error messaging

### Environment
- `.env.local` updated with Supabase credentials
- Ready for Netlify environment variables
- Service role key configured for backend writes

---

## Testing After Setup

1. Navigate to: https://catenalanguagepartners.com/providers
2. Click **Request an Interpreter** button
3. Fill out the form
4. Submit

You should see:
- ✅ Success message with Request ID
- ✅ Record appears in Supabase `service_requests` table
- ✅ Record appears in Notion `service_request` database
