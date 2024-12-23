class ConfigManager {
    #config = new Map();
    #defaults = {
        paper: {
            fontSize: '12pt',
            fontFamily: 'Times New Roman',
            lineSpacing: 'double',
            margins: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in'
            }
        }
    };

    constructor() {
        Object.entries(this.#defaults).forEach(([key, value]) => {
            this.#config.set(key, value);
        });
    }

    get(key) {
        return this.#config.get(key) ?? this.#defaults[key];
    }

    set(key, value) {
        this.#config.set(key, {...this.#defaults[key], ...value});
    }
} 