import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<div className="container px-4 py-24 text-center text-2xl font-bold">Category Page (Coming Soon)</div>} />
          <Route path="product/:id" element={<div className="container px-4 py-24 text-center text-2xl font-bold">Product Details (Coming Soon)</div>} />
          <Route path="cart" element={<div className="container px-4 py-24 text-center text-2xl font-bold">Your Shopping Cart (Coming Soon)</div>} />
          <Route path="*" element={<div className="container px-4 py-24 text-center text-2xl font-bold">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
