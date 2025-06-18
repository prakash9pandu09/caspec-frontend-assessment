import React from 'react'
import { Episode } from '../interfaces/appInterfaces'
import useFetchCharacter from '../hooks/useFetchCharacter';
import CharacterDetails from './CharacterDetails';

type CharacterProps = {
    selectedEpisode: Episode | undefined;
}

const Characters = ({selectedEpisode}: CharacterProps) => {
  const {characters} = useFetchCharacter(selectedEpisode?.characters);
  return (
    <div className='grid grid-cols-5 gap-4 p-4'>
            {characters?.map((character) => (
                <CharacterDetails key={character.id} character={character} />
            ))}
    </div>
  )
}

export default Characters