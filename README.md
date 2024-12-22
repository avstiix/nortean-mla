# MLA Document Formatter and Generator

## Overview
This project provides tools for generating and formatting MLA-style documents programmatically. It includes two main components:

1. **MLAFormatter**: A utility class to format various aspects of MLA papers, such as headers, titles, paragraphs, and citations.
2. **MLADocumentGenerator**: A class that builds complete MLA-style documents in HTML format, applying formatting rules and styling.

## Features

### MLAFormatter
- Configure default paper settings (font, margins, line spacing).
- Format MLA headers with student and course information.
- Format titles and paragraphs for MLA style.
- Generate citations in MLA format based on provided attributes (author, title, publisher, etc.).
- Create document structures with consistent formatting.

### MLADocumentGenerator
- Validate document data for required fields and structure.
- Apply MLA-compliant styles (headers, margins, citations, etc.).
- Generate HTML content for documents.
- Add advanced features like:
  - Works Cited sections.
  - Table of Contents.
  - In-text citations and footnotes.
  - Figures and appendices.
- Export documents as downloadable HTML files.

## Installation
1. Clone this repository.
   ```bash
   git clone https://github.com/your-repo/mla-document-generator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mla-document-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Example: Using `MLAFormatter`
```javascript
import MLAFormatter from './mla-formatter.js';

const formatter = new MLAFormatter();

const header = formatter.formatHeader(
    'Jane Doe',
    'Dr. Smith',
    'English 101',
    '22 December 2024'
);

const title = formatter.formatTitle('The Impact of Technology on Society');
const paragraph = formatter.formatParagraph('    This is an example paragraph, formatted to comply with MLA standards.    ');

const citation = formatter.formatCitation(
    'John Doe',
    'A History of Technology',
    'Technology Press',
    '2024'
);

console.log(header, title, paragraph, citation);
```

### Example: Generating a Complete Document
```javascript
import MLADocumentGenerator from './scripts/mladocument-generator.js';

const generator = new MLADocumentGenerator();

const documentData = {
    header: ['Jane Doe', 'Dr. Smith', 'English 101', '22 December 2024'],
    title: 'The Role of Technology in Modern Society',
    content: [
        'Technology has significantly shaped modern life...',
        'From healthcare to education, its impact is undeniable...'
    ],
    citations: [
        ['John Doe', 'Technology and Society', 'Tech Press', '2024']
    ]
};

const html = generator.generateHTML(documentData);
generator.saveToFile(html, 'MLA_Document.html');
```

## File Structure
- `mla-formatter.js`: Contains the `MLAFormatter` class for basic formatting tasks.
- `mladocument-generator.js`: Contains the `MLADocumentGenerator` class for advanced document generation.
- `styles/`: Contains CSS templates for MLA-compliant styling.

## Styles
The generator applies CSS for:
- Font and line spacing.
- Header, title, and content formatting.
- Works Cited section styling.
- Page numbering for print.

## Citation Formats
Supported citation types:
- **Books**: `author, title, publisher, year`
- **Journals**: `author, title, journal, volume, issue, year, pages`
- **Websites**: `author, title, website, publisher, date, URL`

### Example
```javascript
generator.formatCitation'book', 'John Doe', 'Modern Tech', 'Tech Press', '2024');
// Output: John Doe. Modern Tech. Tech Press, 2024.
```

## Dependencies
- JavaScript (ES6+)
- HTML5/CSS3
- Optional: Node.js for local development.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request.