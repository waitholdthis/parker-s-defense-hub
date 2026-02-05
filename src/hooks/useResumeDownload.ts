 import { useState } from 'react';
 import { generateResumePdf } from '@/utils/generateResumePdf';
 import { ResumeData } from '@/hooks/useResumeData';
 import { toast } from 'sonner';
 
 export function useResumeDownload() {
   const [isGenerating, setIsGenerating] = useState(false);
 
   const downloadResume = async (data: ResumeData) => {
     if (isGenerating) return;
     
     setIsGenerating(true);
     try {
       await generateResumePdf(data);
       toast.success('Resume downloaded successfully!');
     } catch (error) {
       console.error('Error generating PDF:', error);
       toast.error('Failed to generate resume. Please try again.');
     } finally {
       setIsGenerating(false);
     }
   };
 
   return { downloadResume, isGenerating };
 }