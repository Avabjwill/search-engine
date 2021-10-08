// BRING IN GRAPHQL FOR APOLLO-SERVER-EXPRESS
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Book {
    _id: String
    authors: [String]
    title: String
    description: String
   
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// EXPORT TYPEDEFS FOR USE IN APP
module.exports = typeDefs;