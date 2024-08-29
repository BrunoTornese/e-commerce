Project E commerce on Next.js

## Start project on development

1. Clone the repository
2. Rename .env.template to .env and fill the variables
3. Install dependencies
   npm, yarn, pnpm install
4. Start the database
   docker-compose up -d
5. Run the migrations of prisma
   npx prisma migrate dev
6. Create the database
   npm run seed
7. Execute the project
   npm, yarn, pnpm run dev
