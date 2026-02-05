

# Professional Resume Download Feature

This plan implements a downloadable PDF resume that presents your information in a clean, professional format suitable for recruiters and hiring managers.

---

## What You'll Get

When clicking the "Download Resume" button, recruiters will receive a professionally formatted PDF that includes:

- **Header**: Your name, title, contact information, and LinkedIn
- **Executive Summary**: Your key qualifications in bullet form
- **Skills**: Organized by category with proficiency levels
- **Experience**: Full professional history with responsibilities and outcomes
- **Education & Certifications**: Academic background and credentials
- **Projects**: Key projects demonstrating your capabilities

The PDF will be clean, ATS-friendly (Applicant Tracking System compatible), and follow traditional resume formatting standards that federal contractors and recruiters expect.

---

## Technical Approach

### Option Chosen: Client-Side PDF Generation

I'll use `jspdf` and `html2canvas` libraries to generate the PDF directly in the browser. This approach:
- Requires no server/backend processing
- Works offline once the page is loaded
- Provides instant downloads
- Maintains your resume styling

### Library Installation Required
- `jspdf` - Core PDF generation
- `html2canvas` - Captures HTML as images for precise styling

---

## Implementation Steps

### Step 1: Install PDF Libraries
Add `jspdf` and `html2canvas` to the project dependencies.

### Step 2: Create Resume PDF Generator Utility
Create a new utility file that:
- Takes the resume data from the context
- Builds a professional PDF layout programmatically
- Uses proper typography, margins, and spacing
- Handles page breaks intelligently
- Returns a downloadable PDF file

### Step 3: Create a Hidden Print-Optimized Resume Component
Build a separate component specifically designed for PDF output:
- Uses print-friendly fonts (serif for headers, clean sans-serif for body)
- Single-column layout for ATS compatibility
- Proper margins (0.5" - 1" on all sides)
- Clean black text on white background
- No interactive elements

### Step 4: Update Download Buttons
Wire up the existing "Download Resume" buttons in:
- `Hero.tsx` - Main CTA button
- `Navigation.tsx` - Nav bar button

Both will trigger the PDF generation and download.

---

## PDF Design Specifications

The generated resume will follow professional federal contractor resume standards:

```text
+------------------------------------------+
|  PARKER TOOTILL                          |
|  Senior CBRN Warrant Officer             |
|  Fort Liberty, NC | email | LinkedIn     |
+------------------------------------------+
|                                          |
|  EXECUTIVE SUMMARY                       |
|  • Key qualification 1                   |
|  • Key qualification 2                   |
|  • ...                                   |
|                                          |
|  SKILLS                                  |
|  CWMD & Counterproliferation             |
|  • CWMD Strategy & Policy (Advanced, 8y) |
|  • ...                                   |
|                                          |
|  PROFESSIONAL EXPERIENCE                 |
|  Senior CBRN Warrant Officer             |
|  18th Airborne Corps | 2021 - Present    |
|  [Mission context and responsibilities]  |
|                                          |
|  EDUCATION                               |
|  [Degrees and certifications]            |
|                                          |
+------------------------------------------+
```

### Typography
- **Name**: 18-20pt, bold
- **Section Headers**: 12-14pt, bold, uppercase
- **Body Text**: 10-11pt, regular
- **Margins**: 0.75" on all sides

### Color Scheme
- Pure black text (#000000) for maximum ATS compatibility
- White background
- Subtle horizontal lines to separate sections

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/utils/generateResumePdf.ts` | Core PDF generation logic |
| `src/components/resume/ResumePdfContent.tsx` | Hidden component with print layout |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/resume/Hero.tsx` | Add onClick handler to Download button |
| `src/components/resume/Navigation.tsx` | Add onClick handler to Download button |
| `package.json` | Add jspdf and html2canvas dependencies |

---

## User Experience

1. User clicks "Download Resume" button
2. Brief loading indicator appears (~1-2 seconds)
3. Browser downloads `Parker_Tootill_Resume.pdf`
4. Toast notification confirms success

---

## Why This Approach?

| Consideration | Decision |
|---------------|----------|
| **ATS Compatibility** | Text-based PDF, not image-only, so resume scanners can parse it |
| **Professional Look** | Traditional layout that federal/government recruiters expect |
| **Dynamic Content** | Always generates from latest database content |
| **No Server Needed** | Runs entirely in browser, no edge function required |
| **Print Quality** | High-resolution output suitable for printing |

