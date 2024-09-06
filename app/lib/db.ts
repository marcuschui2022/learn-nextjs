// import {Database} from './types.ts' // this is the Database interface we defined earlier
import {Pool} from 'pg'
import {Kysely, PostgresDialect} from 'kysely'

const dialect = new PostgresDialect({
    pool: new Pool({
        database: 'dashboard',
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        max: 10,
        password: 'mysecretpassword',
    })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<any>({
    dialect,
    // log: ['query', 'error']
})