# Data Fetching

This document explains how data is fetched from the API in the Fixamigo client application.

## API Interaction

The application interacts with a backend API to fetch and submit data. The base URL for the API is configured in `lib/axiosInstance.ts` and is taken from the `NEXT_PUBLIC_API_URL` environment variable.

### Axios Instance

An Axios instance is created in `lib/axiosInstance.ts` with the base URL and default headers. This instance is used for making all the API requests.

### API Endpoints

The available API endpoints are defined in `lib/api.ts`. This file exports functions for each API call, which handle the request and response.

- **`registerUser(data: RegisterUserApiData)`**: Registers a new user.
- **`verifyUser(data: VerifyUserApiData)`**: Verifies a user's OTP.
- **`submitSupportRequest(data: SupportRequestData)`**: Submits a support request.

## Data Fetching Strategy

The application uses two main strategies for fetching data: client-side fetching with Axios and server-side fetching with `fetch`.

### Client-Side Fetching

For client-side data fetching, the application uses the Axios instance defined in `lib/axiosInstance.ts`. This is typically used for actions that are triggered by user interactions, such as submitting a form.

### Server-Side Fetching

For server-side data fetching, the application uses the native `fetch` API. This is used in `lib/apiService.ts` to fetch data that is required for rendering pages on the server.

- **`fetchDevicesByBrand(brand: string)`**: Fetches a list of devices for a specific brand.
- **`fetchDeviceBySlug(deviceSlug: string)`**: Fetches the details of a specific device by its slug.

These functions use the `cache: "force-cache"` option to cache the data and improve performance. They also use Next.js's `next.tags` feature to tag the cached data, which allows for on-demand revalidation.

## On-Demand Revalidation

The application uses on-demand revalidation to update static pages with new data without rebuilding the entire site. The `/api/revalidate` route is used for this purpose. When this route is called with a specific tag, it revalidates all the pages that are associated with that tag.
