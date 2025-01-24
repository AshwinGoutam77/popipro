'use client';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function RedirectComponent() {
    const router = useRouter();

    useEffect(() => {
        const isExpired = JSON.parse(localStorage.getItem("is_expried"));
        if (isExpired === true) {
            router.push('/');
        }
    }, [router]);

    return null;
}
