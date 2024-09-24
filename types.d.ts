declare module '*.gql' {
  const content: any
  export default content
}

type Character = {
  id: string
  name: string
  image: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
  episode: string[]
}
