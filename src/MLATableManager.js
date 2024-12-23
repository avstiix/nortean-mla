class MLATableManager {
    constructor() {
        this.tableCount = 0;
    }

    createTable(tableData) {
        this.tableCount++;
        return {
            id: `table-${this.tableCount}`,
            html: this.#generateTableHTML(tableData),
            caption: tableData.caption,
            reference: `Table ${this.tableCount}`
        };
    }

    #generateTableHTML(tableData) {
        const { headers, rows, caption } = tableData;
        return `
            <div class="mla-table-container">
                <table class="mla-table">
                    <caption>${caption}</caption>
                    <thead>
                        <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
} 