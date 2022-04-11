const isObject = value => {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
};

const deepClone = (obj, stack = new WeakMap()) => {
    if (!isObject(obj)) {
        return obj;
    }
    const result = Array.isArray(obj) ? [] : {};

    if (typeof obj === 'function') {
        return obj;
    }

    if (stack.has(obj)) {
        return stack.get(obj);
    }

    stack.set(obj, result);

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => (typeof item === 'object' && item !== null ? deepClone(item, stack) : item));
    }

    Object.entries(result).forEach(([key, value]) => {
        result[key] = deepClone(value, stack);
    });

    return result;
};

deepClone();
