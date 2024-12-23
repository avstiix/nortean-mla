class MLAErrorHandler {
    static errors = {
        VALIDATION: 'validation',
        FORMATTING: 'formatting',
        GENERATION: 'generation',
        EXPORT: 'export'
    };

    static handle(type, error, context = {}) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            type,
            message: error.message,
            context,
            stack: error.stack
        };

        console.error(JSON.stringify(errorLog, null, 2));
        return errorLog;
    }
} 