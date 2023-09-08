import projectResolver from "./projects.js";
import clientResolver from "./clients.js";
import userResolver from "./users.js";


export default {
  ProjectType: projectResolver.ProjectType,
  ClientType: clientResolver.ClientType,
  Query: {
    ...projectResolver.Query,
    ...clientResolver.Query,
    ...userResolver.Query
  },
  Mutation:{
    ...clientResolver.Mutation,
    ...projectResolver.Mutation,
    ...userResolver.Mutation,
  }
};
