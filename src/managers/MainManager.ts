import Config from "@/Config"
import { ShowWaysManager } from "@/winnings/ShowWaysManager"
import { BackendManager } from '@backend/BackendManager'

export class MainManager {

    constructor() {
        new BackendManager(Config.URL)
        new ShowWaysManager()
    }
}