# Calendar Tracker App

A simple but effective React Native application designed to streamline calendar event management and time tracking. Born from a personal need to efficiently track and manage recurring calendar events, this app demonstrates how software development can effectively solve real-world productivity challenges.

## 🌟 Key Features

- **Base Events System**: Create templates for recurring events with pre-configured durations and locations
- **Smart Time Settings**:
  - Intelligent 15-minute time slot selection
  - Automatic duration calculation
  - Real-time end time updates
- **Calendar Integration**: Seamless synchronization with native calendar apps
- **Offline Support**: Full functionality maintained without internet connection
- **Dark Theme**: Eye-friendly dark mode with a carefully crafted color scheme
- **Intuitive UI**: Clean, responsive interface with smooth transitions

## 🛠 Technical Highlights

### Architecture & Best Practices

- **Custom Hook Architecture**:
  - `useEventTime`: Manages time-related state and calculations
  - `useEventForm`: Handles form validation and state management
  - `useCalendarPermissions`: Manages calendar permissions and access
- **Component Structure**:

  - Modular, reusable components (e.g., `TimeSelector`, `EventForm`, `CardContainer`, `ActionButtons`...)
  - Clear separation of concerns between presentational and container components
  - Consistent prop typing with TypeScript

- **Form Management**:
  - Controlled components with validation
  - Real-time error feedback
  - Ref-based form validation system

### Code Quality

- **Type Safety**: Comprehensive TypeScript implementation
- **State Management**: Efficient use of React hooks and context
- **Performance Optimization**:
  - Memoized calculations
  - Optimized re-renders
  - Efficient date handling

### UI/UX Design

- **Theming System**:
  - Centralized theme configuration
  - Consistent spacing and typography
  - Accessible color schemes
- **Responsive Design**:
  - Adaptive layouts to screen sizes
  - Cross-platform compatibility
  - Dynamic time selection interface

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React Native + Expo development environment

### Installation

```bash
# Clone the repository
git clone https://github.com/janescorza/google-calendar-tracker-utility

# Install dependencies
cd google-calendar-tracker-utility
yarn install

# Run development server
npx expo start --dev-client
```

### Development Commands

- Build development version (Android):
  ```bash
  eas build --profile development --platform android
  ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request if you want this useful nd want to enhance it.

## 🎯 Future Enhancements

- Customize push notifications for upcoming events
- Custom event categories
- Configurable recurring event patterns
- Calendar analytics and insights based on calendars and event names (I need to assess the feasibility)

## 🌟 Motivation

This project was born from a personal need to streamline my time-tracking workflow. As a developer who regularly tracks time in my day to day and across different projects, I found existing solutions lacking in efficiency and user experience. By building this app, I not only solved my own productivity challenge but also created a tool that others can benefit from .

The development process allowed me to implement best practices in React Native development while solving a real-world problem, demonstrating how personal projects can both enhance technical skills and provide practical value.
