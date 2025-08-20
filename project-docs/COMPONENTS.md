# Components

This document provides an overview of the reusable components used in the Fixamigo client application. The components are located in the `/components` directory and are organized by feature and type.

## Component Breakdown

### `/analytics`

- **`GoogleAnalytics.tsx`**: Integrates Google Analytics into the application.

### `/buttons`

- **`addToCartBtn.tsx`**: A button for adding items to the shopping cart.
- **`bookNowCartBtn.tsx`**: A button for booking a service from the cart.
- **`cartBtn.tsx`**: A button that links to the shopping cart.
- **`profileBtn.tsx`**: A button that opens the user profile sheet.

### `/checkoutComps`

- **`checkoutAddressCard.tsx`**: A card for displaying and selecting a shipping address during checkout.
- **`checkoutOrderSummary.tsx`**: A component that displays the order summary during checkout.
- **`checkoutPaymentMethodCard.tsx`**: A card for selecting a payment method.
- **`checkoutPickupDateCard.tsx`**: A card for selecting a pickup date for the service.
- **`checkoutServiceMethodCard.tsx`**: A card for selecting the service method (e.g., pickup, walk-in).
- **`placeServiceBtn.tsx`**: A button for placing the service order.

### `/contents`

- **`DeviceDetailsContent.tsx`**: Displays the details of a specific device.
- **`orderSummaryContent.tsx`**: Displays the content of the order summary.

### `/core`

- **`footer.tsx`**: The application's footer.
- **`mobileNavMenu.tsx`**: The mobile navigation menu.
- **`navbar.tsx`**: The main navigation bar.
- **`topbar.tsx`**: The top bar of the application, often containing contact information or secondary navigation.
- **`userNavbar.tsx`**: The navigation bar for authenticated users.

### `/list`

- **`brandListInRepair.tsx`**: A list of brands displayed in the repair section.
- **`brandsList.tsx`**: A general list of brands.
- **`cartList.tsx`**: A list of items in the shopping cart.
- **`listRepairCategory.tsx`**: A list of repair categories.
- **`listSpareParts.tsx`**: A list of spare parts for a device.
- **`modelList.tsx`**: A list of device models.
- **`ourProcess.tsx`**: A component that displays the company's repair process.
- **`PriceRangeInfo.tsx`**: A component that displays price range information.
- **`serviceStepRepair.tsx`**: A component that displays the steps of the repair service.
- **`whyChooseFixamigo.tsx`**: A component that lists the reasons to choose Fixamigo.

### `/others`

- **`availableServices.tsx`**: A component that displays available services.
- **`carousel.tsx`**: A reusable carousel component.
- **`emptyAndNotLogined.tsx`**: A component to display when the cart is empty or the user is not logged in.
- **`LaptopSupportForm.tsx`**: A form for laptop support requests.
- **`modelCart.tsx`**: A modal cart component.
- **`orderContent.tsx`**: A modular component composing the order details (agent, device, alert, spare parts, service details, payment, and actions).
- **`orderProgressBar.tsx`**: A progress bar for tracking the order status.
- **`otherPhones.tsx`**: A component for displaying other phone models.
- **`popupLoading.tsx`**: A loading popup.
- **`ServiceSteps.tsx`**: A component that displays the service steps.
- **`showModel.tsx`**: A component for displaying a device model.
- **`whyChooseUs.tsx`**: A component that lists the reasons to choose the company.

### `/pageSpecific`

- **`BrandPageClient.tsx`**: A client-side component for the brand page.
- **`DeviceCartBarClient.tsx`**: A client-side component for the device cart bar.

### `/search`

- **`ProductSearch.tsx`**: A component for searching products.

### `/sheets`

- **`userRegSheet.tsx`**: A sheet for user registration.

### `/ui`

This directory contains the base UI components from `shadcn/ui`. These components are highly reusable and form the foundation of the design system.

- **`accordion.tsx`**: A vertically stacked set of interactive headings that each reveal a section of content.
- **`button.tsx`**: A customizable button component.
- **`card.tsx`**: A flexible and extensible content container.
- **`carousel.tsx`**: A carousel component for displaying a series of items.
- **`input.tsx`**: A standard input field.
- **`inputOtp.tsx`**: An input field for one-time passwords.
- **`label.tsx`**: A label for form elements.
- **`popover.tsx`**: A pop-up that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
- **`sheet.tsx`**: A sheet that slides in from the side of the screen.
- **`skeleton.tsx`**: A component for displaying a placeholder preview of your content before the data gets loaded.
