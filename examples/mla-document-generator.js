import MLAFormatter from '../mla-formatter.js';

class MLADocumentGenerator {
    constructor() {
        this.formatter = new MLAFormatter();
    }

    generateHTML(documentData) {
        const mlaDoc = this.formatter.createDocument(
            documentData.header,
            documentData.title,
            documentData.content,
            documentData.citations
        );

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${mlaDoc.title}</title>
    <style>
        body {
            font-family: ${mlaDoc.settings.fontFamily};
            font-size: ${mlaDoc.settings.fontSize};
            line-height: ${mlaDoc.settings.lineSpacing === 'double' ? '2' : '1.5'};
            margin: ${mlaDoc.settings.margins.top} ${mlaDoc.settings.margins.right} 
                   ${mlaDoc.settings.margins.bottom} ${mlaDoc.settings.margins.left};
        }
        .header {
            text-align: left;
            margin-bottom: 2em;
        }
        .title {
            text-align: center;
            margin-bottom: 2em;
        }
        .paragraph {
            text-indent: 0.5in;
            margin-bottom: 1em;
        }
        .works-cited {
            margin-top: 2em;
            page-break-before: always;
        }
        .works-cited h2 {
            text-align: center;
            margin-bottom: 1em;
        }
        .citation {
            padding-left: 0.5in;
            text-indent: -0.5in;
            margin-bottom: 1em;
        }
    </style>
</head>
<body>
    <div class="header">
        ${mlaDoc.header.split('\n').join('<br>')}
    </div>
    
    <div class="title">
        ${mlaDoc.title}
    </div>
    
    <div class="content">
        ${mlaDoc.content.map(para => `
        <div class="paragraph">
            ${para}
        </div>`).join('')}
    </div>
    
    ${mlaDoc.citations.length > 0 ? `
    <div class="works-cited">
        <h2>Works Cited</h2>
        ${mlaDoc.citations.map(citation => `
        <div class="citation">
            ${citation}
        </div>`).join('')}
    </div>
    ` : ''}
</body>
</html>`;

        return html;
    }

    saveToFile(html, filename) {
        // This is a browser-based download
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'mla-document.html';
        a.click();
        URL.revokeObjectURL(url);
    }
}

const generator = new MLADocumentGenerator();

const sampleDocument = {
    header: [
        'John Smith',
        'Professor Johnson',
        'English 101',
        '15 March 2024'
    ],
    title: 'The Impact of Social Media on Modern Communication',
    content: [
        'Social media has fundamentally transformed the way humans communicate in the modern era.',
        'This transformation has led to both positive and negative consequences for society.'
    ],
    citations: [
        ['Smith, John', 'The Evolution of Social Media', 'Journal of Digital Communication', 
         null, null, 'vol. 12', 'Academic Press', '2024', 'pp. 45-67']
    ]
};

const html = generator.generateHTML(sampleDocument);

// Save to file (when running in browser)
// generator.saveToFile(html, 'my-mla-paper.html');

export default MLADocumentGenerator; 