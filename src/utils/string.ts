/** Décode une chaîne Base64 en UTF-8 (supporte les caractères spéciaux). */
export function decodeBase64(str: string): string {
  try {
    const binaryString = window.atob(str.replace(/\n/g, ''));
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    console.error('Erreur lors du décodage Base64:', e);
    return '';
  }
}
