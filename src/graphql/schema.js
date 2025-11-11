const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

const pgTasks = require('../models/pgTaskModel');
const mongoTasks = require('../models/mongoTaskModel');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    pgTasks: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskType))),
      resolve: async () => pgTasks.getAll(),
    },
    mongoTasks: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskType))),
      resolve: async () => mongoTasks.getAll(),
    },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addPgTask: {
      type: new GraphQLNonNull(TaskType),
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { title }) => pgTasks.add(title),
    },
    removePgTask: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => pgTasks.remove(parseInt(id, 10)),
    },
    addMongoTask: {
      type: new GraphQLNonNull(TaskType),
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { title }) => mongoTasks.add(title),
    },
    removeMongoTask: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => mongoTasks.remove(id),
    },
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = { schema };

