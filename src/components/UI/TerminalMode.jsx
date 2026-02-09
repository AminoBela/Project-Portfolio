import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const COMMANDS = {
    help: {
        description: 'Show available commands',
        execute: (t) => [
            '╔══════════════════════════════════════╗',
            '║         AVAILABLE COMMANDS           ║',
            '╠══════════════════════════════════════╣',
            '║  help     - Show this message        ║',
            '║  about    - About me                 ║',
            '║  skills   - My technical skills      ║',
            '║  contact  - Contact information      ║',
            '║  projects - Navigate to projects     ║',
            '║  matrix   - Enable Matrix mode       ║',
            '║  sudo     - Try admin access         ║',
            '║  clear    - Clear terminal           ║',
            '║  exit     - Close terminal           ║',
            '╚══════════════════════════════════════╝'
        ]
    },
    about: {
        description: 'About me',
        execute: (t) => [
            '',
            '┌─────────────────────────────────────┐',
            '│            AMIN BELALIA             │',
            '└─────────────────────────────────────┘',
            '',
            '  📍 Location: Luxembourg / Lorraine',
            '  🎓 Studies: BUT Informatique - DACS',
            '  🔧 Focus: System Admin & DevOps',
            '  🌐 Languages: FR, EN, ES, AR',
            '',
            '  Currently seeking an internship in:',
            '  → System Administration',
            '  → Network & Virtualization',
            '  → DevOps & Infrastructure',
            ''
        ]
    },
    skills: {
        description: 'Technical skills',
        execute: (t) => [
            '',
            '╭─────────────────────────────────────╮',
            '│          TECHNICAL SKILLS           │',
            '╰─────────────────────────────────────╯',
            '',
            '  Systems & Networks',
            '  ├── Linux (Debian, RHEL)  ████████░░ 80%',
            '  ├── Networking (TCP/IP)   ███████░░░ 70%',
            '  └── Scripting (Bash/Ruby) ████████░░ 80%',
            '',
            '  Virtualization & Cloud',
            '  ├── Docker               ████████░░ 80%',
            '  ├── Kubernetes           ██████░░░░ 60%',
            '  └── Proxmox/VMware       ███████░░░ 70%',
            '',
            '  Development',
            '  ├── Java/PHP             ███████░░░ 70%',
            '  └── React/JS             ██████░░░░ 60%',
            ''
        ]
    },
    contact: {
        description: 'Contact information',
        execute: (t) => [
            '',
            '╔═══════════════════════════════════════╗',
            '║            CONTACT INFO               ║',
            '╠═══════════════════════════════════════╣',
            '║  📧 abelaliabendjafar@gmail.com       ║',
            '║  💼 linkedin.com/in/amin-belalia-...  ║',
            '║  🐙 github.com/AminoBela              ║',
            '╚═══════════════════════════════════════╝',
            ''
        ]
    },
    sudo: {
        description: 'Admin access',
        execute: (t) => [
            '',
            '  ⚠️  sudo: permission denied',
            '  Nice try! But this terminal is sandboxed.',
            '  Type "help" for available commands.',
            ''
        ]
    },
    whoami: {
        description: 'Current user',
        execute: (t) => ['visitor@amin-portfolio']
    },
    date: {
        description: 'Current date',
        execute: (t) => [new Date().toLocaleString()]
    },
    pwd: {
        description: 'Print working directory',
        execute: (t) => ['/home/visitor/portfolio']
    },
    ls: {
        description: 'List files',
        execute: (t) => [
            'about.txt  skills.json  projects/  contact.md  cv.pdf'
        ]
    }
};

export default function TerminalMode({ isOpen, onClose, onMatrixMode }) {
    const { t } = useTranslation();
    const [history, setHistory] = useState([
        { type: 'output', content: ['Welcome to Amin\'s Terminal v1.0', 'Type "help" for available commands.', ''] }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const executeCommand = useCallback((cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd === '') return;

        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        const newHistory = [
            ...history,
            { type: 'command', content: cmd }
        ];

        if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (trimmedCmd === 'exit') {
            onClose();
            return;
        }

        if (trimmedCmd === 'matrix') {
            setHistory([...newHistory, { type: 'output', content: ['Initiating Matrix mode...'] }]);
            setTimeout(() => {
                onClose();
                if (onMatrixMode) onMatrixMode();
            }, 500);
            return;
        }

        if (trimmedCmd === 'projects') {
            setHistory([...newHistory, { type: 'output', content: ['Navigating to projects section...'] }]);
            setTimeout(() => {
                onClose();
                window.location.hash = '#projets';
            }, 500);
            return;
        }

        const command = COMMANDS[trimmedCmd];
        if (command) {
            setHistory([...newHistory, { type: 'output', content: command.execute(t) }]);
        } else {
            setHistory([...newHistory, { type: 'output', content: [`Command not found: ${trimmedCmd}`, 'Type "help" for available commands.'] }]);
        }
    }, [history, t, onClose, onMatrixMode]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                className="terminal-mode-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="terminal-mode-window"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="terminal-mode-header">
                        <div className="terminal-mode-buttons">
                            <span className="terminal-btn terminal-btn--close" onClick={onClose}></span>
                            <span className="terminal-btn terminal-btn--minimize"></span>
                            <span className="terminal-btn terminal-btn--maximize"></span>
                        </div>
                        <span className="terminal-mode-title">amin@portfolio ~ bash</span>
                    </div>

                    <div className="terminal-mode-body" ref={containerRef} onClick={() => inputRef.current?.focus()}>
                        {history.map((item, index) => (
                            <div key={index} className={`terminal-line terminal-line--${item.type}`}>
                                {item.type === 'command' ? (
                                    <span><span className="terminal-prompt">visitor@portfolio:~$</span> {item.content}</span>
                                ) : (
                                    item.content.map((line, i) => <div key={i}>{line}</div>)
                                )}
                            </div>
                        ))}
                        <div className="terminal-input-line">
                            <span className="terminal-prompt">visitor@portfolio:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="terminal-input"
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
