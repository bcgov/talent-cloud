import ReactDOM from 'react-dom/client';
import './styles/main.css';
import AppRoutes from './routes/Routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppRoutes />);
