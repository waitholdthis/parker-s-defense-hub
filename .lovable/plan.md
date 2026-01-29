
# Admin Panel for Resume Editing

## Overview
Build a password-protected admin panel that allows you to edit all resume content directly from the website. Changes will be saved to the database and automatically update both the public site and the AI assistant's knowledge base.

---

## Architecture

```text
+------------------+       +-------------------+       +------------------+
|   Public Site    |       |   Admin Panel     |       |    Database      |
|   (read-only)    | <---> |  /admin (secure)  | <---> |  resume_content  |
+------------------+       +-------------------+       +------------------+
                                    |
                                    v
                           +------------------+
                           |  AI Assistant    |
                           |  (reads from DB) |
                           +------------------+
```

---

## What You'll Be Able to Edit

1. **Personal Info** - Name, title, organization, location, contact details
2. **Mission Statement** - The 2-3 sentence summary at the top
3. **Executive Summary** - All 6-8 bullet points
4. **Skills Taxonomy** - Categories, skill names, proficiency levels, and years
5. **Experience** - Job titles, organizations, dates, responsibilities, and outcomes
6. **Education** - Degrees, certifications, and professional development
7. **Projects** - Case studies with problem, role, approach, and outcome
8. **Strengths & Development** - Strengths, development areas, gaps with mitigations
9. **Learning Plan** - Current learning items with target dates and status

---

## Implementation Plan

### Phase 1: Database Setup
- Create a `resume_content` table to store the JSON content
- Enable Row Level Security (RLS) with admin-only write access
- Create an `admin_users` table for simple password-based admin authentication
- Seed the database with current `resume.json` content

### Phase 2: Admin Authentication
- Create `/admin` route with password-based login
- Simple, secure authentication (no email/signup needed - just you)
- Session management to keep you logged in while editing

### Phase 3: Admin Dashboard UI
- Clean editing interface matching the site's professional aesthetic
- Tabbed sections for each content area (Personal, Summary, Skills, etc.)
- Form fields for each editable piece of content
- Add/remove buttons for list items (skills, experiences, etc.)
- Save button with confirmation feedback

### Phase 4: Data Flow Updates
- Update all components to read from database instead of static JSON
- Update the AI assistant edge function to fetch current content from database
- Add real-time updates so changes appear immediately

---

## Security Measures

- Password stored as hashed value in database
- Admin session tokens with expiration
- RLS policies ensuring only authenticated admin can modify content
- All other users (public) can only read

---

## User Experience

**Login Flow:**
1. Navigate to `/admin`
2. Enter your admin password
3. Access the editing dashboard

**Editing Flow:**
1. Select a section tab (e.g., "Experience")
2. Edit fields inline or expand items
3. Add/remove items as needed
4. Click "Save Changes"
5. See confirmation and live preview

---

## Technical Details

### New Files to Create
- `src/pages/Admin.tsx` - Admin dashboard page
- `src/components/admin/AdminAuth.tsx` - Login form
- `src/components/admin/AdminDashboard.tsx` - Main editing interface
- `src/components/admin/sections/` - Editor components for each section
- `src/hooks/useResumeData.ts` - Hook to fetch/update resume data
- `supabase/functions/admin-login/index.ts` - Secure login endpoint

### Database Tables
- `resume_content` - Stores the JSON content (single row)
- `admin_sessions` - Tracks active admin sessions

### Updates to Existing Files
- All resume components will use the new `useResumeData` hook
- `ask-parker` edge function will query the database for current content

---

## Timeline

1. **Database & Auth Setup** - Tables, RLS, admin login
2. **Admin UI Shell** - Route, layout, section navigation
3. **Section Editors** - Forms for each content type
4. **Data Integration** - Connect components to database
5. **AI Assistant Update** - Fetch live data for responses

