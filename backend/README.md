# Backend

- `db/` contains the database client and connection setup.
- `generated/` contains the Prisma client generated from `prisma/schema.prisma`.
- `services/` contains database operations used by the API.

Next.js API route adapters stay under `app/api/` because the App Router discovers endpoints from that directory.
