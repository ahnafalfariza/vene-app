# Vene

## Project description

Vene is an event ticketing application developed on the Internet Computer Protocol (ICP) blockchain. It is designed to offer a seamless and secure experience for event organizers and attendees alike. This app leverages blockchain technology to ensure transparency, reliability, and authenticity since it is verifiable on blockchain

## Features

- **Event Registration:**

  - Seamless event setup and customization
  - Options for detailed event information, including date, time, location, and ticket price

- **NFT-Integrated Ticketing:**

  - Each ticket issued as a Non-Fungible Token (NFT), ensuring unique ownership and authenticity
  - Potential for tickets to be collected, traded, or held as digital assets

- **Event Hosting and Management:**

  - Management tools for monitoring ticket sales
  - Tools for managing event entry and guest lists

- **User Experience & Accessibility:**

  - Intuitive user interface for easy exploration and discovery of events
  - Simplified onboarding process designed to accommodate non-native web3 users

- **Secure and Transparent Ticketing:**

  - Immutable ownership records via the ICP blockchain to prevent fraud
  - Secure, peer-to-peer ticket transfer capabilities that maintain usage integrity

- **Cost Efficiency:**
  - Lower transaction fees by utilizing ICP blockchain technology
  - Direct payment systems between attendees and event hosts

## Technology Stack

- **Frontend:** React + Vite
- **Backend:** Motoko
- **Database:** Juno

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahnafalfariza/vene-app.git
   ```
2. Navigate into the project directory:

   ```bash
   cd vene-app
   ```

3. Install dependencies for the backend and frontend:

   ```bash
   npm install
   mops install
   ```

4. Run the initial setup

   ```bash
   dfx start --background
   juno dev start


   # Build the canister
   cd src/vene-app-frontend
   npm run setup
   ```

5. Run the frontend
   ```bash
   npm run start
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
