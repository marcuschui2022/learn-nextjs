import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
import {db} from '@/app/lib/db'
import {customers, invoices, revenue, users} from '../lib/placeholder-data';
import {sql, Transaction} from 'kysely'

// const client = await db.executeQuery().connect();


async function seedUsers(trx: Transaction<any>) {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(trx)
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(255) NOT NULL
    )`.execute(trx);

    return await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
        INSERT INTO users ( name, email, password, role)
        VALUES ( ${user.name}, ${user.email}, ${hashedPassword}, ${user.role} )
        ON CONFLICT (id) DO NOTHING;
      `.execute(trx);
        }),
    );
}


async function seedInvoices(trx: Transaction<any>) {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(trx);

    await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `.execute(trx);

    return await Promise.all(
        invoices.map(
            (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `.execute(trx),
        ),
    );
}

async function seedCustomers(trx: Transaction<any>) {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(trx);

    await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `.execute(trx);

    return await Promise.all(
        customers.map(
            (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `.execute(trx),
        ),
    );
}

async function seedRevenue(trx: Transaction<any>) {
    await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `.execute(trx);

    return await Promise.all(
        revenue.map(
            (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `.execute(trx),
        ),
    );
}

export async function GET() {

    // await db.transaction().execute(async (trx) => {
    //     await seedUsers(trx)
    //     await seedCustomers(trx);
    //     await seedInvoices(trx);
    //     await seedRevenue(trx);
    // });

    return Response.json({
        message:
            'Uncomment this file and remove this line. You can delete this file when you are finished.',
    });

}
