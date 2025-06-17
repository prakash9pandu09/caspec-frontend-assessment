'use client'

import { useState, useEffect } from 'react';
import { Episode, EpisodeResponse } from '../interfaces/appInterfaces';

const useFetchEpisodes = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const fetchedEpisodes = await fetch('https://rickandmortyapi.com/api/episode');
                if (!fetchedEpisodes.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: EpisodeResponse = await fetchedEpisodes.json();
                setEpisodes(data.results || []);
            } catch (err) {
                console.error('Failed to fetch episodes:', err);
                setError('Failed to fetch episodes');
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, []);

    return { episodes, loading, error };
};

export default useFetchEpisodes;