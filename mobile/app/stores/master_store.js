import loggerCreator from "../utils/logger";
//noinspection JSUnresolvedVariable
const moduleLogger = loggerCreator("MasterStore");

import { observable } from "mobx";

class MasterStore {
  @observable isNavigationSidebarOpen = true;

  constructor() {
    loggerCreator("constructor", moduleLogger);
  }
}

export default new MasterStore();