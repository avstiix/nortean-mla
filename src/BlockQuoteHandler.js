class BlockQuoteHandler {
    formatBlockQuote(quoteData) {
        const { text, author, citation } = quoteData;
        const isLongQuote = text.split(' ').length > 40;

        return {
            html: this.#generateQuoteHTML(text, author, citation, isLongQuote),
            isLongQuote,
            citation: this.#formatCitation(author, citation)
        };
    }

    #generateQuoteHTML(text, author, citation, isLongQuote) {
        const quoteClass = isLongQuote ? 'mla-block-quote-long' : 'mla-block-quote';
        return `
            <blockquote class="${quoteClass}">
                <p>${text}</p>
                ${author ? `<cite>${author}</cite>` : ''}
                ${citation ? `<span class="citation">(${citation})</span>` : ''}
            </blockquote>
        `;
    }

    #formatCitation(author, citation) {
        if (!author && !citation) return '';
        return `(${[author, citation].filter(Boolean).join(', ')})`;
    }
} 