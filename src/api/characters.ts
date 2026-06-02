import { GraphQLClient, gql } from "graphql-request"
import type { Character } from "../types"

const client = new GraphQLClient("https://rickandmortyapi.com/graphql")

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

export interface CharactersResponse {
    characters: {
        results: Character[]
    }
}

export async function getCharacters(): Promise<Character[]> {
  const data = await client.request<CharactersResponse>(GET_CHARACTERS)
  return data.characters.results
}