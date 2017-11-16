
export function store(data) {
    localStorage.setItem('shapes', JSON.stringify(data));
}

export function retrieve() {
    const data = JSON.parse(localStorage.getItem('shapes'));
    return data !== null ? data : [];
}
