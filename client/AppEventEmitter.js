import { EventEmitter } from "events";

const CHANGE_EVENT = "CHANGE";

export default class AppEventEmitter extends EventEmitter {
  emitChange() {
    // console.log('change emitChange');
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
}