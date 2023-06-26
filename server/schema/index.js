const typeDefs = `#graphql
    type Author {
        uid: String
        name: String
        folders: [Folder]
    }
    type Folder {
        id: String
        name: String
        createdAt: String
        author: Author
        notes: [Note]
    }
    type Note {
        id: String
        content: String
        folder: Folder
    }
    
    type Query {
        authors: [Author],
        author(authorId: String): Author,
        folders: [Folder],
        folder(folderId: String): Folder,
        notes(folderId: String): [Note],
        note(noteId: String): Note
    }

    type Mutation {
        addFolder(name: String!): Folder,
        register(uid: String!, name: String!): Author,
        addNote(content: String!, folderId: ID!): Note,
        updateNote(id: String!, content:String!): Note,
    }
`
export default typeDefs