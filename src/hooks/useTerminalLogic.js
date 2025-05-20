import { useState } from 'react';

export function useTerminalLogic() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
    if (!isTerminalOpen) setIsTerminalMaximized(false); // Réinitialise maximisé si on ferme
  };

  const maximizeTerminal = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
  };

  return { isTerminalOpen, isTerminalMaximized, toggleTerminal, maximizeTerminal };
}
