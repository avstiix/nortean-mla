class PDFExportService {
    constructor(options = {}) {
        this.options = {
            pageSize: 'letter',
            margins: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
            },
            ...options
        };
    }

    async exportToPDF(documentHTML, filename) {
        try {
            const pdfOptions = {
                margin: this.options.margins,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: this.options.pageSize }
            };

            return await html2pdf().from(documentHTML).set(pdfOptions).save();
        } catch (error) {
            throw new Error(`PDF Export failed: ${error.message}`);
        }
    }
} 