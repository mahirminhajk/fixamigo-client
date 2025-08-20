# Routing

This document explains the routing system of the Fixamigo client application. The project uses the Next.js App Router, which is based on a file-system routing mechanism.

## Route Groups

The application is organized into several route groups to separate different concerns and layouts.

### `(blog)`

This group contains all the static content pages.

- `/about`: About Us page.
- `/blog`: Blog listing page.
- `/contact`: Contact Us page.
- `/faq`: Frequently Asked Questions page.
- `/privacy`: Privacy Policy page.
- `/return-refund`: Return and Refund Policy page.
- `/support`: Customer Support page.
- `/terms`: Terms and Conditions page.
- `/warranty`: Warranty Policy page.

### `(city)`

This group is designed for city-specific landing pages to improve local SEO.

- `/[city]`: A dynamic route that generates a page for each supported city (e.g., `/malappuram`, `/kottakkal`).

### `(order)`

This group contains all the routes that require user authentication.

- `/cart`: The user's shopping cart.
- `/my-services`: A page displaying the user's service history.
- `/my-services/summary`: A page showing the summary of a specific order.
- `/repair/checkout`: The checkout page for placing a service order.

### `(root)`

This group contains the main public-facing pages of the application.

- `/`: The homepage.
- `/brands`: A page listing all the supported brands.
- `/repair`: The main repair page.
- `/repair/[category]`: A dynamic route for different repair categories (e.g., `/repair/mobile-phone`, `/repair/laptop`).
- `/repair/mobile-phone/[brand]`: A dynamic route for brand-specific pages.
- `/repair/mobile-phone/[brand]/[device]`: A dynamic route for device-specific pages.
- `/support-request`: A page with a form for users to submit support requests.

## API Routes

The application has one API route:

- `/api/revalidate`: This route is used for on-demand revalidation of pages, which is useful for updating static pages with new data without rebuilding the entire site.
