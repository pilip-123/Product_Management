const BASE_URL = '/api/users'

async function handleResponse(res) {
  const json = await res.json()
  if (!json.success) {
    throw new Error(json.message)
  }
  return json.data
}

export const userApi = {
  async getAll() {
    const res = await fetch(BASE_URL)
    return handleResponse(res)
  },

  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`)
    return handleResponse(res)
  },

  async create(data) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },

  async update(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(res)
  },
}
