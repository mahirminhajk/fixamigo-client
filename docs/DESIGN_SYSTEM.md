# Fixamigo Design System & Style Guide

## Brand Colors

- **Primary Black**: `#121212` - Used for primary text, backgrounds, and main UI elements
- **Brand Orange**: `#D2691E` - Used for accents, hover states, CTA buttons, and brand highlights
- **White**: `#FFFFFF` - Used for backgrounds, cards, and contrast text
- **Gray Scale**: Standard Tailwind grays (gray-50 to gray-900) for supporting elements

## Design Philosophy

- **Mobile-First**: All components designed with mobile as the primary viewport
- **Modern Gradient Design**: Extensive use of gradients combining brand colors
- **Hover Animations**: Transform effects (scale, translate, rotate) on interactive elements
- **Consistent Spacing**: 8px grid system using Tailwind spacing
- **Accessibility**: Proper focus states and semantic HTML

## Component Patterns

### 1. Interactive Cards

```tsx
className="group bg-white border-2 border-gray-200 rounded-2xl shadow-lg
           flex flex-col items-center justify-center text-center p-4 md:p-6
           transition-all duration-300 ease-in-out
           hover:shadow-2xl hover:scale-105 hover:-translate-y-1
           hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100
           focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50"
```

### 2. Primary Buttons

```tsx
className="relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4
           bg-gradient-to-r from-[#D2691E] to-[#121212]
           hover:from-[#121212] hover:to-[#D2691E]
           text-white font-bold rounded-2xl
           shadow-xl hover:shadow-2xl
           transform transition-all duration-300
           hover:scale-105 hover:-translate-y-1
           focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50"
```

### 3. Search Inputs

```tsx
className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200
           rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
           focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
           placeholder-gray-400 transition-all duration-300 ease-in-out"
```

### 4. Background Overlays

```tsx
{
  /* Gradient overlay */
}
<div
  className="absolute inset-0 bg-gradient-to-br from-[#D2691E]/0 to-[#121212]/0 
                group-hover:from-[#D2691E]/5 group-hover:to-[#121212]/5 
                transition-all duration-300 rounded-2xl"
></div>;
```

### 5. Shine Effects

```tsx
{
  /* Shine effect */
}
<div
  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent
                transform -skew-x-12 translate-x-[-100%] 
                group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
></div>;
```

## Animation Standards

- **Hover Scale**: `hover:scale-105` for buttons, `hover:scale-110` for icons
- **Hover Translate**: `hover:-translate-y-1` or `hover:-translate-y-2`
- **Rotation**: `hover:rotate-3` for playful elements
- **Duration**: `duration-300` for most transitions, `duration-700` for shine effects
- **Easing**: `ease-in-out` for smooth animations

## Typography

- **Headers**: `text-2xl md:text-3xl font-bold text-gray-900`
- **Subheaders**: `text-lg md:text-xl font-semibold`
- **Body Text**: `text-sm md:text-base text-gray-600`
- **Descriptions**: `text-gray-600 leading-relaxed`

## Layout Patterns

### 1. Section Container

```tsx
<section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
```

### 2. Grid Systems

- **Mobile**: 2 columns (`grid-cols-2`)
- **Desktop**: 4-6 columns (`md:grid-cols-4 lg:grid-cols-6`)
- **Gap**: `gap-4 md:gap-6`

### 3. Responsive Breakpoints

- **Mobile**: Default (no prefix)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

## Color Usage Guidelines

### Primary Actions

- **CTA Buttons**: `bg-gradient-to-r from-[#D2691E] to-[#121212]`
- **Hover States**: `hover:from-[#121212] hover:to-[#D2691E]`

### Secondary Actions

- **Borders**: `border-[#D2691E]`
- **Focus Rings**: `focus:ring-[#D2691E]/50`
- **Text Highlights**: `text-[#D2691E]`

### Status Colors

- **Success**: Use `#D2691E` (brand orange)
- **Warning**: Use `#121212` (brand black)
- **Error**: Use red variants sparingly
- **Info**: Use gray variants

## Component-Specific Patterns

### 1. Banner/Notifications

```tsx
className =
  "bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white";
```

### 2. Category Cards

```tsx
className="bg-gradient-to-br from-[#121212] via-gray-800 to-black
           hover:from-[#D2691E] hover:via-orange-600 hover:to-orange-800"
```

### 3. Service Cards

```tsx
// Alternate patterns:
gradient: "from-[#121212] to-[#D2691E]";
gradient: "from-[#D2691E] to-[#121212]";
```

## Accessibility Standards

- **Focus Rings**: Always use `focus:ring-4 focus:ring-[#D2691E]/50`
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain WCAG AA compliance
- **Semantic HTML**: Use proper HTML elements and ARIA labels

## Mobile-First Considerations

- **Touch Targets**: Minimum 44px touch targets
- **Responsive Text**: Use `text-sm md:text-base` pattern
- **Spacing**: Use `px-4 md:px-6` for consistent mobile/desktop spacing
- **Grid Breakpoints**: Always start with mobile columns

## File Structure Context

```
components/
├── core/           # Navigation, layout components
├── buttons/        # Reusable button components
├── list/          # Data display components (brands, categories)
├── others/        # Feature components (services, steps)
├── search/        # Search functionality
├── sheets/        # Modal/drawer components
└── ui/           # Base UI components
```

## Key Features

- **Device Repair Service**: Mobile phones, laptops
- **Testing Phase**: Currently in beta with user feedback collection
- **Location-Based**: City-specific services
- **Cart System**: Add to cart functionality for repair services

## Brand Voice

- Professional yet approachable
- Emphasis on quality and reliability
- Mobile-first user experience
- Clear, concise messaging

## Future Considerations

- Maintain consistency with established patterns
- Always use brand colors for new components
- Follow mobile-first responsive design
- Keep accessibility standards in mind
- Use consistent animation patterns
