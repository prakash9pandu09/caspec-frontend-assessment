'use client'

import { useState, useEffect } from 'react';
import { Character } from '../interfaces/appInterfaces';

const useFetchCharacter = (episodeCharacters: string[] | undefined) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCharacter = async (url: string) => {
        try {
            const fetchedCharacter = await fetch(url);
            if (!fetchedCharacter.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Character = await fetchedCharacter.json();
            setCharacters(prev => [...prev, data]);
        } catch (err) {
            console.error('Failed to fetch episodes:', err);
            setError('Failed to fetch episodes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCharacters([]);
        if (!episodeCharacters || episodeCharacters.length === 0) {
            setLoading(false);
        } else {
            for (const characterUrl of episodeCharacters) {
                fetchCharacter(characterUrl);
            }
        }
    }, [episodeCharacters]);

    return { characters, loading, error };
};

export default useFetchCharacter;