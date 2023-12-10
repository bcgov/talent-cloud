import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes/AppRoutes';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppRoutes />);
