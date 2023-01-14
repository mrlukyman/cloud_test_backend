import { gql } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const typeDefs = gql`
  scalar DateTime
  type Query {
    Songs: [Song!]!
    Genres: [Genre!]!
    GetSongsByGenre(genre: String!): [Song!]!
  }
  type Mutation {
    createSong(title: String!, artist: String!, genreId: Int!): Song!
    createGenre(name: String!): Genre!
    updateSong(id: Int!, title: String, artist: String, genreId: Int): Song!
    removeSong(id: Int!): Song!
    removeGenre(id: Int!): Genre!
  }
  type Song {
    id: ID!
    title: String!
    artist: String!
    genre: Genre!
    createdAt: DateTime!
    updatedAt: DateTime!
    genreId: Int!
  }
  type Genre {
    id: ID!
    name: String!
    songs: [Song!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    Songs: (_parent: any, _args: any, context: Context) => {
      return context.prisma.song.findMany()
    },
    Genres: (_parent: any, _args: any, context: Context) => {
      return context.prisma.genre.findMany()
    },
    GetSongsByGenre: (_parent: any, args: any, context: Context) => {
      return context.prisma.song.findMany({
        where: {
          genre: {
            name: args.genre,
          },
        },
      })
    }
  },
  Mutation: {
    createSong: (_parent: any, args: any, context: Context) => {
      return context.prisma.song.create({
        data: {
          title: args.title,
          artist: args.artist,
          genre: {
            connect: {
              id: args.genreId,
            },
          },
        },
      })
    },
    createGenre: (_parent: any, args: any, context: Context) => {
      return context.prisma.genre.create({
        data: {
          name: args.name,
        },
      })
    },
    updateSong: (_parent: any, args: any, context: Context) => {
      return context.prisma.song.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          artist: args.artist,
          genre: {
            connect: {
              id: args.genreId,
            },
          },
        },
      })
    },
    removeSong: (_parent: any, args: any, context: Context) => {
      return context.prisma.song.delete({
        where: {
          id: args.id,
        },
      })
    },
    removeGenre: (_parent: any, args: any, context: Context) => {
      return context.prisma.genre.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
  Song: {
    genre: (parent: any, _args: any, context: Context) => {
      return context.prisma.song
        .findUnique({
          where: { id: parent.id || undefined },
        })
        .genre()
    },
  },
  Genre: {
    songs: (parent: any, _args: any, context: Context) => {
      return context.prisma.genre
        .findUnique({
          where: { id: parent.id || undefined },
        })
        .songs()
    },
  },
}
