import { useState, useEffect } from 'react';

export const useTypingEffect = (words, options = {}) => {
    const { loop = true, typeSpeed = 150, deleteSpeed = 100, delay = 1500 } = options;
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const shouldDelete = isDeleting;

            // Détermine le texte à afficher
            setText(currentWord.substring(0, text.length + (shouldDelete ? -1 : 1)));

            // Si le mot est complètement tapé
            if (!shouldDelete && text === currentWord) {
                setTimeout(() => setIsDeleting(true), delay);
            } 
            // Si le mot est complètement effacé
            else if (shouldDelete && text === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay, loop]);

    return text;
};
