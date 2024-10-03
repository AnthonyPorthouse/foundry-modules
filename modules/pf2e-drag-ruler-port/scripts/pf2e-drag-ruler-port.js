import { movementTracking } from "./movement.js";
import { actionCount } from "./utils.js";

Hooks.once("dragRuler.ready", (SpeedProvider) => {
  class PF2eSpeedProvider extends SpeedProvider {
    get colors() {
      return [
        { id: "FirstAction", default: 0x3222c7 },
        { id: "SecondAction", default: 0xffec07 },
        { id: "ThirdAction", default: 0xc033e0 },
        { id: "FourthAction", default: 0x1bcad8 },
      ];
    }

    getRanges(token) {
      var numactions = actionCount(token); //Use the actionCount function to determine how many actions that token gets each round.
      var movement = movementTracking(token); //Use the movementTracking function to get how far each movement range should be.
      const ranges = []; //create blank array to store the ranges in.

      if (numactions > 0 && movement.A1 > 0) {
        //Set the ranges for each of our four actions to be given to the drag ruler.
        ranges.push(
          { range: movement.A1, color: "FirstAction" },
          { range: movement.A2, color: "SecondAction" },
          { range: movement.A3, color: "ThirdAction" },
          { range: movement.A4, color: "FourthAction" },
        );
        //Remove ranges from the function until only the ranges equal to the number of legal actions remain.
        for (var i = numactions, len = ranges.length; i < len; i++) {
          ranges.pop();
        }
      } else {
        ranges.push({ range: 0, color: "FirstAction" });
      } //Since ranges is empty if you've got no actions add a range for the first action of 0.
      return ranges;
    }
  }

  dragRuler.registerModule("pf2e-drag-ruler-port", PF2eSpeedProvider);
});
