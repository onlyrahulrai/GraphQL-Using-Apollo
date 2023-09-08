import Project from "../../models/Project.js";
import Client from "../../models/Client.js";

const getProjectStatus = (key) => {
  const values = {
    new: "Not Started",
    progress: "In Progress",
    completed: "Completed",
  };

  return values[key];
};

const ProjectResolver = {
  ProjectType: {
    client: async (parent) => await Client.findById(parent.clientId),
  },
  Query: {
    projects: async () => await Project.find({}),
    project: async (_, { id }) => await Project.findById(id),
  },
  Mutation: {
    addProject: async (_, { status: key, ...rest }) => {
      const status = getProjectStatus(key);

      const project = new Project({
        name: rest.name,
        description: rest.description,
        status: status,
        clientId: rest.clientId,
      });

      return project.save();
    },
    updateProject: async (_, { status: key, ...rest }) => {
      const status = getProjectStatus(key);

      return await Project.findByIdAndUpdate(
        rest.id,
        {
          $set: {
            name: rest.name,
            description: rest.description,
            status: status,
          },
        },
        {
          new: true,
        }
      );
    },
    deleteProject: async (_, { id }) => {
      return await Project.findByIdAndRemove(id);
    },
  },
};

export default ProjectResolver;
