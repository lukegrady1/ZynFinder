# ZynFinder

ZynFinder is a web application that helps users locate nicotine pouches in stock at nearby stores. Built with Next.js and integrated with Google Maps, it provides a real-time inventory tracking system for nicotine pouch products.

## Features

- 📍 Real-time location tracking
- 🗺️ Interactive Google Maps integration
- 🏪 Store inventory management
- 🔍 Search functionality for nearby stores
- 📱 Responsive design

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) - Google Maps integration
- CSS Modules - Styling

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- A Google Maps API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/lukegrady1/ZynFinder.git
cd ZynFinder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ZynFinder/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── Map.tsx
│   ├── hooks/
│   │   └── useLocation.ts
│   ├── lib/
│   └── types/
│       └── index.ts
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Luke Grady - [@lukegrady1](https://github.com/lukegrady1)

Project Link: [https://github.com/lukegrady1/ZynFinder](https://github.com/lukegrady1/ZynFinder) 