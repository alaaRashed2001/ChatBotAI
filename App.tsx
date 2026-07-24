import { useNotifications } from './src/notifications/useNotifications';
import ChatScreen from './src/screens/ChatScreen';

function App() {
  useNotifications();
  return <ChatScreen />;
}

export default App;

// yarn g-c-run

// Ctrl + . ========> Add import
