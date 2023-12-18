import * as THREE from "three";
import { TestGame } from "./games/test.js";
import { World } from "./world.js";

var gameLoad;
const CustomGameMemory = {
  elevatorMoveTime: 10000,
  doorMoveTime: 1000,
};

const CustomGameInfo = {
  oldcomputer_button: {
    type: "button",
    init: () => {},
    callback: (button) => {
      const computer = button.boundobject.mesh;
      const computerStatus = computer.isEnabled || 0;
      const screen = computer.getObjectByProperty("type", "PlaneFrame");
      // console.log(screen)
      // console.log("Clicked",computer)
      button.buttonSelectable = false;
      for (let name in computer.actions) {
        computer.actions[name].stop();
        computer.actions[name].setDuration(1);
      }
      computer.actions["turnon"].loop = THREE.LoopOnce;
      computer.actions["turnoff"].loop = THREE.LoopOnce;

      if (
        !computer.animMixer._listeners ||
        (computer.animMixer._listeners &&
          computer.animMixer._listeners.length == 0)
      ) {
        computer.animMixer.addEventListener("finished", () => {
          for (let name in computer.actions) {
            computer.actions[name].stop();
          }
          button.buttonSelectable = true;
          if (computer.isEnabled == 2) {
            computer.actions["default"].play();
            computer.isEnabled = 0;
          } else if (computer.isEnabled == 3) {
            computer.actions["on"].play();
            computer.isEnabled = 1;
          }
        });
      }
      if (computerStatus == 0) {
        computer.actions["turnon"].play();
        computer.isEnabled = 3;
        screen.enabled = true;
        setTimeout((screen) => {
          const screenNormal = screen.plane.getWorldDirection(
            new THREE.Vector3()
          ); //new THREE.Vector3(1,0,0).applyMatrix4(screen.matrixWorld).normalize();
          const screenPosition = new THREE.Vector3().setFromMatrixPosition(
            screen.matrixWorld
          );
          console.log(screen);
          const screenOut = screenPosition
            .clone()
            .add(
              screenNormal
                .clone()
                .multiplyScalar(Math.max(screen.scale.x, screen.scale.y) * 0.8)
            ); //screenNormal.clone().multiplyScalar(1).add(screenPosition)
          const viewMatrix = new THREE.Matrix4()
            .lookAt(screenOut, screenPosition, new THREE.Vector3(0, 1, 0))
            .setPosition(screenOut);
          gameLoad.world.mechanics.lockCameraToView(viewMatrix);
        }, 800,screen);
      } else if (computerStatus == 1) {
        computer.actions["turnoff"].play();
        computer.isEnabled = 2;
        screen.enabled = false;
        gameLoad.world.mechanics.unlockCamera();
      }
    },
  },
  elevator_base: {
    type: "button",
    init: () => {
      gameLoad._loadedObjects["elevator"].body.type = 4;

      const doors = [
        gameLoad.scene.getObjectByName("elevator.door_l"),
        gameLoad.scene.getObjectByName("elevator.door_r"),
        gameLoad.scene.getObjectByName("room1.door_l"),
        gameLoad.scene.getObjectByName("room1.door_r"),
        gameLoad.scene.getObjectByName("main_room.door_l"),
        gameLoad.scene.getObjectByName("main_room.door_r"),
      ];

      for (let door of doors) {
        door._originialDoorX = door.position.x;
      }

      CustomGameMemory.closeDoors = () => {
        for (let door of doors) {
          const targetDoorPos = door.position.clone();
          targetDoorPos.x = door._originialDoorX;
          new gameLoad.world.TWEEN.Tween(door.position)
            .to(targetDoorPos, CustomGameMemory.doorMoveTime)
            .start();
        }
      };
    },
    callback: () => {
      const elevator = gameLoad.scene.getObjectByName("elevator");
      if(elevator.moving)return;
      const mainRoom = gameLoad.scene.getObjectByName("main_room.floor");
      const elevatorDoorL = gameLoad.scene.getObjectByName("elevator.door_l");
      const elevatorDoorR = gameLoad.scene.getObjectByName("elevator.door_r");
      const mainRoomDoorL = gameLoad.scene.getObjectByName("main_room.door_l");
      const mainRoomDoorR = gameLoad.scene.getObjectByName("main_room.door_r");

      const targetEPos = elevator.position.clone();
      targetEPos.y = mainRoom.position.y;

      let elevatorSpeed = CustomGameMemory.elevatorMoveTime;
      if(targetEPos.clone().sub(elevator.position).length() < 0.1)elevatorSpeed = 100;

      CustomGameMemory.closeDoors();

      elevator.moving = true;
      setTimeout(() => {
        new gameLoad.world.TWEEN.Tween(elevator.position)
          .to(targetEPos, elevatorSpeed).easing(gameLoad.world.TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(() => {
            new gameLoad.world.TWEEN.Tween(elevatorDoorL.position)
              .to(
                elevatorDoorL.position
                  .clone()
                  .add(new THREE.Vector3(elevatorDoorL.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(elevatorDoorR.position)
              .to(
                elevatorDoorR.position
                  .clone()
                  .add(new THREE.Vector3(-elevatorDoorR.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(mainRoomDoorL.position)
              .to(
                mainRoomDoorL.position
                  .clone()
                  .add(new THREE.Vector3(mainRoomDoorL.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(mainRoomDoorR.position)
              .to(
                mainRoomDoorR.position
                  .clone()
                  .add(new THREE.Vector3(-mainRoomDoorR.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start().onComplete(()=>{
                elevator.moving = false;
              });
          });
      }, CustomGameMemory.doorMoveTime);
    },
  },
  elevator_floor1: {
    type: "button",
    callback: () => {
      const elevator = gameLoad.scene.getObjectByName("elevator");
      if(elevator.moving)return;
      const room1 = gameLoad.scene.getObjectByName("room1.floor");
      const elevatorDoorL = gameLoad.scene.getObjectByName("elevator.door_l");
      const elevatorDoorR = gameLoad.scene.getObjectByName("elevator.door_r");
      const room1DoorL = gameLoad.scene.getObjectByName("room1.door_l");
      const room1DoorR = gameLoad.scene.getObjectByName("room1.door_r");

      const targetEPos = elevator.position.clone();
      targetEPos.y = room1.position.y;

      let elevatorSpeed = CustomGameMemory.elevatorMoveTime;
      if(targetEPos.clone().sub(elevator.position).length() < 0.1)elevatorSpeed = 100;

      CustomGameMemory.closeDoors();

      elevator.moving = true;
      setTimeout(() => {
        new gameLoad.world.TWEEN.Tween(elevator.position)
          .to(targetEPos, elevatorSpeed).easing(gameLoad.world.TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(() => {
            new gameLoad.world.TWEEN.Tween(elevatorDoorL.position)
              .to(
                elevatorDoorL.position
                  .clone()
                  .add(new THREE.Vector3(elevatorDoorL.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(elevatorDoorR.position)
              .to(
                elevatorDoorR.position
                  .clone()
                  .add(new THREE.Vector3(-elevatorDoorR.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(room1DoorL.position)
              .to(
                room1DoorL.position
                  .clone()
                  .add(new THREE.Vector3(room1DoorL.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start();
            new gameLoad.world.TWEEN.Tween(room1DoorR.position)
              .to(
                room1DoorR.position
                  .clone()
                  .add(new THREE.Vector3(-room1DoorR.scale.x, 0, 0)),
                CustomGameMemory.doorMoveTime
              )
              .start().onComplete(()=>{
                elevator.moving = false;
              });
          });
      }, CustomGameMemory.doorMoveTime);
    },
  },
};

function init() {
  const world = new World();
  // TestGame.character.model = "nothinkpad"
  gameLoad = world.loadGame(TestGame);
  window.game = gameLoad;
  game.addGameEvents(CustomGameInfo);
  world.initGame();
  world.addGameLoadListener(() => {
    let info;
    for (let name in CustomGameInfo) {
      info = CustomGameInfo[name];
      if (info.init) info.init();
    }
  });
}

init();
// const videos = [
//   "dQw4w9WgXcQ",
//   "c5ZN9HAglkU",
//   "HXgz49KnFwo",
//   "AWOyEIuVzzQ",
//   "CuzCunNbpWU",
//   "G174Fwq7sm4",
//   "TyGO0RU7aVk",
//   "PLOPygVcaVE",
//   "JYniYOGCV6g",
//   "C34WAUgkAT0",
// ];
// for (let i in videos) {
//   const frameGeometry = new THREE.PlaneGeometry(10, 10);
//   const frameMesh = new PlaneFrame(
//     frameGeometry,
//     "https://www.youtube.com/embed/" + videos[i],
//     500,
//     500
//   );
//   frameMesh.scale.set(10, 10, 10);
//   frameMesh.position.set(100 * Math.floor(i / 3) - 10, 100 * (i % 3) - 10, 0);
//   // frameMesh.rotation.x = -Math.PI/2;
//   frameMesh.updateTransforms();
//   world.add(frameMesh);

// }

// world.camera.position.set(0, 0, 200);
