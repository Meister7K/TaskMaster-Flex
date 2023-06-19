const { User, Task, Item, PlayerCharacter } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    playerCharacters: async () => {
      return await PlayerCharacter.find({})
        .populate("inventory")
        .populate("playerWeapon")
        .populate("playerArmor");
      //.populate("equipment");
    },
    onePlayer: async (parent, {userId})=>{
      let user = await User.findOne({ _id: userId }).populate({
        path: "playerChar",
        populate: ["inventory","playerWeapon","playerArmor"],
      });
      return user.playerChar
    },
    users: async () => {
      return await User.find({}).populate({
        path: "playerChar",
        populate: ["inventory", "playerWeapon", "playerArmor"],
      });
    },
    tasks: async () => {
      return await Task.find({}).populate("user");
    },
    items: async () => {
      return await Item.find({});
    },
    weapons: async () => {
      return await Item.find({ itemType: "weapon" });
    },
    armors: async () => {
      return await Item.find({ itemType: "armor" });
    },
    consumables: async () => {
      return await Item.find({ itemType: "consumable" });
    },
    playerGold: async (parent, { userId }) => {
      let user = await User.findOne({ _id: userId }).populate({
        path: "playerChar",
        populate: "gold",
      });
      return user.playerChar.gold;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      if (user) {
        const newPC = await PlayerCharacter.create({});
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { playerChar: newPC._id },
          { new: true }
        );
      }
      const userAndPlayer = await User.findById(user._id);
      return { token, user: userAndPlayer };
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
        console.log(context.user.email);
        const user = await User.findOne({ email: context.user.email });

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Password incorrect, try again!");
        } else {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { email },
            { new: true }
          );

          return updatedUser;
        }
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

    addToInventory: async (parent, { userId, itemId }, context) => {
      try {
        const user = await User.findById(userId);
        const player = await PlayerCharacter.findOneAndUpdate(
          { _id: user.playerChar._id },
          { $push: { inventory: itemId } },
          { new: true }
        ).populate("inventory");

        return player;
      } catch (err) {
        return err;
      }
    },

    addGold: async (parent, { userId, amount }, context) => {
      try {
        const user = await User.findById(userId);
        const player = await PlayerCharacter.findOneAndUpdate(
          { _id: user.playerChar._id },
          { $inc: { gold: amount } },
          { new: true }
        );

        return player;
      } catch (err) {
        return err;
      }
    },

    removeGold: async (parent, { userId, amount }, context) => {
      try {
        const user = await User.findById(userId);
        const player = await PlayerCharacter.findOneAndUpdate(
          { _id: user.playerChar._id },
          { $inc: { gold: -amount } },
          { new: true }
        );
        return player;
      } catch (err) {
        return err;
      }
    },

    equipItem: async (parent, {userId, itemId})=>{
      try{
        const user= await User.findById(userId)
        const itemData=await Item.findById(itemId);


        const player=await PlayerCharacter.findOne({_id: user.playerChar._id, inventory: itemData})
        .populate("inventory")
        .populate("playerWeapon")
        .populate("playerArmor");
        

        //console.log(player);
        
        // console.log("here");
        // console.log(player.inventory);
        if(player /*&& player.inventory.includes(itemData._id)*/){

          if(itemData.itemType==='weapon'){
            const updatedPlayer= await PlayerCharacter.findByIdAndUpdate(player._id, {playerWeapon: itemId},{new: true}).populate("playerWeapon")
            .populate("playerArmor");
            return updatedPlayer
          }
          else if(itemData.itemType==='armor'){
            const updatedPlayer= await PlayerCharacter.findByIdAndUpdate(player._id, {playerArmor: itemId}, {new: true}).populate("playerWeapon")
            .populate("playerArmor");
            return updatedPlayer
          }
          return player
          
        }
      }catch(err){
        
        console.log(err);
        return err;
        
      }
    }
  },
};

module.exports = resolvers;
