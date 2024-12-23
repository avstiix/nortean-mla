class PerformanceMonitor {
    #metrics = new Map();
    
    startOperation(operationName) {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            this.#recordMetric(operationName, duration);
        };
    }

    #recordMetric(operation, duration) {
        if (!this.#metrics.has(operation)) {
            this.#metrics.set(operation, []);
        }
        this.#metrics.get(operation).push(duration);
    }

    getMetrics() {
        const results = {};
        this.#metrics.forEach((durations, operation) => {
            results[operation] = {
                average: durations.reduce((a, b) => a + b, 0) / durations.length,
                min: Math.min(...durations),
                max: Math.max(...durations),
                count: durations.length
            };
        });
        return results;
    }
} 