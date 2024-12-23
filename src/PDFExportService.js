class PDFExportService {
    #defaultOptions;
    #worker = null;

    constructor(options = {}) {
        this.#defaultOptions = {
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
            // Initialize worker only once
            if (!this.#worker) {
                this.#worker = await html2pdf().from('').worker();
            }

            const pdfOptions = {
                margin: this.#defaultOptions.margins,
                filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false // Disable logging for better performance
                },
                jsPDF: { 
                    unit: 'in', 
                    format: this.#defaultOptions.pageSize,
                    compress: true // Enable compression
                }
            };

            return await this.#worker
                .set(pdfOptions)
                .from(documentHTML)
                .save();

        } catch (error) {
            throw new Error(`PDF Export failed: ${error.message}`);
        }
    }

    // Cleanup method
    destroy() {
        if (this.#worker) {
            this.#worker.destroy();
            this.#worker = null;
        }
    }
} 