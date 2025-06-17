'use client'
import React from 'react'
import useFetchEpisodes from '../hooks/useFetchEpisodes';
import { Episode } from '../interfaces/appInterfaces';

type EpisodeProps = {
    selectedEpisode: Episode | undefined;
    setSelectedEpisode: React.Dispatch<React.SetStateAction<Episode | undefined>>;
}
const Episodes = ({selectedEpisode, setSelectedEpisode}: EpisodeProps) => {
    const {episodes, loading, error} = useFetchEpisodes();
    if(loading) return <div>Loading...</div>;
    if(error) return <div className='text-red-500'>{error}</div>;
  return (
    <div className='flex flex-col gap-2 min-h-full/2 max-h-150 overflow-y-auto p-2 w-[400px]'>
        {episodes?.map((episode) => (
            <div key={episode.id} className={`flex flex-col gap-2 p-2 rounded ${episode.id  === selectedEpisode?.id ? 'border-blue-600 border-2' : 'border-1'}`}>
                <button className='text-lg font-semibold cursor-pointer' onClick={() => setSelectedEpisode(episode)}>{episode.name}</button>
            </div>
        ))}
    </div>
  )
}

export default Episodes