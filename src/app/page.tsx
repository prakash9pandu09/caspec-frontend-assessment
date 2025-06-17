'use client';
import React from 'react';
import Episodes from './components/Episodes';
import { Episode } from './interfaces/appInterfaces';
import Characters from './components/Characters';

export default function Home() {
  const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | undefined>(undefined);
  return (
    <div className='flex gap-4'>
        <Episodes selectedEpisode={selectedEpisode} setSelectedEpisode={setSelectedEpisode} />
        <Characters selectedEpisode={selectedEpisode} />
    </div>
  );
}
