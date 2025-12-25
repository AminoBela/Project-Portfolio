/**
 * Décoder une chaîne Base64 en UTF-8 proprement (supporte les caractères spéciaux)
 * @param {string} str - La chaîne en Base64
 * @returns {string} - La chaîne décodée
 */
export function decodeBase64(str) {
    try {
        // Nettoyage des sauts de ligne
        const contentBase64 = str.replace(/\n/g, '');
        const binaryString = window.atob(contentBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
        console.error("Erreur lors du décodage Base64:", e);
        return "";
    }
}
