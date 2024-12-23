class MLATableManager {
    #tableCount = 0;
    #cache = new Map(); // Cache for generated tables

    createTable(tableData) {
        const cacheKey = JSON.stringify(tableData);
        
        // Check cache first
        if (this.#cache.has(cacheKey)) {
            return this.#cache.get(cacheKey);
        }

        this.#tableCount++;
        const table = {
            id: `table-${this.#tableCount}`,
            html: this.#generateTableHTML(tableData),
            caption: tableData.caption,
            reference: `Table ${this.#tableCount}`
        };

        // Store in cache
        this.#cache.set(cacheKey, table);
        return table;
    }

    #generateTableHTML(tableData) {
        const { headers, rows, caption } = tableData;
        // Pre-allocate array size for better memory usage
        const headerCells = new Array(headers.length);
        
        // Single pass header generation
        for (let i = 0; i < headers.length; i++) {
            headerCells[i] = `<th>${headers[i]}</th>`;
        }

        // Optimize row generation with StringBuilder pattern
        const rowsHTML = rows.reduce((html, row) => {
            html.push('<tr>');
            for (let i = 0; i < row.length; i++) {
                html.push(`<td>${row[i]}</td>`);
            }
            html.push('</tr>');
            return html;
        }, []).join('');

        return `
            <div class="mla-table-container">
                <table class="mla-table">
                    <caption>${caption}</caption>
                    <thead><tr>${headerCells.join('')}</tr></thead>
                    <tbody>${rowsHTML}</tbody>
                </table>
            </div>
        `;
    }
} 