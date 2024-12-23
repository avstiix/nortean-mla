class TemplateSystem {
    #templates = new Map();
    #validationCache = new WeakMap();

    constructor() {
        this.#initializeDefaultTemplates();
    }

    #initializeDefaultTemplates() {
        const defaults = {
            research: {
                sections: ['Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion'],
                required: new Set(['title', 'abstract', 'content'])
            },
            essay: {
                sections: ['Introduction', 'Body', 'Conclusion'],
                required: new Set(['title', 'content'])
            }
        };

        for (const [name, template] of Object.entries(defaults)) {
            this.#templates.set(name, template);
        }
    }

    getTemplate(templateName) {
        const template = this.#templates.get(templateName);
        if (!template) {
            throw new Error(`Template "${templateName}" not found`);
        }
        return template;
    }

    validateTemplate(templateName, content) {
        if (this.#validationCache.has(content)) {
            return this.#validationCache.get(content);
        }

        const template = this.getTemplate(templateName);
        const missing = Array.from(template.required)
            .filter(field => !content[field]);

        const result = missing.length === 0;
        this.#validationCache.set(content, result);

        if (!result) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        return result;
    }

    addTemplate(name, template) {
        if (this.#templates.has(name)) {
            throw new Error(`Template "${name}" already exists`);
        }
        this.#templates.set(name, template);
    }
} 