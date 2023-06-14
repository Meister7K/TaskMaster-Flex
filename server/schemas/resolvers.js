const { User, Task, Item, PlayerCharacter } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    playerCharacters: async()=>{
      return await PlayerCharacter.find({}).populate("equipment")
    },
    users: async () => {
      return await User.find({}).populate("playerChar")
    },
    tasks: async () => {
      return await Task.find({}).populate("user");
    },
    items: async()=>{
      return await Item.find({});
    },
    weapons: async()=>{
      return await Item.find({itemType: "weapon"});
    },
    armors: async()=>{
      return await Item.find({itemType: "armor"});
    },
    consumables: async()=>{
      return await Item.find({itemType: "consumable"});
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      
      const user = await User.create({ username, email, password});
      const token = signToken(user);
      if(user){
        const newPC = await PlayerCharacter.create({});
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {playerChar: newPC._id },
          { new: true }
          
        );

      }
      const userAndPlayer= await User.findById(user._id);
      return { token, user: userAndPlayer};
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "Email or password incorrect, try again!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Email or password incorrect, try again!"
        );
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { user, email, password }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { email, password },
          { new: true }
        );

        const user = await User.findOne({ email });

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    changePassword: async (
      parent,
      { currentPassword, newPassword },
      context
    ) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(currentPassword);

        if (!correctPw) {
          throw new AuthenticationError("Current password is incorrect");
        }

        user.password = newPassword;
        await user.save();

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        try {
          await User.findByIdAndDelete(context.user._id);
          return { message: "Account successfully deleted!" };
        } catch (error) {
          throw new Error("An error occurred while deleting the account.");
        }
      }

      throw new AuthenticationError("Not logged in");
    },
    addTask: async (parent, { name, difficulty, category }, context) => {
      if (context.user) {
        const task = await Task.create({
          name,
          difficulty,
          category,
          user: context.user._id,
        });

        return { task };
      }

      throw new AuthenticationError("Not logged in");
    },
    completeTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findById(taskId);

        if (!task) {
          throw new Error("Task not found");
        }

        task.isComplete = true;
        await task.save();

        return { task };
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findById(taskId);

        if (!task) {
          throw new Error("Task not found");
        }

        await Task.findByIdAndDelete(taskId);

        return { message: "Task deleted successfully" };
      }

      throw new AuthenticationError("Not logged in");
    },

    addToInventory : async (parent, {playerId, itemId}, context)=>{
      const player = await PlayerCharacter.findOneAndUpdate(
        {id: playerId},
        { $push: {inventory : itemId}}
      );
    }
  },
};

module.exports = resolvers;
