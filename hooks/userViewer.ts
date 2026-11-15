'use client';
import { useEffect, useState } from "react";
import { useLogado } from "@/hooks/useLogado";

export type Viewer = { id: number; name: string; username: string };

export function userViewer() {
    const logado = useLogado();
    const [viewer, setViewer] = useState<Viewer | null>(null);

    useEffect(() => {
        if(!logado) {
            setViewer(null)
            return;
        }

        let cancelado = false;
        const token = localStorage.getItem('token');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((me) => { if (!cancelado) setViewer(me); })
            .catch(() => { if (!cancelado) setViewer(null); });

        return () => { cancelado = true; };
    }, [logado]);

    return { viewer };
}