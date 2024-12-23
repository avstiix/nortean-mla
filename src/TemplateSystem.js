class TemplateSystem {
    #templates = {
        research: {
            sections: ['Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion'],
            required: ['title', 'abstract', 'content']
        },
        essay: {
            sections: ['Introduction', 'Body', 'Conclusion'],
            required: ['title', 'content']
        }
    };

    getTemplate(templateName) {
        if (!this.#templates[templateName]) {
            throw new Error(`Template "${templateName}" not found`);
        }
        return this.#templates[templateName];
    }

    validateTemplate(templateName, content) {
        const template = this.getTemplate(templateName);
        const missing = template.required.filter(field => !content[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        return true;
    }

    addTemplate(name, template) {
        if (this.#templates[name]) {
            throw new Error(`Template "${name}" already exists`);
        }
        this.#templates[name] = template;
    }
} 