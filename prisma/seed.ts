import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const genre: Prisma.GenreCreateInput[] = [
  {
    name: 'Metal',
    songs: {
      create: [
        {
          title: 'Master of Puppets',
          artist: 'Metallica',
        },
        {
          title: 'Enter Sandman',
          artist: 'Metallica',
        },
        {
          title: 'Nothing Else Matters',
          artist: 'Metallica',
        }
      ],
    },
  },
  {
    name: 'Rock',
    songs: {
      create: [
        {
          title: 'Hotel California',
          artist: 'Eagles',
        },
        {
          title: 'Stairway to Heaven',
          artist: 'Led Zeppelin',
        },
        {
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
        }
      ],
    },
  },
  {
    name: 'Pop',
    songs: {
      create: [
        {
          title: 'Shape of You',
          artist: 'Ed Sheeran',
        },
        {
          title: 'Uptown Funk',
          artist: 'Mark Ronson',
        },
        {
          title: 'I Gotta Feeling',
          artist: 'Black Eyed Peas',
        }
      ],
    },
  },
  {
    name: 'Jazz',
    songs: {
      create: [
        {
          title: 'Take Five',
          artist: 'Dave Brubeck',
        },
        {
          title: 'So What',
          artist: 'Miles Davis',
        },
        {
          title: 'All Blues',
          artist: 'Miles Davis',
        }
      ],
    },
  }
]


async function main() {
  console.log(`Start seeding ...`)
  for (const g of genre) {
    const genre = await prisma.genre.create({
      data: g,
    })
    console.log(`Created user with id: ${genre.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
