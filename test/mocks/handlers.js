import { graphql } from 'msw'

const handleGetCharacter = (req, res, ctx) => {
  return res(
    ctx.data({
      character: {
        name: 'John Doe',
        // Add other character fields as needed
      },
    })
  )
}

const handleGetCharacters = (req, res, ctx) => {
  return res(
    ctx.data({
      characters: {
        info: {
          count: 1,
          pages: 1,
        },
        results: [
          {
            id: '1',
            name: 'John Doe',
            // Add other character fields as needed
          },
        ],
      },
    })
  )
}

export const handlers = [
  graphql.query('GetCharacter', handleGetCharacter),
  graphql.query('GetCharacters', handleGetCharacters),
]
