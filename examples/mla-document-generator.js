import MLAFormatter from '../mla-formatter.js';

class MLADocumentGenerator {
    #formatter;
    #styles = {
        base: `
            body {
                font-family: var(--font-family);
                font-size: var(--font-size);
                line-height: var(--line-height);
                margin: var(--margin);
            }`,
        header: `
            .header {
                text-align: left;
                margin-bottom: 2em;
            }`,
        title: `
            .title {
                text-align: center;
                margin-bottom: 2em;
            }`,
        content: `
            .paragraph {
                text-indent: 0.5in;
                margin-bottom: 1em;
            }`,
        citations: `
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
            }`
    };

    constructor() {
        this.#formatter = new MLAFormatter();
    }

    #validateDocumentData(documentData) {
        const required = ['header', 'title', 'content'];
        const missing = required.filter(field => !documentData[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        if (!Array.isArray(documentData.header) || documentData.header.length !== 4) {
            throw new Error('Header must be an array with 4 elements: [studentName, professorName, courseName, date]');
        }

        if (!Array.isArray(documentData.content) || documentData.content.length === 0) {
            throw new Error('Content must be a non-empty array of paragraphs');
        }
    }

    #generateCSSVariables(mlaDoc) {
        const margins = mlaDoc.settings.margins;
        return `
            :root {
                --font-family: ${mlaDoc.settings.fontFamily};
                --font-size: ${mlaDoc.settings.fontSize};
                --line-height: ${mlaDoc.settings.lineSpacing === 'double' ? '2' : '1.5'};
                --margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
            }`;
    }

    #generateStyles(mlaDoc) {
        return `
            <style>
                ${this.#generateCSSVariables(mlaDoc)}
                ${Object.values(this.#styles).join('\n')}
            </style>`;
    }

    #generateContent(content) {
        return content.map(para => `
            <div class="paragraph">
                ${this.#escapeHTML(para)}
            </div>`).join('');
    }

    #generateCitations(citations) {
        if (!citations?.length) return '';
        
        return `
            <div class="works-cited">
                <h2>Works Cited</h2>
                ${citations.map(citation => `
                    <div class="citation">
                        ${this.#escapeHTML(citation)}
                    </div>`).join('')}
            </div>`;
    }

    #escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    generateHTML(documentData) {
        try {
            this.#validateDocumentData(documentData);
            
            const mlaDoc = this.#formatter.createDocument(
                documentData.header,
                documentData.title,
                documentData.content,
                documentData.citations
            );

            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${this.#escapeHTML(mlaDoc.title)}</title>
                    ${this.#generateStyles(mlaDoc)}
                </head>
                <body>
                    <div class="header">
                        ${mlaDoc.header.split('\n').map(line => this.#escapeHTML(line)).join('<br>')}
                    </div>
                    
                    <div class="title">
                        ${this.#escapeHTML(mlaDoc.title)}
                    </div>
                    
                    <div class="content">
                        ${this.#generateContent(mlaDoc.content)}
                    </div>
                    
                    ${this.#generateCitations(mlaDoc.citations)}
                </body>
                </html>`;
        } catch (error) {
            console.error('Error generating HTML:', error);
            throw error;
        }
    }

    async saveToFile(html, filename) {
        if (!html) throw new Error('HTML content is required');
        
        try {
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'mla-document.html';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error saving file:', error);
            throw new Error('Failed to save file: ' + error.message);
        }
    }
}

export default MLADocumentGenerator; 