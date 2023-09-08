export default `
    enum Status {
        new,
        progress,
        completed
    }

    enum Role {
        user,
        admin
    }

    type ProjectType{
        id:ID!
        name:String!
        description:String!
        status:String!
        client:ClientType!
    }

    type ClientType{
        id:ID!
        name:String!
        email:String!
        phone:String!
        projects:[ProjectType]
    }

    type UserType{
        id:ID!
        fullname:String!
        firstname:String!
        lastname:String!
        username:String!
        email:String!
        role:String!
        access:String!
        refresh:String!
    }

    type Query{
        projects:[ProjectType]
        project(id:ID!):ProjectType
        clients:[ClientType]
        client(id:ID!):ClientType
        userDetails:UserType
    }

    type Mutation{
        addClient(name:String!,email:String!,phone:String!):ClientType
        deleteClient(id:ID!):ClientType
        updateClient(id:ID!,name:String,email:String,phone:String):ClientType

        addProject(name:String!,description:String!,status:Status!,clientId:ID!):ProjectType
        updateProject(id:ID!,name:String,description:String,status:Status):ProjectType
        deleteProject(id:ID!):ProjectType

        loginUser(email:String!,password:String!):UserType

        registerUser(firstname:String,lastname:String,email:String!,password:String!,confirm_password:String!,role:Role):UserType
    }
`;

