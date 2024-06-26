import { Request, Response } from "express";
import autoBind from "auto-bind";
import friendsService from "./friends.service";

class FriendsController {
  #friendsService;
  constructor() {
    autoBind(this);
    this.#friendsService = friendsService;
  }

  async getUserFriends(req: any, res: Response, next: any) {
    try {
      const friends = await this.#friendsService.getUserFriends(req.user.id);
      return res.json(friends);
    } catch (error) {
      next(error);
    }
  }

  async generateIl(req: any, res: Response, next: any) {
    try {
      const il = await this.#friendsService.getUserIl(req.user.id);
      return res.json({ il: `${process.env.BOT_URL}?start=${il}` });
    } catch (error) {
      next(error);
    }
  }
}

export default new FriendsController();
