import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PortfolioChatbot from './components/PortfolioChatbot';

const root = createRoot(document.getElementById('root')!);
root.render(
	<>
		<App />
		<PortfolioChatbot />
	</>
);
