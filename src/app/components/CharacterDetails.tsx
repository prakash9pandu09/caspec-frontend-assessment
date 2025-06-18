import React from 'react'
import { Character } from '../interfaces/appInterfaces'

type Props = {
    character: Character
}

const CharacterDetails = ({character}: Props) => {
  return (
    <div>
        <img src={character.image} alt={character.name} width='60' height='60' />
        <h3 className='text-lg font-semibold'>{character.name}</h3>
    </div>
  )
}

export default CharacterDetails