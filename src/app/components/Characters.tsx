import React from 'react'
import { Episode } from '../interfaces/appInterfaces'
import useFetchCharacter from '../hooks/useFetchCharacter';
import Image from 'next/image';

type CharacterProps = {
    selectedEpisode: Episode | undefined;
}

const Characters = ({selectedEpisode}: CharacterProps) => {
  const {characters} = useFetchCharacter(selectedEpisode?.characters);
  return (
    <div className='grid grid-cols-5 gap-4 p-4'>
            {characters?.map((character) => (
                <div key={character.id}>
                    <Image src={character.image} alt={character.name} width='50' height='50' />
                    <h3 className='text-lg font-semibold'>{character.name}</h3>
                </div>
            ))}
    </div>
  )
}

export default Characters