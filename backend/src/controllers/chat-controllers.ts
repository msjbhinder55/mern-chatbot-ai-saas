import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";

const openai = configureOpenAI(); // should return `new OpenAI({ apiKey })` — see note below

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Cast manually as only `user`/`assistant` roles (not `function`)
    const chats = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant" | "system", // helps TS know it's safe
      content,
    })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(response.choices[0].message);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  _next: NextFunction // Prefix with underscore
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  _next: NextFunction // Prefix with underscore
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-expect-error - We're intentionally ignoring type checking here
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
