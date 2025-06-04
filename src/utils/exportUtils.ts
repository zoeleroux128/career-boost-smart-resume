
import { ResumeData } from '@/types/resume';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export const exportToPDF = async (resumeData: ResumeData) => {
  try {
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) return;

    // Create a canvas to render the HTML content
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for standard letter size (8.5 x 11 inches at 96 DPI)
    canvas.width = 816; // 8.5 * 96
    canvas.height = 1056; // 11 * 96

    // Create an image from the resume content
    const resumeClone = resumeElement.cloneNode(true) as HTMLElement;
    resumeClone.style.width = '816px';
    resumeClone.style.height = 'auto';
    resumeClone.style.backgroundColor = 'white';
    resumeClone.style.padding = '40px';
    resumeClone.style.fontFamily = resumeData.customization.font;

    // Create a data URL from the HTML
    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="816" height="1056">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${resumeClone.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to PDF-like download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${resumeData.personal.fullName || 'resume'}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to HTML download
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
