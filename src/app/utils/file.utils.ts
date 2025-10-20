export function dataUrlToBlob(data: string): Blob {
    if (!data.startsWith('data:')) {
        const byteString = atob(data);
        const u8 = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) u8[i] = byteString.charCodeAt(i);
        return new Blob([u8], { type: 'image/png' });
    }
    const [meta, b64] = data.split(',');
    const mimeMatch = meta.match(/data:(.*?);base64/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const byteString = atob(b64);
    const u8 = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) u8[i] = byteString.charCodeAt(i);
    return new Blob([u8], { type: mime });
}