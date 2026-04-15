"use client";

import { useState, useEffect, useCallback } from "react";

export interface UserReview {
  id: string;
  providerId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

const STORAGE_KEY = "usia-user-reviews";

function loadReviews(): UserReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistReviews(reviews: UserReview[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function useUserReviews(providerId?: string) {
  const [allReviews, setAllReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    setAllReviews(loadReviews());
  }, []);

  const addReview = useCallback(
    (review: Omit<UserReview, "id" | "date">) => {
      const newReview: UserReview = {
        ...review,
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date: new Date().toISOString().split("T")[0],
      };
      setAllReviews((prev) => {
        const updated = [newReview, ...prev];
        persistReviews(updated);
        return updated;
      });
    },
    [],
  );

  const providerReviews = providerId
    ? allReviews.filter((r) => r.providerId === providerId)
    : allReviews;

  return { reviews: providerReviews, addReview };
}
