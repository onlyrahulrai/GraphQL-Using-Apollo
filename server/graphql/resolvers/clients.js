import { GraphQLError } from "graphql";
import Client from "../../models/Client.js";
import Project from "../../models/Project.js";

const ClientResolver = {
  ClientType: {
    projects: async (parent) => await Project.find({ clientId: parent.id }),
  },
  Query: {
    clients: async () => await Client.find({}),
    client: async (_, { id }) => await Client.findById(id),
  },
  Mutation: {
    addClient: async (_, args) => {
      const clientInstance = await Client.findOne({ email: args.email });

      if (clientInstance) {
        throw new GraphQLError(
          JSON.stringify({ message: "Client is already exist." })
        );
      }

      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });

      return await client.save();
    },
    deleteClient: async (_, args) => {
      Project.find({ clientId: args.id }).then((projects) => {
        projects.forEach((project) => {
          project.deleteOne();
        });
      });

      return Client.findByIdAndRemove(args.id);
    },
    updateClient: async (_, args) => {
      return await Client.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.phone,
          },
        },
        {
          new: true,
        }
      );
    },
  },
};

export default ClientResolver;
