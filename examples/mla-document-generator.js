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
            }`,
        pageNumber: `
            @page {
                margin: 1in;
            }
            .page-number {
                position: fixed;
                top: 0.5in;
                right: 1in;
                font-family: var(--font-family);
                font-size: var(--font-size);
            }
            .page-number::before {
                content: counter(page);
            }
            @media print {
                .page-break {
                    page-break-before: always;
                }
            }`,
        footnotes: `
            .footnote {
                font-size: 10pt;
                margin-top: 2em;
                border-top: 1px solid #000;
                padding-top: 1em;
            }
            .footnote-ref {
                vertical-align: super;
                font-size: smaller;
            }`,
        figures: `
            .figure-container {
                margin: 2em 0;
                text-align: center;
            }
            .figure-image {
                max-width: 100%;
                height: auto;
            }
            .figure-caption {
                font-size: 0.9em;
                margin-top: 0.5em;
                font-style: italic;
            }`
    };

    #paperTypes = {
        research: {
            requiresWorksCited: true,
            requiresAbstract: false,
            defaultSections: ['introduction', 'body', 'conclusion']
        },
        essay: {
            requiresWorksCited: false,
            requiresAbstract: false,
            defaultSections: ['introduction', 'body', 'conclusion']
        },
        thesis: {
            requiresWorksCited: true,
            requiresAbstract: true,
            defaultSections: ['abstract', 'introduction', 'methodology', 'results', 'discussion', 'conclusion']
        }
    };

    #citationFormats = {
        book: (author, title, publisher, year) => 
            `${author}. ${title}. ${publisher}, ${year}.`,
        
        journal: (author, title, journal, volume, issue, year, pages) =>
            `${author}. "${title}." ${journal}, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.`,
        
        website: (author, title, website, publisher, date, url) =>
            `${author}. "${title}." ${website}, ${publisher}, ${date}, ${url}.`
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

    #generateInTextCitation(author, pageNumber = null) {
        const citation = pageNumber 
            ? `(${author}, ${pageNumber})`
            : `(${author})`;
        return `<span class="in-text-citation">${this.#escapeHTML(citation)}</span>`;
    }

    #generateFootnote(content, index) {
        return {
            reference: `<sup class="footnote-ref">${index}</sup>`,
            note: `<div class="footnote" id="fn${index}">
                ${index}. ${this.#escapeHTML(content)}
            </div>`
        };
    }

    formatCitation(type, ...args) {
        if (!this.#citationFormats[type]) {
            throw new Error(`Unsupported citation type: ${type}`);
        }
        return this.#citationFormats[type](...args);
    }

    #generateTableOfContents(sections) {
        return `
            <div class="table-of-contents">
                <h2>Table of Contents</h2>
                ${sections.map((section, index) => `
                    <div class="toc-entry">
                        <span class="toc-title">${this.#escapeHTML(section.title)}</span>
                        <span class="toc-page">${section.page}</span>
                    </div>
                `).join('')}
            </div>`;
    }

    #generateAppendix(appendixData) {
        return `
            <div class="appendix page-break">
                <h2>Appendix ${appendixData.label}</h2>
                <div class="appendix-content">
                    ${this.#escapeHTML(appendixData.content)}
                </div>
            </div>`;
    }

    #generateFigure(imageData) {
        return `
            <div class="figure-container">
                <img 
                    class="figure-image" 
                    src="${this.#escapeHTML(imageData.src)}" 
                    alt="${this.#escapeHTML(imageData.alt)}"
                />
                <div class="figure-caption">
                    Fig. ${imageData.number}: ${this.#escapeHTML(imageData.caption)}
                </div>
            </div>`;
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
                    <div class="page-number"></div>
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

    #validatePaperType(type) {
        if (!this.#paperTypes[type]) {
            throw new Error(`Invalid paper type. Supported types: ${Object.keys(this.#paperTypes).join(', ')}`);
        }
    }
}

export default MLADocumentGenerator; 