const graphql = require('graphql');
const { filter } = require('lodash');
var _ = require('lodash')
 const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLSchema 
 } = graphql
 
//Create types

//dummy data
var usersData = [
     {id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
     {id: '13', name: 'Anna', age: 26, profession: 'Baker'},
     {id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
     {id: '19', name: 'Gina', age: 26, profession: 'Painter'},
     {id: '150', name: 'Georgina', age: 36, profession: 'Teacher'}
];

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},
];

var postsData = [
    {id: '1', comment: 'Building a Mind', userId: '1'},
    {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
    {id: '3', comment: 'How to Change the World', userId: '19'},
    {id: '4', comment: 'How to Change the World', userId: '211'},
    {id: '5', comment: 'How to Change the World', userId: '1'}
]


const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: {type: graphql.GraphQLString},
    name: {type: graphql.GraphQLString},
    age: {type: graphql.GraphQLInt},
    posts: {
      type: new graphql.GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, {userId:parent.id})
      }

    },
    hobbies: {
      type: new graphql.GraphQLList(HobbyType),
      resolve(parent, args) {
        return _,filter(hobbiesData, {userId: parent.id})
      }
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
      id: {type: GraphQLID},
      title: {type: graphql.GraphQLString},
      description: {type: graphql.GraphQLString},
      user: {
        type: UserType,
        resolve(parent, args) {
          return _.find(usersData, {id:parent.userId})
        }
      }
     
  })
});

//Post type (id, comment)

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: {type: GraphQLID},
    comment: {type: graphql.GraphQLString},
    userId: {type: graphql.GraphQLString},
    user: {type: UserType,
      resolve(parent, args) {
        return _.find(usersData, {id:parent.userId})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description...',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: graphql.GraphQLString}},
      resolve(parent, args) {
        let users = _.find(usersData, {id: args.id})
        return users
        //we resolve with data
        //get and return data from a data source

      }
    },
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve(parent, args) {
        return usersData
      }
    },
    hobby: {
      type: HobbyType,
      args:{id:{type:GraphQLID}},
      resolve(parent, args) {
        return _.find(hobbiesData, {id: args.id})
      }
    },
    hobbies: {
      type: new graphql.GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbiesData
      }
    },
    post: {
      type: PostType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
        return _.find(postsData, {id: args.id})
      }
    },
    posts: {
      type: PostType,
      resolve(parent, args) {
        return postsData
      }
    }
  }
})


//Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        id: {type:GraphQLID},
        name:{type:graphql.GraphQLString},
        age: {type:graphql.GraphQLInt},
        profession: {type:graphql.GraphQLString},
      },
      resolve(parent, args) {
        let user = {
          id: args.id,
          name: args.name,
          age: args.age,
          profession: args.profession
        }
        return user
      }
    },
    createPost: {
      type: PostType,
      args: {
        userId: {type: graphql.GraphQLString},
        comment: {type: graphql.GraphQLString}
      },
      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId
        }
        return post
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})