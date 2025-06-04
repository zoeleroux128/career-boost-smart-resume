import { ResumeData } from '@/types/resume';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (resumeData: ResumeData) => {
  try {
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) {
      console.error('Resume content element not found');
      return;
    }

    // Create canvas from the resume element
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 816, // 8.5 inches at 96 DPI
      height: 1056, // 11 inches at 96 DPI
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 612; // 8.5 inches in points
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Download the PDF
    const fileName = `${resumeData.personal.fullName || 'resume'}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to HTML download if PDF generation fails
    exportToHTML(resumeData);
  }
};

export const exportToHTML = (resumeData: ResumeData) => {
  const resumeElement = document.getElementById('resume-content');
  if (resumeElement) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.personal.fullName || 'Resume'}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: ${resumeData.customization.font}, Arial, sans-serif;
            background: #f5f5f5;
          }
          .resume-content {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 40px;
          }
          @media print {
            body { background: white; padding: 0; }
            .resume-content { 
              box-shadow: none; 
              margin: 0; 
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="resume-content">
          ${resumeElement.innerHTML}
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personal.fullName || 'resume'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export const exportToDOCX = async (resumeData: ResumeData) => {
  const { personal, summary, experience, education, skills } = resumeData;
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with name
        new Paragraph({
          children: [
            new TextRun({
              text: personal.fullName,
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        
        // Contact info
        new Paragraph({
          children: [
            new TextRun({
              text: [
                personal.email,
                personal.phone,
                personal.location,
                personal.linkedin,
                personal.website
              ].filter(Boolean).join(' | '),
              size: 20,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Summary section
        ...(summary ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: summary,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),
        ] : []),

        // Experience section
        ...(experience.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL EXPERIENCE",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          ...experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: ` | ${exp.company}`,
                  size: 22,
                }),
                new TextRun({
                  text: ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  size: 20,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...(exp.description ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.description,
                    size: 20,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
            ...exp.achievements.map(achievement => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${achievement}`,
                    size: 20,
                  }),
                ],
                spacing: { after: 50 },
              })
            ),
            new Paragraph({
              children: [new TextRun({ text: "", size: 20 })],
              spacing: { after: 200 },
            }),
          ]),
        ] : []),

        // Education section
        ...(education.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "EDUCATION",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          ...education.map(edu => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: ` | ${edu.institution}`,
                  size: 22,
                }),
                new TextRun({
                  text: ` | ${edu.startDate} - ${edu.endDate}`,
                  size: 20,
                  italics: true,
                }),
                ...(edu.gpa ? [
                  new TextRun({
                    text: ` | GPA: ${edu.gpa}`,
                    size: 20,
                  }),
                ] : []),
              ],
              spacing: { after: 200 },
            })
          ),
        ] : []),

        // Skills section
        ...(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "SKILLS",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          ...(skills.technical.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Technical Skills: ",
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: skills.technical.join(', '),
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
            }),
          ] : []),
          ...(skills.soft.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Core Competencies: ",
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: skills.soft.join(', '),
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
            }),
          ] : []),
          ...(skills.languages.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Languages: ",
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: skills.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', '),
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
            }),
          ] : []),
        ] : []),
      ],
    }],
  });

  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personal.fullName || 'resume'}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating DOCX:', error);
  }
};
