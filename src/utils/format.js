export const toCamelCase = (str) => {
    return str.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
}

export const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export const mapKeysToCamelCase = (data) => {
    const result = {}
    if (typeof data !== 'object' || data === null) return data

    if (Array.isArray(data)) {
        return data.map(mapKeysToCamelCase)
    } else {
        Object.keys(data).forEach((key) => {
            const value = data[key]
            result[toCamelCase(key)] =
                typeof data === 'object' ? mapKeysToCamelCase(value) : value
        })
    }

    return result
}

export const getTrustScoreColor = (score) => {
    let color = 'green'
    if (score < 6 && score >= 4) {
        color = 'orange'
    }
    if (score < 4) {
        color = 'red'
    }
    return color
}
