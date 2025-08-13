'use client';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function RedirectComponent() {
    const router = useRouter();

    useEffect(() => {
        const isExpired = JSON.parse(localStorage.getItem("is_expried"));
        const is_trial_taken = JSON.parse(localStorage.getItem("is_trial_taken"));
        if (isExpired === true && is_trial_taken !== 0) {
            router.push('/');
        }
    }, [router]);

    return null;
}
