const { ApolloServer, gql } = require("apollo-server");

const posts = [
  {
    title: "my first post",
    text: "hello, im post text",
    comments: [],
  },
];

const typeDefs = gql`
  type Post {
    title: String
    text: String
    comments: [Comments]
  }

  type Comments {
    author: String
    text: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addComment(author: String, text: String): Comments
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    addComment: (root, args) => {
      const newComment = { author: args.author, text: args.text };
      posts[0].comments.push(newComment);
      return newComment;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`server running on ${url}`));
