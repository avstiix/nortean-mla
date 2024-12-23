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

## New Components

### MLATableManager
- Optimized table generation with caching system
- Efficient HTML generation using array joins
- Support for complex table structures
- Memory-efficient table processing
- Automatic table numbering and referencing

### BlockQuoteHandler
- Smart quote formatting with caching
- Efficient word count algorithm
- Support for both short and long quotes
- Automatic citation integration
- Memory-optimized HTML generation

### PDFExportService
- Worker-based PDF generation
- Reusable worker instances
- Compressed PDF output
- Memory-efficient processing
- Configurable export options

### TemplateSystem
- Fast template validation using Sets
- Cached template results
- Pre-initialized default templates
- Memory-efficient template storage
- Quick template lookup using Map

### StyleCustomizationModule
- Efficient style property validation
- Cached CSS generation
- Preset theme support
- Memory-optimized style storage
- Quick style application

## New Features

### Error Handling
- Centralized error management
- Detailed error logging
- Context-aware error reporting
- Error categorization

### Document State Management
- Document version control
- State history tracking
- Undo/Redo capabilities
- State persistence

### Configuration Management
- Centralized configuration
- Default settings management
- Runtime configuration updates
- Configuration validation

### Performance Monitoring
- Operation timing
- Performance metrics
- Resource usage tracking
- Optimization insights

## Performance Optimizations
- Implemented caching mechanisms for repeated operations
- Used efficient data structures (Map, Set, WeakMap)
- Optimized string operations with array joins
- Added memory management and cleanup
- Implemented worker reuse for heavy operations

## Usage Examples

### Using MLATableManager
```javascript
const tableManager = new MLATableManager();
const tableData = {
    headers: ['Name', 'Value'],
    rows: [['Item 1', '100'], ['Item 2', '200']],
    caption: 'Sample Table'
};
const table = tableManager.createTable(tableData);
```

### Using BlockQuoteHandler
```javascript
const quoteHandler = new BlockQuoteHandler();
const quote = quoteHandler.formatBlockQuote({
    text: 'This is a sample quote',
    author: 'John Doe',
    citation: 'Page 42'
});
```

### Using PDFExportService
```javascript
const pdfService = new PDFExportService();
await pdfService.exportToPDF(documentHTML, 'output.pdf');
// Don't forget to clean up
pdfService.destroy();
```

### Using TemplateSystem
```javascript
const templateSystem = new TemplateSystem();
const template = templateSystem.getTemplate('research');
templateSystem.validateTemplate('research', documentData);
```

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
- html2pdf.js (for PDF export)
- Optional: Node.js for local development.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request.