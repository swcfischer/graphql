exports.typeDefs = `

  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
  }

  type Token {
    token: String!
  }


  type Query {
    getCurrentUser: User
  }

  type Mutation {
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }
`;