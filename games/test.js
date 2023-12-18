import { Material } from "cannon";
import { MeshBasicMaterial } from "three";

var TestGame = {
  flags: { 
    debug: false
  },
  settings: {
    yLevel: -50,
  },
  scene: {},
  imports: {
    models: {
      nothinkpad: "nothinkpad.glb",
      oldcomputer: "oldcomputer.glb",
      bagel: "bagel.glb"
    },
    images: {
      wall_blue: "wall_blue.png",
      floor1: "floor_arrow.png"
    },
    videos: {},
  },
  character: {
    texture: "character",
    model: "bagel",
    mass: 20,
    size: [1, 1, 1],
    walkSpeed: 2,
    sprintSpeed: 5,
    jumpPower:10
  },
  materials: {
    three: {
      // default: {
      //   type: "ShaderMaterial",
      //   settings: {
      //     uniforms: {
      //       v_Uv: { value: { x: 0, y: 0 } },
      //     },
      //     vertexShader: `
      //                 varying vec2 v_Uv;
                      
      //                 void main( ) {
              
      //                     v_Uv = uv;
      //                     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      //                     gl_Position = projectionMatrix * mvPosition;
                          
      //                 } 
      //             `,
      //     fragmentShader: `
      //                 varying vec2 v_Uv;
                  
      //                 void main( ) {
                      
      //                     vec2 position = v_Uv;
                          
      //                     vec3 color = vec3( position.x, position );
                          
      //                     // gl_FragColor = vec4( color, position.y ); // color, transparency
                          
      //                     gl_FragColor = vec4( floor(position.x*10.0)/10.0, floor(position.x*10.0)/5.0, floor(position.y*10.0)/5.0, position.y*10.0 ); // is identical
      //                 }
      //              `,
      //   },
      //au,
      default: {
        type: "MeshBasicMaterial",
        settings: {
          color: 0xff00ff,
          // transparent: true,
          side: 1,
          wireframe:true
        },
      },
      wall: {
        type: 'MeshPhysicalMaterial',
        settings: {
          transparent: true,
          transmission: 0,
          thickness:1,
          depthWrite: false,
          map: "wall_blue"
        },
        excludeHulls: true
      },
      table_leg:{
        type: "MeshBasicMaterial",
        settings: {
          color: 0x964B00,
        },
      },
      table_top:{
        type: "MeshBasicMaterial",
        settings: {
          color: 0x964B00,
        },
      },
      frame:{
        type: "MeshBasicMaterial",
        settings:{
          color: 0xaaaaaa
        }
      },
      floor:{
        type: "MeshStandardMaterial",
        settings:{
          map:"floor1"
        }
      },
      elevator_wall:{
        type: "MeshBasicMaterial",
        settings:{
          color:0x555555
        }
      },
      elevator_floor:{
        type:"MeshBasicMaterial",
        settings:{
          color: 0x274323
        }
      },
      elevator_door:{
        type:"MeshBasicMaterial",
        settings:{
          color: 0xB3DAC5
        }
      },
      button_blue:{
        type:"MeshBasicMaterial",
        settings:{
          color: 0x849FE7
        }
      },
      button_green:{
        type:"MeshBasicMaterial",
        settings:{
          color: 0xB3E77C
        }
      }
    },
    cannon: {
      default: {
        type: "Material",
        friction: 1,
      },
      character: {
        type: "Material",
        settings: {
          friction: 1,
          restitution: 0,
        },
      },
      elevator_floor:{
        type:"Material",
        friction: 1,
        restitution : 100
      }
    },
  },
  objects: {
    list: [
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          0.0,
          -0.0
        ],
        "rotation": [
          180.00000500895632,
          -1.866933528522283e-05,
          -180.00000500895632
        ],
        "shader": "floor",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          20.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "main_room.floor"
      },
      {
        "mass": 0.0,
        "position": [
          0.0,
          5.099999904632568,
          -10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "main_room.001"
      },
      {
        "mass": 0.0,
        "position": [
          -10.0,
          5.099999904632568,
          -0.0
        ],
        "rotation": [
          90.00000250447816,
          -2.5044782690431654e-06,
          -90.00000250447816
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.003"
      },
      {
        "mass": 0.0,
        "position": [
          10.0,
          5.099999904632568,
          -0.0
        ],
        "rotation": [
          90.00000250447816,
          -2.5044782690431654e-06,
          -90.00000250447816
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.004"
      },
      {
        "position": [
          6.5,
          5.099999904632568,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          7.019999980926514,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.006"
      },
      {
        "parent": "",
        "position": [
          -6.500000476837158,
          5.099999904632568,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          7.019999980926514,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.007"
      },
      {
        "parent": "",
        "position": [
          0.0,
          8.600000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          6.0,
          0.30000001192092896,
          3.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "main_room"
      },
      {
        "mass": 0.0,
        "position": [
          0.0,
          5.099999904632568,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          19.999998092651367,
          0.30000001192092896,
          9.999999046325684
        ],
        "texture": "default",
        "type": "visual",
        "uuid": "Cube.001"
      },
      {
        "position": [
          0.0,
          3.6000006198883057,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "exclude_hull",
        "shape": "box",
        "size": [
          6.120000839233398,
          0.9025683403015137,
          6.997915744781494
        ],
        "type": "excludehull",
        "uuid": "Cube.005"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          2.3999998569488525,
          3.8999993801116943,
          10.224534034729004
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "main_room.door_l"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          -2.3999998569488525,
          3.8999993801116943,
          10.224534034729004
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "main_room.door_r"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          10.100000381469727,
          -0.0
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "ceiling",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          20.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.008"
      },
      {
        "isconnected": false,
        "opaque": false,
        "parent": "main_room.floor",
        "pointnumber": 0,
        "position": [
          0.0,
          3.8040997982025146,
          -0.0
        ],
        "rotation": [
          0.0,
          -1.6284441910349726e-12,
          -0.0
        ],
        "shader": "wall",
        "size": [
          0.9999999403953552,
          0.10000001639127731,
          0.9999999403953552
        ],
        "texture": "default",
        "type": "checkpoint",
        "uuid": "Cube"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          3.0,
          3.5999999046325684,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          0.30000001192092896,
          0.2849999964237213,
          7.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.025"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          -3.0,
          3.5999999046325684,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          0.30000001192092896,
          0.2849999964237213,
          7.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.036"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          7.0,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          6.300000190734863,
          0.2849999964237213,
          0.30000001192092896
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.037"
      },
      {
        "isconnected": false,
        "mass": 500.0,
        "model": "oldcomputer",
        "opaque": false,
        "parent": null,
        "position": [
          -7.481308460235596,
          2.209479331970215,
          5.846133232116699
        ],
        "rotation": [
          -0.0,
          -89.98021544645265,
          -0.0
        ],
        "size": [
          1.68760347366333,
          1.68760347366333,
          1.68760347366333
        ],
        "syncdirection": true,
        "texture": "default",
        "type": "sync-import",
        "uuid": "Cube.076"
      },
      {
        "boundobject": "Cube.076",
        "buttonid": "oldcomputer_button",
        "mass": 10.0,
        "parent": "Cube.076",
        "parentbone": "",
        "position": [
          -6.970798015594482,
          2.3811473846435547,
          5.242353439331055
        ],
        "rotation": [
          -0.0,
          -90.00000250447816,
          -0.0
        ],
        "shader": "table_top",
        "shape": "box",
        "size": [
          0.16000008583068848,
          0.16000008583068848,
          0.16000008583068848
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.077"
      },
      {
        "mass": 200.0,
        "parent": "Cube.076",
        "position": [
          -6.625993251800537,
          3.323263168334961,
          6.2381486892700195
        ],
        "rotation": [
          -90.00002299504568,
          -7.470482692434658,
          89.999995674289
        ],
        "size": [
          1.0681242942810059,
          0.0,
          0.6980003714561462
        ],
        "source": "./pages/welcome.html",
        "syncdirection": true,
        "type": "planeFrame",
        "uuid": "Plane.001"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          4.000000476837158,
          1.063745379447937,
          9.873494148254395
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "button_green",
        "shape": "box",
        "size": [
          0.29910963773727417,
          0.29910963773727417,
          0.14000001549720764
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.078"
      },
      {
        "boundobject": "elevator",
        "buttonid": "elevator_base",
        "mass": 0.0,
        "parentbone": "",
        "position": [
          4.000000476837158,
          1.0637452602386475,
          9.873494148254395
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          0.20000001788139343,
          0.20000001788139343,
          0.20000001788139343
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.079"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          -5.798120975494385,
          16.400001525878906
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          13.000000953674316,
          0.19500002264976501,
          13.000000953674316
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.009"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          6.500000953674316,
          11.5,
          16.400001525878906
        ],
        "rotation": [
          0.0,
          -0.0,
          -89.999995674289
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          34.523956298828125,
          0.19500000774860382,
          13.000000953674316
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.010"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          -6.499999046325684,
          11.5,
          16.400001525878906
        ],
        "rotation": [
          0.0,
          -0.0,
          -89.999995674289
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          34.523956298828125,
          0.19500000774860382,
          13.000000953674316
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.011"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          9.5367431640625e-07,
          11.5,
          23.0
        ],
        "rotation": [
          -90.00000250447816,
          90.00000250447816,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          34.523956298828125,
          0.19500000774860382,
          13.000000953674316
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.013"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          9.5367431640625e-07,
          -0.9999998211860657,
          9.800000190734863
        ],
        "rotation": [
          -90.00000250447816,
          90.00000250447816,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          2.184000015258789,
          0.19500000774860382,
          13.000000953674316
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.014"
      },
      {
        "isconnected": false,
        "mass": 500.0,
        "model": "oldcomputer",
        "opaque": false,
        "parent": null,
        "position": [
          -7.481308460235596,
          15.08932113647461,
          5.846133232116699
        ],
        "rotation": [
          -0.0,
          -89.98021544645265,
          -0.0
        ],
        "size": [
          1.68760347366333,
          1.68760347366333,
          1.68760347366333
        ],
        "syncdirection": true,
        "texture": "default",
        "type": "sync-import",
        "uuid": "Cube.096"
      },
      {
        "mass": 200.0,
        "parent": "Cube.096",
        "position": [
          -6.625993251800537,
          16.203105926513672,
          6.2381486892700195
        ],
        "rotation": [
          -90.00002299504568,
          -7.470482692434658,
          89.999995674289
        ],
        "size": [
          1.0681242942810059,
          0.0,
          0.6980003714561462
        ],
        "source": "./pages/ducksong.html",
        "syncdirection": true,
        "type": "planeFrame",
        "uuid": "Plane.002"
      },
      {
        "boundobject": "Cube.096",
        "buttonid": "oldcomputer_button",
        "mass": 10.0,
        "parent": "Cube.096",
        "parentbone": "",
        "position": [
          -6.970798015594482,
          15.26098918914795,
          5.242353439331055
        ],
        "rotation": [
          -0.0,
          -90.00000250447816,
          -0.0
        ],
        "shader": "table_top",
        "shape": "box",
        "size": [
          0.16000008583068848,
          0.16000008583068848,
          0.16000008583068848
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.030"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          15.0,
          -0.0
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "floor_room1",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          20.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "room1.floor"
      },
      {
        "mass": 0.0,
        "position": [
          0.0,
          20.100000381469727,
          -10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "main_room.002"
      },
      {
        "mass": 0.0,
        "position": [
          -10.0,
          20.100000381469727,
          -0.0
        ],
        "rotation": [
          90.00000250447816,
          -2.5044782690431654e-06,
          -90.00000250447816
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.012"
      },
      {
        "mass": 0.0,
        "position": [
          10.0,
          20.100000381469727,
          -0.0
        ],
        "rotation": [
          90.00000250447816,
          -2.5044782690431654e-06,
          -90.00000250447816
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          20.0,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.022"
      },
      {
        "parent": "",
        "position": [
          6.5,
          20.100000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          7.019999980926514,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.023"
      },
      {
        "parent": "",
        "position": [
          -6.500000476837158,
          20.100000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          7.019999980926514,
          0.30000001192092896,
          10.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.024"
      },
      {
        "parent": "",
        "position": [
          0.0,
          23.600000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "border",
        "shape": "box",
        "size": [
          6.0,
          0.30000001192092896,
          3.0
        ],
        "texture": "default",
        "type": "border",
        "uuid": "main_room.003"
      },
      {
        "position": [
          0.0,
          20.100000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          19.999998092651367,
          0.30000001192092896,
          9.999999046325684
        ],
        "type": "visual",
        "uuid": "Cube.026"
      },
      {
        "position": [
          0.0,
          18.600000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "exclude_hull",
        "shape": "box",
        "size": [
          6.120000839233398,
          0.9025683403015137,
          6.997915744781494
        ],
        "type": "excludehull",
        "uuid": "Cube.027"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          2.3999998569488525,
          18.899999618530273,
          10.224534034729004
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "room1.door_l"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          -2.3999998569488525,
          18.899999618530273,
          10.224534034729004
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "room1.door_r"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "position": [
          -3.999999761581421,
          16.363746643066406,
          9.863534927368164
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "button_blue",
        "shape": "box",
        "size": [
          0.29910963773727417,
          0.29910963773727417,
          0.14000001549720764
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.080"
      },
      {
        "boundobject": "elevator",
        "buttonid": "elevator_floor1",
        "mass": 0.0,
        "parentbone": "",
        "position": [
          -3.999999523162842,
          16.363746643066406,
          9.863533973693848
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          0.20000001788139343,
          0.20000001788139343,
          0.20000001788139343
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.081"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          3.0,
          18.600000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -0.0
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          0.30000001192092896,
          0.2849999964237213,
          7.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.082"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          -3.0,
          18.600000381469727,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          0.30000001192092896,
          0.2849999964237213,
          7.0
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.086"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          22.0,
          10.0
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "frame",
        "shape": "box",
        "size": [
          6.300000190734863,
          0.2849999964237213,
          0.30000001192092896
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.084"
      },
      {
        "isconnected": false,
        "mass": 500.0,
        "model": "oldcomputer",
        "opaque": false,
        "parent": null,
        "position": [
          -7.481308460235596,
          15.08932113647461,
          -5.504195213317871
        ],
        "rotation": [
          -0.0,
          -89.98021544645265,
          -0.0
        ],
        "size": [
          1.68760347366333,
          1.68760347366333,
          1.68760347366333
        ],
        "syncdirection": true,
        "texture": "default",
        "type": "sync-import",
        "uuid": "Cube.092"
      },
      {
        "mass": 200.0,
        "parent": "Cube.092",
        "position": [
          -6.625993251800537,
          16.203105926513672,
          -5.112178802490234
        ],
        "rotation": [
          -90.00002299504568,
          -7.470482692434658,
          89.999995674289
        ],
        "size": [
          1.0681242942810059,
          0.0,
          0.6980003714561462
        ],
        "source": "./pages/threejs.html",
        "syncdirection": true,
        "type": "planeFrame",
        "uuid": "Plane.009"
      },
      {
        "boundobject": "Cube.092",
        "buttonid": "oldcomputer_button",
        "mass": 0.0,
        "parent": "Cube.092",
        "parentbone": "",
        "position": [
          -6.970798015594482,
          15.26098918914795,
          -6.107974052429199
        ],
        "rotation": [
          -0.0,
          -90.00000250447816,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          0.16000008583068848,
          0.16000008583068848,
          0.16000008583068848
        ],
        "texture": "elevator_floor",
        "type": "button",
        "uuid": "Cube.090"
      },
      {
        "isconnected": false,
        "mass": 500.0,
        "model": "oldcomputer",
        "opaque": false,
        "parent": null,
        "position": [
          5.095842361450195,
          15.08932113647461,
          -7.864468574523926
        ],
        "rotation": [
          180.00000500895632,
          1.8669333656778835e-05,
          -180.00000500895632
        ],
        "size": [
          1.68760347366333,
          1.68760347366333,
          1.68760347366333
        ],
        "syncdirection": true,
        "texture": "default",
        "type": "sync-import",
        "uuid": "Cube.097"
      },
      {
        "mass": 200.0,
        "parent": "Cube.097",
        "position": [
          4.703825950622559,
          16.203105926513672,
          -7.009153366088867
        ],
        "rotation": [
          -97.4704809280446,
          2.4634392412105548e-05,
          -1.6255707703211737e-05
        ],
        "size": [
          1.0681242942810059,
          0.0,
          0.6980003714561462
        ],
        "source": "./pages/finalproject.html",
        "syncdirection": true,
        "type": "planeFrame",
        "uuid": "Plane.011"
      },
      {
        "boundobject": "Cube.097",
        "buttonid": "oldcomputer_button",
        "mass": 10.0,
        "parent": "Cube.097",
        "parentbone": "",
        "position": [
          5.699621200561523,
          15.26098918914795,
          -7.353957653045654
        ],
        "rotation": [
          180.00000500895632,
          1.8669333656778835e-05,
          -180.00000500895632
        ],
        "shader": "table_top",
        "shape": "box",
        "size": [
          0.16000008583068848,
          0.16000008583068848,
          0.16000008583068848
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.094"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "",
        "position": [
          0.0,
          0.0,
          15.357850074768066
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "elevator_floor",
        "shape": "box",
        "size": [
          10.0,
          0.15000000596046448,
          10.0
        ],
        "syncdirection": false,
        "texture": "elevator_floor",
        "type": "sync-default",
        "uuid": "elevator"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          4.999999523162842,
          4.900000095367432,
          15.307849884033203
        ],
        "rotation": [
          0.0,
          -0.0,
          -89.999995674289
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          9.999999046325684,
          0.15014998614788055,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.015"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          -4.999999523162842,
          4.900000095367432,
          15.307849884033203
        ],
        "rotation": [
          0.0,
          -0.0,
          -89.999995674289
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          9.999999046325684,
          0.15014998614788055,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.016"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          0.0,
          4.900000095367432,
          20.307849884033203
        ],
        "rotation": [
          -90.00000250447816,
          90.00000250447816,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          9.999999046325684,
          0.15014998614788055,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.017"
      },
      {
        "parent": "elevator",
        "position": [
          0.0,
          8.399999618530273,
          10.381850242614746
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          5.999999523162842,
          0.14999999105930328,
          2.999999761581421
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.018"
      },
      {
        "parent": "elevator",
        "position": [
          3.9999992847442627,
          4.899999618530273,
          10.381850242614746
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          2.001542329788208,
          0.14999999105930328,
          9.999999046325684
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.019"
      },
      {
        "parent": "elevator",
        "position": [
          -4.0,
          4.899999618530273,
          10.381850242614746
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          1.9999998807907104,
          0.14999999105930328,
          9.999999046325684
        ],
        "texture": "default",
        "type": "border",
        "uuid": "Cube.020"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          0.0,
          9.899999618530273,
          15.357850074768066
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          9.999999046325684,
          0.14999999105930328,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.021"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          -2.3999998569488525,
          3.8999993801116943,
          10.457850456237793
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "elevator.door_r"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          2.3999998569488525,
          3.8999993801116943,
          10.457850456237793
        ],
        "rotation": [
          90.00000250447816,
          -0.0,
          -180.00000500895632
        ],
        "shader": "elevator_door",
        "shape": "box",
        "size": [
          4.799999713897705,
          0.14999999105930328,
          7.699999809265137
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "elevator.door_l"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          -4.0,
          4.899999618530273,
          10.581850051879883
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          1.9999998807907104,
          0.14999999105930328,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.002"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          3.9999992847442627,
          4.899999618530273,
          10.5818510055542
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          2.001542329788208,
          0.14999999105930328,
          9.999999046325684
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.028"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          0.0,
          8.399999618530273,
          10.581850051879883
        ],
        "rotation": [
          89.999995674289,
          -0.0,
          -0.0
        ],
        "shader": "elevator_wall",
        "shape": "box",
        "size": [
          5.999999523162842,
          0.14999999105930328,
          2.999999761581421
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.031"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          -3.999999761581421,
          1.063745379447937,
          10.68185043334961
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "button_blue",
        "shape": "box",
        "size": [
          0.29910963773727417,
          0.29910963773727417,
          0.14000001549720764
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.032"
      },
      {
        "boundobject": "elevator",
        "buttonid": "elevator_floor1",
        "mass": 0.0,
        "parent": "elevator",
        "parentbone": "",
        "position": [
          -3.999999523162842,
          1.0637452602386475,
          10.68185043334961
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          0.20000001788139343,
          0.20000001788139343,
          0.20000001788139343
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.033"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          4.000000476837158,
          1.063745379447937,
          10.68185043334961
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "button_green",
        "shape": "box",
        "size": [
          0.29910963773727417,
          0.29910963773727417,
          0.14000001549720764
        ],
        "syncdirection": false,
        "texture": "default",
        "type": "sync-default",
        "uuid": "Cube.034"
      },
      {
        "boundobject": "elevator",
        "buttonid": "elevator_base",
        "mass": 0.0,
        "parent": "elevator",
        "parentbone": "",
        "position": [
          4.000000476837158,
          1.0637452602386475,
          10.68185043334961
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "wall",
        "shape": "box",
        "size": [
          0.20000001788139343,
          0.20000001788139343,
          0.20000001788139343
        ],
        "texture": "default",
        "type": "button",
        "uuid": "Cube.035"
      },
      {
        "isconnected": false,
        "mass": 0.0,
        "opaque": false,
        "parent": "elevator",
        "position": [
          0.0,
          -2.0,
          15.357850074768066
        ],
        "rotation": [
          0.0,
          -0.0,
          -0.0
        ],
        "shader": "elevator_floor",
        "shape": "box",
        "size": [
          10.0,
          4.114638805389404,
          10.0
        ],
        "syncdirection": false,
        "texture": "elevator_floor",
        "type": "sync-default",
        "uuid": "elevator_base"
      }
    ]
  },
};

export { TestGame };
