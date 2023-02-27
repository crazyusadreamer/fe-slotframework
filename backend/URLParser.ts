import Facade from "@/Facade";
import { Utilities } from "@helpers/utils/Utilities";

export class URLParser {
  private playerID: string;
  private gameID: string;

  constructor() {
    this.playerID = ''
    this.gameID = ''
    this.init();
  }

  init() {
    this.parseUrlParameters();
  }

  parseUrlParameters() {
    this.playerID = Utilities.getUrlParam('player_id', this.playerID)
    this.gameID = Utilities.getUrlParam('game_id', this.gameID)

    if (!this.playerID) {
      console.error(
        "player_id was not found in the URL. Example: player_id=12345"
      );
    }
    const data: any = {
      playerID: this.playerID,
      gameID: this.gameID,
    };

    Facade.urlParams = data;
  }
}