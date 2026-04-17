// js/api.js

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:3001/api`;

// Core fetch function — automatically adds the login token
async function request(path, options = {}) {
    const token = localStorage.getItem('placement_token');

    const response = await fetch(BASE_URL + path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            // Attach token if we have one
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    // If server says "not logged in" → force logout
    if (response.status === 401) {
        localStorage.removeItem('placement_token');
        localStorage.removeItem('placement_user');
        window.location.reload();
        return;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
}

// Export simple methods for all pages to use
export const api = {
    // GET request: api.get('/students')
    get: (path) => request(path),

    // POST request: api.post('/auth/login', { username, password })
    post: (path, body) => request(path, {
        method: 'POST',
        body: JSON.stringify(body)
    }),

    // PUT request: api.put('/students/1', { status: 'Placed' })
    put: (path, body) => request(path, {
        method: 'PUT',
        body: JSON.stringify(body)
    }),

    // DELETE request: api.delete('/users/5')
    delete: (path) => request(path, { method: 'DELETE' })
};
