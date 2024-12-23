class StyleCustomizationModule {
    #styles = {
        default: {
            font: 'Times New Roman',
            fontSize: '12pt',
            lineHeight: '2',
            margins: '1in'
        }
    };

    setStyle(styleName, properties) {
        this.#validateProperties(properties);
        this.#styles[styleName] = {
            ...this.#styles.default,
            ...properties
        };
    }

    getStyle(styleName) {
        return this.#styles[styleName] || this.#styles.default;
    }

    #validateProperties(properties) {
        const validProperties = ['font', 'fontSize', 'lineHeight', 'margins'];
        const invalid = Object.keys(properties).filter(prop => !validProperties.includes(prop));
        
        if (invalid.length > 0) {
            throw new Error(`Invalid style properties: ${invalid.join(', ')}`);
        }
    }

    generateCSS(styleName) {
        const style = this.getStyle(styleName);
        return `
            .mla-document {
                font-family: ${style.font};
                font-size: ${style.fontSize};
                line-height: ${style.lineHeight};
                margin: ${style.margins};
            }
        `;
    }
} 