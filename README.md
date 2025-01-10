<div align='center'>

<h1>E-commerce using Next.js</h1>
<p>A full-fledged e-commerce website built using Next.js, Prisma, and various modern technologies for fast and efficient online shopping.</p>

<h4> <a href=https://teslo-shop-ebon.vercel.app/>View Demo</a> <span> · </span> <a href="https://github.com/BrunoTornese/e-commerce/blob/master/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/BrunoTornese/e-commerce/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/BrunoTornese/e-commerce/issues"> Request Feature </a> </h4>

</div>

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
- [Contact](#handshake-contact)

## :star2: About the Project

### :dart: Features

- User Authentication: Sign up, login, and account management with secure authentication using NextAuth.js.
- Product CRUD Operations: Create, Read, Update, and Delete products in the e-commerce store.
- Product Categories: Organize products into categories for easier browsing and navigation.
- Responsive Design: Fully responsive layout optimized for desktops, tablets, and mobile devices.
- Shopping Cart: Add products to the shopping cart, view the cart, and proceed to checkout.
- Checkout Process: Users can enter shipping details, choose payment options, and complete their purchase.
- PayPal Integration: Integration with PayPal for secure and easy payments.
- Admin Panel: Admin users can manage products, users, and view sales data
- Cloud Storage for Images: Integration with Cloudinary for storing and serving product images.
- SEO Optimization: Optimized for search engines with proper meta tags and content structure.
- Real-time Updates: Automatic updating of product availability, prices, and stock levels.

### :art: Color Reference

| Color           | Hex                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary Color   | ![**Primary Color**: #274494](https://via.placeholder.com/10/**Primary Color**: 274494?text=+) **Primary Color\*\*: #274494                                                                                                                                                                                                     |
| Secondary Color | ![**Foreground Color**: rgb(0, 0, 0) (Defined as `--foreground-rgb` in CSS)](https://via.placeholder.com/10/**Foreground Color**: rgb(0, 0, 0) (Defined as `--foreground-rgb` in CSS)?text=+) **Foreground Color\*\*: rgb(0, 0, 0) (Defined as `--foreground-rgb` in CSS)                                                       |
| Accent Color    | ![**Background Start Color**: rgb(214, 219, 220) (Defined as `--background-start-rgb` in CSS)](https://via.placeholder.com/10/**Background Start Color**: rgb(214, 219, 220) (Defined as `--background-start-rgb` in CSS)?text=+) **Background Start Color\*\*: rgb(214, 219, 220) (Defined as `--background-start-rgb` in CSS) |
| Text Color      | ![**Background End Color**: rgb(255, 255, 255) (Defined as `--background-end-rgb` in CSS)](https://via.placeholder.com/10/**Background End Color**: rgb(255, 255, 255) (Defined as `--background-end-rgb` in CSS)?text=+) **Background End Color\*\*: rgb(255, 255, 255) (Defined as `--background-end-rgb` in CSS)             |

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file
`**DB_USER**: Your database username. Example:`your_user``

`**DB_NAME**: Your database name. Example: `your_database_name``

`**DB_PASSWORD**: Your database password. Example: `your_password``

`**DATABASE_URL**: Connection string for your database. Example:`postgresql://your_user:your_password@localhost:5432/your_database?schema=public``

`**AUTH_SECRET**: Secret key for authentication. Example: `your-secret-key``

`**CLOUDINARY_URL**: URL for Cloudinary API. Example:`cloudinary://your_api_key:your_api_secret@dzrkdlokq``

`**PAYPAL_OAUTH_URL**: PayPal OAuth URL for obtaining tokens. Example: `https://api-m.sandbox.paypal.com/v1/oauth2/token``

`**PAYPAL_ORDERS_URL**: PayPal URL for creating orders. Example: `https://api.sandbox.paypal.com/v2/checkout/orders``

`**NEXT_PUBLIC_PAYPAL_CLIENT_ID**: PayPal public client ID. Example: `your-client-id``

`**PAYPAL_SECRET**: PayPal secret key. Example: `your-client-secret``

## :toolbox: Getting Started

### :bangbang: Prerequisites

- - Node.js (version 14.x or higher) installed on your system. - A Google Cloud Platform account (optional, depending on your project needs).<a href="- [Node.js official website](https://nodejs.org/) - [Google Cloud Platform](https://cloud.google.com/) (optional)"> Here</a>

```bash
npm install -g node
```

### :gear: Installation

Follow these steps to get your project set up and running locally.

```bash
git clone https://github.com/BrunoTornese/e-commerce
```

```bash
npm install
```

```bash
docker-compose up -d
```

```bash
npx prisma migrate dev
```

```bash
npm run seed
```

```bash
npm run dev
```

### :running: Run Locally

Clone the project

```bash
https://github.com/BrunoTornese/e-commerce
```

Use the following commands to run tests for your project.

```bash
cd teslo-shop
```

```bash
npm install
```

```bash
npm run dev
```

## :handshake: Contact

Bruno - - brunoluchi2003@gmai.com

Project Link: [https://github.com/BrunoTornese/e-commerce](https://github.com/BrunoTornese/e-commerce)
