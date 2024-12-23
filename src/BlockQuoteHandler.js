class BlockQuoteHandler {
    #cache = new Map();
    #wordCountThreshold = 40;

    formatBlockQuote(quoteData) {
        const cacheKey = JSON.stringify(quoteData);
        
        if (this.#cache.has(cacheKey)) {
            return this.#cache.get(cacheKey);
        }

        const { text, author, citation } = quoteData;
        const isLongQuote = this.#quickWordCount(text) > this.#wordCountThreshold;

        const result = {
            html: this.#generateQuoteHTML(text, author, citation, isLongQuote),
            isLongQuote,
            citation: this.#formatCitation(author, citation)
        };

        this.#cache.set(cacheKey, result);
        return result;
    }

    #quickWordCount(text) {
        return text.trim().split(/\s+/).length;
    }

    #generateQuoteHTML(text, author, citation, isLongQuote) {
        const parts = [
            `<blockquote class="${isLongQuote ? 'mla-block-quote-long' : 'mla-block-quote'}">`,
            `<p>${text}</p>`
        ];

        if (author) parts.push(`<cite>${author}</cite>`);
        if (citation) parts.push(`<span class="citation">(${citation})</span>`);
        parts.push('</blockquote>');

        return parts.join('');
    }

    #formatCitation(author, citation) {
        if (!author && !citation) return '';
        return `(${[author, citation].filter(Boolean).join(', ')})`;
    }
} 