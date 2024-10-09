import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      clientId: 'mock-expo-client-id',
      androidClientId: 'mock-android-client-id',
    },
  },
}));

jest.mock('../src/context/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    isAuthenticated: false,
    accessToken: null,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    const welcomeText = getByText('Hello there!!');
    expect(welcomeText).toBeTruthy();
  });

  // Add more tests as needed
});

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import App from '../App';
// import { AuthProvider, AuthContext } from '../src/context/AuthContext';

// // Mock the AuthContext
// jest.mock('../src/context/AuthContext', () => ({
//   AuthProvider: ({ children }: { children: React.ReactNode }) => children,
//   AuthContext: React.createContext({
//     isAuthenticated: false,
//     accessToken: null,
//     login: jest.fn(),
//     logout: jest.fn(),
//   }),
// }));

// describe('App', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<App />);
//     const welcomeText = getByText('Hello there!!');
//     expect(welcomeText).toBeTruthy();
//   });

//   it('shows login button when not authenticated', () => {
//     const { getByText } = render(<App />);
//     const loginButton = getByText('Login with Google');
//     expect(loginButton).toBeTruthy();
//   });

//   it('shows logout button when authenticated', () => {
//     const mockAuthContext = {
//       isAuthenticated: true,
//       accessToken: 'mock-token',
//       login: jest.fn(),
//       logout: jest.fn(),
//     };

//     const { getByText } = render(
//       <AuthContext.Provider value={mockAuthContext}>
//         <App />
//       </AuthContext.Provider>
//     );

//     const logoutButton = getByText('Logout');
//     expect(logoutButton).toBeTruthy();
//   });

//   it('calls login function when login button is pressed', async () => {
//     const mockLogin = jest.fn();
//     const mockAuthContext = {
//       isAuthenticated: false,
//       accessToken: null,
//       login: mockLogin,
//       logout: jest.fn(),
//     };

//     const { getByText } = render(
//       <AuthContext.Provider value={mockAuthContext}>
//         <App />
//       </AuthContext.Provider>
//     );

//     const loginButton = getByText('Login with Google');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalled();
//     });
//   });

//   it('calls logout function when logout button is pressed', async () => {
//     const mockLogout = jest.fn();
//     const mockAuthContext = {
//       isAuthenticated: true,
//       accessToken: 'mock-token',
//       login: jest.fn(),
//       logout: mockLogout,
//     };

//     const { getByText } = render(
//       <AuthContext.Provider value={mockAuthContext}>
//         <App />
//       </AuthContext.Provider>
//     );

//     const logoutButton = getByText('Logout');
//     fireEvent.press(logoutButton);

//     await waitFor(() => {
//       expect(mockLogout).toHaveBeenCalled();
//     });
//   });
// });