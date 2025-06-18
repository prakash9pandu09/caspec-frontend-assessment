'use client'
import React, { useEffect, useState } from 'react'
import useFetchEpisodes from '../hooks/useFetchEpisodes';
import { Episode } from '../interfaces/appInterfaces';
import throttle from '../libs/throttle';

type EpisodeProps = {
    selectedEpisode: Episode | undefined;
    setSelectedEpisode: React.Dispatch<React.SetStateAction<Episode | undefined>>;
}
const Episodes = ({selectedEpisode, setSelectedEpisode}: EpisodeProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {episodes, loading, error, hasMore, totalPages} = useFetchEpisodes(pageNumber);
  const episodesRef = React.useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll event triggered');
      if (episodesRef.current) {
        if (episodesRef.current.scrollHeight - episodesRef.current.scrollTop <= episodesRef.current.clientHeight + 100) {
          console.log('Reached the bottom of the episodes container');
          if(hasMore && pageNumber <= totalPages) {
            setPageNumber((prevPage) => prevPage + 1);
          }
        }
      }
    };

    const episodesContainer = episodesRef.current;
    if (episodesContainer) {
      episodesContainer.addEventListener('scroll', throttle(handleScroll, 1000));
    }

    return () => {
      if (episodesContainer) {
        episodesContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, pageNumber, totalPages]);

  if(loading) return <div>Loading...</div>;

  if(error) return <div className='text-red-500'>{error}</div>;

  return (
    <div ref={episodesRef} className='flex flex-col gap-2 min-h-full/2 max-h-150 overflow-y-auto p-2 w-[400px] h-[600px]' id='episodesContainer'>
        {episodes?.map((episode) => (
            <div key={episode.id} className={`flex flex-col gap-2 p-2 rounded ${episode.id  === selectedEpisode?.id ? 'border-blue-600 border-2' : 'border-1'}`}>
                <button className='text-lg font-semibold cursor-pointer' onClick={() => setSelectedEpisode(episode)}>{episode.name}</button>
            </div>
        ))}
    </div>
  )
}

export default Episodes