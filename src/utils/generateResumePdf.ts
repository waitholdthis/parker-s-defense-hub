 import jsPDF from 'jspdf';
 import { ResumeData } from '@/hooks/useResumeData';
 
 export async function generateResumePdf(data: ResumeData): Promise<void> {
   const doc = new jsPDF({
     orientation: 'portrait',
     unit: 'pt',
     format: 'letter'
   });
 
   const pageWidth = doc.internal.pageSize.getWidth();
   const pageHeight = doc.internal.pageSize.getHeight();
   const margin = 54; // 0.75 inch margins
   const contentWidth = pageWidth - (margin * 2);
   let yPos = margin;
 
   const checkPageBreak = (neededSpace: number) => {
     if (yPos + neededSpace > pageHeight - margin) {
       doc.addPage();
       yPos = margin;
     }
   };
 
   const addSectionHeader = (title: string) => {
     checkPageBreak(40);
     yPos += 16;
     doc.setFont('helvetica', 'bold');
     doc.setFontSize(12);
     doc.setTextColor(0, 0, 0);
     doc.text(title.toUpperCase(), margin, yPos);
     yPos += 4;
     doc.setDrawColor(0, 0, 0);
     doc.setLineWidth(0.5);
     doc.line(margin, yPos, pageWidth - margin, yPos);
     yPos += 12;
   };
 
   const addBodyText = (text: string, indent: number = 0) => {
     doc.setFont('helvetica', 'normal');
     doc.setFontSize(10);
     doc.setTextColor(0, 0, 0);
     const lines = doc.splitTextToSize(text, contentWidth - indent);
     lines.forEach((line: string) => {
       checkPageBreak(14);
       doc.text(line, margin + indent, yPos);
       yPos += 14;
     });
   };
 
   const addBulletPoint = (text: string, indent: number = 8) => {
     doc.setFont('helvetica', 'normal');
     doc.setFontSize(10);
     doc.setTextColor(0, 0, 0);
     const bulletIndent = margin + indent;
     const textIndent = bulletIndent + 10;
     const lines = doc.splitTextToSize(text, contentWidth - indent - 10);
     
     lines.forEach((line: string, index: number) => {
       checkPageBreak(14);
       if (index === 0) {
         doc.text('•', bulletIndent, yPos);
       }
       doc.text(line, textIndent, yPos);
       yPos += 14;
     });
   };
 
   // Header - Name
   doc.setFont('helvetica', 'bold');
   doc.setFontSize(20);
   doc.setTextColor(0, 0, 0);
   doc.text(data.personal.name.toUpperCase(), margin, yPos);
   yPos += 24;
 
   // Header - Title
   doc.setFont('helvetica', 'normal');
   doc.setFontSize(12);
   doc.text(data.personal.title, margin, yPos);
   yPos += 16;
 
   // Header - Contact Info
   doc.setFontSize(10);
   const contactLine = [
     data.personal.location,
     data.personal.email,
     data.personal.phone
   ].filter(Boolean).join(' | ');
   doc.text(contactLine, margin, yPos);
   yPos += 14;
 
   // LinkedIn
   if (data.personal.linkedin) {
     doc.setTextColor(0, 0, 150);
     doc.text(data.personal.linkedin, margin, yPos);
     doc.setTextColor(0, 0, 0);
     yPos += 14;
   }
 
   // Executive Summary
   if (data.executiveSummary && data.executiveSummary.length > 0) {
     addSectionHeader('Executive Summary');
     data.executiveSummary.forEach((item) => {
       addBulletPoint(item);
     });
   }
 
   // Skills
   if (data.skills?.categories && data.skills.categories.length > 0) {
     addSectionHeader('Skills');
     data.skills.categories.forEach((category) => {
       checkPageBreak(30);
       doc.setFont('helvetica', 'bold');
       doc.setFontSize(10);
       doc.text(category.name, margin, yPos);
       yPos += 14;
       
       const skillsList = category.skills
         .map(s => `${s.name} (${s.proficiency}, ${s.years}y)`)
         .join(', ');
       addBodyText(skillsList, 8);
       yPos += 4;
     });
   }
 
   // Professional Experience
   if (data.experience && data.experience.length > 0) {
     addSectionHeader('Professional Experience');
     data.experience.forEach((exp) => {
       checkPageBreak(60);
       
       // Title
       doc.setFont('helvetica', 'bold');
       doc.setFontSize(11);
       doc.text(exp.title, margin, yPos);
       yPos += 14;
       
       // Organization and dates
       doc.setFont('helvetica', 'normal');
       doc.setFontSize(10);
       const orgLine = `${exp.organization} | ${exp.location} | ${exp.startDate} - ${exp.endDate}`;
       doc.text(orgLine, margin, yPos);
       yPos += 14;
       
       // Mission context
       if (exp.missionContext) {
         addBodyText(exp.missionContext);
       }
       
       // Responsibilities
       if (exp.responsibilities && exp.responsibilities.length > 0) {
         exp.responsibilities.forEach((resp) => {
           addBulletPoint(resp);
         });
       }
       
       // Outcomes
       if (exp.outcomes && exp.outcomes.length > 0) {
         checkPageBreak(20);
         doc.setFont('helvetica', 'italic');
         doc.setFontSize(10);
         doc.text('Key Outcomes:', margin + 8, yPos);
         yPos += 12;
         doc.setFont('helvetica', 'normal');
         exp.outcomes.forEach((outcome) => {
           addBulletPoint(outcome, 16);
         });
       }
       
       yPos += 8;
     });
   }
 
   // Education
   if (data.education && data.education.length > 0) {
     addSectionHeader('Education & Certifications');
     data.education.forEach((edu) => {
       checkPageBreak(40);
       
       doc.setFont('helvetica', 'bold');
       doc.setFontSize(10);
       doc.text(edu.title, margin, yPos);
       yPos += 14;
       
       doc.setFont('helvetica', 'normal');
       const eduLine = `${edu.institution} | ${edu.location} | ${edu.completionDate}`;
       doc.text(eduLine, margin, yPos);
       yPos += 14;
       
       if (edu.description) {
         addBodyText(edu.description);
       }
       yPos += 4;
     });
   }
 
   // Certifications
   if (data.certifications && data.certifications.length > 0) {
     checkPageBreak(30);
     doc.setFont('helvetica', 'bold');
     doc.setFontSize(10);
     doc.text('Certifications:', margin, yPos);
     yPos += 14;
     
     data.certifications.forEach((cert) => {
       addBulletPoint(`${cert.name} - ${cert.issuer} (${cert.date})`);
     });
   }
 
   // Projects
   if (data.projects && data.projects.length > 0) {
     addSectionHeader('Key Projects');
     data.projects.forEach((project) => {
       checkPageBreak(50);
       
       doc.setFont('helvetica', 'bold');
       doc.setFontSize(10);
       doc.text(project.title, margin, yPos);
       yPos += 14;
       
       doc.setFont('helvetica', 'italic');
       doc.text(`Role: ${project.role}`, margin, yPos);
       yPos += 12;
       
       doc.setFont('helvetica', 'normal');
       if (project.problem) {
         addBodyText(`Challenge: ${project.problem}`);
       }
       if (project.approach) {
         addBodyText(`Approach: ${project.approach}`);
       }
       if (project.outcome) {
         addBodyText(`Outcome: ${project.outcome}`);
       }
       if (project.tools && project.tools.length > 0) {
         addBodyText(`Tools: ${project.tools.join(', ')}`);
       }
       yPos += 8;
     });
   }
 
   // Generate filename
   const fileName = `${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
   doc.save(fileName);
 }