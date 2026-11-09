'use client';
import { useSyncExternalStore } from "react";

function inscrever(avisar: () => void) {
    window.addEventListener('auth-changed', avisar);
    window.addEventListener('storage', avisar);
    return () => {
        window.removeEventListener('auth-changed', avisar);
        window.removeEventListener('storage', avisar);
    };
}

export function useLogado() {
    return useSyncExternalStore(inscrever, 
        () => localStorage.getItem('token') !== null,
        () => false,
    );
}