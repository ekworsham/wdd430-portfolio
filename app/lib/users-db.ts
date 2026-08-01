import { sql } from "@vercel/postgres";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql<User>`
    SELECT *
    FROM users
    WHERE email = ${email};
  `;

  return rows[0] ?? null;
}