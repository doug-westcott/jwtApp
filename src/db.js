// const calculateAge = birthdate =>
//     Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

const toJavaString = date => {
    // console.log('date', date)
    return date.toISOString().replace('T', ' ').replace('Z', '')
}

class DB {

    constructor(table) {
        this.table = table
    }

    async create(set, item) {
        // const response = 
        await fetch(`/${this.table}`,
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
        await fetch(`/${this.table}/${id}`,
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
        await fetch(`/${this.table}/${item.id}`,
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
        const response = await fetch(`/${this.table}/${query}`,
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

// subclass Students is like DB but much more specific
class Students extends DB {

    constructor() {
        super("students")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        if (item) {
            item = { ...item, id: 1 * item.id, birthdate: new Date(item.birthdate) }
        }
        return item
    }

    async findByName(name) {
        return this.reformatAll(await this.find(`search/findByName?name=${name}`))
    }

    async findByNameContaining(name) {
        return this.reformatAll(await this.find(`search/findByNameContaining?name=${name}`))
    }

    async findByBirthdateBetween(from, to) {
        return this.reformatAll(await this.find(`search/findByBirthdateBetween?from=${toJavaString(from)}&to=${toJavaString(to)}`))
    }

}

// subclass Students is like DB but much more specific
class Courses extends DB {

    constructor() {
        super("courses")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findBySubject(subject) {
        return this.reformatAll(await this.find(`search/findBySubject?subject=${subject}`))
    }

    async findByTitleContaining(title) {
        return this.reformatAll(await this.find(`search/findByTitleContaining?title=${title}`))
    }

    async findDistinctSubjects() {
        return [...new Set((await this.findAll()).map(course => course.subject))]
    }
}

// subclass Registers is like DB but much more specific
class Registers extends DB {

    constructor() {
        super("registers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByStudentid(id) {
        return this.reformatAll(await this.find(`search/findByStudentid?id=${id}`))
    }
    async findByCourseid(id) {
        return this.reformatAll(await this.find(`search/findByCourseid?id=${id}`))
    }

    async findByStudentidAndCourseid(studentid, courseid) {
        return this.reformatAll(await this.find(`search/findByStudentidAndCourseid?studentid=${studentid}&courseid=${courseid}`))
    }

    // 1 -- find students with that name (multiple)
    // 2 -- for each student, find registers with that studentid (multiple)
    // 3 -- result is distinct registers (multiple) after flattening nested arrays
    async findByStudentNameContaining(name) {
        const students = await db.Students.findByNameContaining(name)
        const registers = (await Promise.all(students.map(async student => await this.findByStudentid(student.id)))).flat()
        return [...new Set(registers)]
    }

    async findByCourseSubject(subject) {
        const courses = await db.Courses.findBySubject(subject)
        const registers = (await Promise.all(courses.map(async course => await this.findByCourseid(course.id)))).flat()
        return [...new Set(registers)]
    }

}

const db = {
    Students: new Students(),
    Courses: new Courses(),
    Registers: new Registers()
}

export default db