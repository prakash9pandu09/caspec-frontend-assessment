'use client'

import { useState, useEffect } from 'react';
import { Episode, EpisodeResponse } from '../interfaces/appInterfaces';

const useFetchEpisodes = (pageNumber: number) => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const fetchEpisodes = async (page: number) => {
        try {
            const fetchedEpisodes = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
            if (!fetchedEpisodes.ok) {
                throw new Error('Network response was not ok');
            }
            const data: EpisodeResponse = await fetchedEpisodes.json();
            setHasMore(data.info.next !== null);
            setTotalPages(data.info.pages);
            setEpisodes(prev => [...prev, ...data.results]);
        } catch (err) {
            console.error('Failed to fetch episodes:', err);
            setError('Failed to fetch episodes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(hasMore) {
            fetchEpisodes(pageNumber);
        }
    }, [pageNumber, hasMore]);

    return { episodes, loading, error, hasMore, totalPages };
};

export default useFetchEpisodes;