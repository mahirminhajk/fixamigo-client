# Project Structure

This document outlines the structure of the Fixamigo client application. Understanding the project structure is crucial for navigating the codebase and contributing effectively.

## High-Level Overview

The project follows a standard Next.js 15 App Router structure. Here's a breakdown of the main directories:

- **`/app`**: Contains all the application's routes, layouts, and pages.
- **`/components`**: Houses all the reusable React components.
- **`/constants`**: Stores static data and configuration files.
- **`/docs`**: Contains existing project documentation for reference.
- **`/hooks`**: Holds custom React hooks.
- **`/lib`**: Includes utility functions, API services, and other shared logic.
- **`/project-docs`**: Contains all the developer-facing documentation.
- **`/providers`**: Stores React context providers.
- **`/public`**: Contains all the static assets like images, fonts, and icons.
- **`/stores`**: Holds the Zustand state management stores.
- **`/types`**: Defines all the TypeScript types used in the project.

## App Directory (`/app`)

The `/app` directory is the heart of the application and follows the Next.js App Router conventions. It's organized using route groups to separate different parts of the application.

### Route Groups

- **`(blog)`**: Contains all the blog and content-related pages like about, contact, faq, etc.
- **`(city)`**: Handles city-specific landing pages for SEO purposes.
- **`(order)`**: Includes all the order and user-related pages like cart, my-services, and checkout.
- **`(root)`**: Contains the main public-facing pages like the homepage, repair pages, and brand listings.

### API Routes

- **`/api/revalidate`**: Contains the API route for on-demand revalidation of pages.

## Components Directory (`/components`)

The `/components` directory is organized by feature and component type.

- **`/analytics`**: Components related to analytics (e.g., Google Analytics).
- **`/buttons`**: Reusable button components.
- **`/checkoutComps`**: Components used in the checkout process.
- **`/contents`**: Components for displaying content.
- **`/core`**: Core layout components like the navbar, footer, and topbar.
- **`/list`**: Components for rendering lists of items.
- **`/others`**: Miscellaneous components.
- **`/pageSpecific`**: Components that are specific to a single page.
- **`/search`**: Components related to search functionality.
- **`/sheets`**: Components for creating bottom sheets and modals.
- **`/ui`**: Base UI components from `shadcn/ui` (e.g., Button, Card, Input).

## Lib Directory (`/lib`)

The `/lib` directory contains various utility functions and services.

- **`/actions`**: Server-side actions.
- **`/api.ts`**: Main API fetching logic.
- **`/apiService.ts`**: API service functions for specific endpoints.
- **`/axiosInstance.ts`**: Axios instance configuration.
- **`/seo`**: SEO-related metadata generation functions.
- **`/utils.ts`**: General utility functions.

## Stores Directory (`/stores`)

The `/stores` directory contains the Zustand state management stores.

- **`cartStore.ts`**: Manages the state of the shopping cart.
- **`userStore.ts`**: Manages the user's authentication state.

For a more detailed breakdown of the routing, components, state management, and data fetching, please refer to the respective documentation files.
