class MLAFormatter {
    constructor() {
        this.paperSettings = {
            fontSize: '12pt',
            fontFamily: 'Times New Roman',
            lineSpacing: 'double',
            margins: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
            }
        };
    }

    formatHeader(studentName, professorName, courseName, date) {
        return `${studentName}
${professorName}
${courseName}
${date}`;
    }

    formatTitle(title) {
        return title.trim();
    }

    formatParagraph(text) {
        return text.replace(/\s+/g, ' ').trim();
    }

    formatCitation(author, title, container, otherContributors, version, number, publisher, pubDate, location) {
        let citation = '';
        
        // Author
        if (author) citation += `${author}. `;
        
        // Title
        if (title) citation += `"${title}." `;
        
        // Container
        if (container) citation += `${container}, `;
        
        // Other Contributors
        if (otherContributors) citation += `${otherContributors}, `;
        
        // Version
        if (version) citation += `${version}, `;
        
        // Number
        if (number) citation += `${number}, `;
        
        // Publisher
        if (publisher) citation += `${publisher}, `;
        
        // Publication Date
        if (pubDate) citation += `${pubDate}, `;
        
        // Location
        if (location) citation += `${location}`;
        
        return citation.trim() + '.';
    }

    createDocument(header, title, content, citations = []) {
        return {
            header: this.formatHeader(...header),
            title: this.formatTitle(title),
            content: content.map(para => this.formatParagraph(para)),
            citations: citations.map(citation => this.formatCitation(...citation)),
            settings: this.paperSettings
        };
    }
}

export default MLAFormatter; 