import { useState, useEffect } from 'react';

export const useTypingEffect = (words, options = {}) => {
    const { typeSpeed = 150, deleteSpeed = 100, delay = 1500 } = options;
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!words || words.length === 0) return;

        const currentWord = words[wordIndex % words.length];

        if (!isDeleting && text === currentWord) {
            const timeout = setTimeout(() => setIsDeleting(true), delay);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const tick = setTimeout(() => {
            setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(tick);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

    return text;
};
