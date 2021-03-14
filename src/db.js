// const calculateAge = birthdate =>
//     Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

// const toJavaString = date => {
//     // console.log('date', date)
//     return date.toISOString().replace('T', ' ').replace('Z', '')
// }

const getJwtUser = () => sessionStorage.getItem("jwtUser") ? JSON.parse(sessionStorage.getItem("jwtUser")) : null
const setJwtUser = user => user ? sessionStorage.setItem("jwtUser", JSON.stringify(user)) : sessionStorage.removeItem("jwtUser")

const authFetch = (url, options) => {
    const jwtUser = getJwtUser()
    if (jwtUser) {
        options = options || {}
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${jwtUser.token}`
    }
    return fetch(url, options)
}

const uploadImage = async (imageFile, name) => {
    console.log('imageFile object', imageFile)
    const body = new FormData()
    body.append('file', imageFile, name)
    const result = await authFetch('/images', {
        method: 'POST',
        body
    })
    console.log('uploadImage result', result)
    return result
}

const email = async (to, subject, text) => {
    const result = await fetch('/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text })
    })
    console.log('email result', result)
    return result
}

class DB {

    constructor(table) {
        this.table = table
    }


    async create(set, item) {
        console.log(item)
        // const response = 
        await authFetch(`/${this.table}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('create response', response)
        set(await this.findAll())
    }

    async remove(set, id) {
        // const response = 
        await authFetch(`/${this.table}/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    async update(set, item) {
        // const response = 
        await authFetch(`/${this.table}/${item.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    reformatOne(item) {
        // console.log('reformatOne in', item)
        if (item) {
            const { _links, ...rest } = item
            const id = _links.self.href.split(`${this.table}/`)[1]
            item = { id, ...rest }
            // console.log('reformatOne out', item)
        }
        return item
    }

    reformatAll(items) {
        // console.log('reformatAll in', items)
        items = items._embedded[this.table].map(item => this.reformatOne(item))
        // console.log('reformatAll out', items)
        return items
    }

    async find(query) {
        // access the server through url, issuing GET request
        // for url: http://localhost:8080/registers (for example)
        const response = await authFetch(`/${this.table}/${query}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        // console.log('response', response)
        if (response.ok) {
            const json = await response.json()
            // console.log('json', json)
            return json
        }
        else {
            return undefined
        }
    }

    async findAll() {
        return this.reformatAll(await this.find(""))
    }

    async findOne(id) {
        return this.reformatOne(await this.find(id))
    }
}

class Users extends DB {

    constructor() {
        super("users")
    }

}

class Products extends DB {

    constructor() {
        super("products")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByNameContaining(name) {
        return this.reformatAll(await this.find(`search/findByNameContaining?name=${name}`))
    }

}

class Carts extends DB {

    constructor() {
        super("carts")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }
}

class Cartitems extends DB {

    constructor() {
        super("cartitems")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }

}

const db = {
    getJwtUser,
    setJwtUser,
    uploadImage,
    email,
    Products: new Products(),
    Users: new Users(),
    Carts: new Carts(),
    Cartitems: new Cartitems()
}

export default db