## Teslo-Shop - E-commerce on Next.js

## Start project on development

1. Clone the repository
   git clone https://github.com/BrunoTornese/e-commerce

2. Rename .env.template to .env and fill the variables

3. Install dependencies

   npm install

   # or

   yarn install

   # or

   pnpm install

4. Start the database

   docker-compose up -d

5. Run the migrations of prisma

   npx prisma migrate dev

6. Create the database

   npm run seed

7. Execute the project

   npm run dev

   # or

   yarn dev

   # or

   pnpm dev

   Dependencies:
   Production
   @prisma/client
   clsx
   next
   react
   react-icons
   swiper
   zustand
