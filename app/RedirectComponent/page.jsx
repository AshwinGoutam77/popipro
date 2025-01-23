'use client'
import React from 'react'
import { useRouter } from "next/navigation"

export default function RedirectComponent() {
    const router = useRouter()
    const isExpired = JSON?.parse(localStorage.getItem("is_expried"));
    if (isExpired === true) {
        router.push('/')
        return
    }
}
