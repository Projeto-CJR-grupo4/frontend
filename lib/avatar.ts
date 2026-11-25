export function avatarUrl(url?: string | null) {
    return url && (url.startsWith('http') || url.startsWith('/'))
        ? url
        : '/default-avatar.png';
}