const rosnodejs = require("rosnodejs");
const Quaternion = require("quaternion");
const UrMsgs = rosnodejs.require("ur_msgs");
const geometryMsgs = rosnodejs.require("geometry_msgs");
const sensorMsgs = rosnodejs.require("sensor_msgs");
const stdMsgs = rosnodejs.require("std_msgs");
const URStateData = require("../ur-state-receiver");

// Joint position vector
var jointState = new sensorMsgs.msg.JointState();

// Cartesian position msg
var currentCartPose = new geometryMsgs.msg.Pose();

// I/O msg
var IOmsg = new UrMsgs.msg.IOStates();
const digIOMask = [1, 2, 4, 8, 16, 32, 64, 128];

// Robot modes
const robotModes = [
  "ROBOT_MODE_DISCONNECTED",
  "ROBOT_MODE_CONFIRM_SAFETY",
  "ROBOT_MODE_BOOTING",
  "ROBOT_MODE_POWER_OFF",
  "ROBOT_MODE_POWER_ON",
  "ROBOT_MODE_IDLE",
  "ROBOT_MODE_BACKDRIVE",
  "ROBOT_MODE_RUNNING",
  "ROBOT_MODE_UPDATING_FIRMWARE"
];
var robotMode = new stdMsgs.msg.String();

// safety modes
const safetyModes = [
  "SAFETY_MODE_NORMAL",
  "SAFETY_MODE_REDUCED",
  "SAFETY_MODE_PROTECTIVE_STOP",
  "SAFETY_MODE_RECOVERY",
  "SAFETY_MODE_SAFEGUARD_STOP",
  "SAFETY_MODE_SYSTEM_EMERGENCY_STOP",
  "SAFETY_MODE_ROBOT_EMERGENCY_STOP",
  "SAFETY_MODE_VIOLATION",
  "SAFETY_MODE_FAULT"
];
var safetyMode = new stdMsgs.msg.String();

// Convert RPY to Quaternion
function RPYToQuaternion(Rx, Ry, Rz) {
  // var quat = mat3d.Quaternion.Euler(Rx, Ry, Rz)
  var quat = Quaternion.fromEuler(Rz, Rx, Ry);
  return quat;
}

// nit ROS node
rosnodejs.initNode("/ur5_state_server", { onTheFly: true }).then(nh => {
  const jointStatePublisher = nh.advertise(
    "/joint_states",
    "sensor_msgs/JointState"
  );
  const cartPosePublisher = nh.advertise(
    "robot_state/CartPose",
    "geometry_msgs/Pose"
  );
  const IOPublisher = nh.advertise("/robot_state/IOStates", "ur_msgs/IOStates");
  const robotModePublisher = nh.advertise(
    "/robot_state/RobotMode",
    "std_msgs/String"
  );
  const safetyModePublisher = nh.advertise(
    "/robot_state/SafetyMode",
    "std_msgs/String"
  );
  setInterval(() => {
    jointStatePublisher.publish(jointState);

    cartPosePublisher.publish(currentCartPose);
    IOPublisher.publish(IOmsg);
    robotModePublisher.publish(robotMode);
    safetyModePublisher.publish(safetyMode);
  }, 8);
  var robotIp;
  var robotPort;
  nh.getParam("/bin_picking_gui/robot_ip").then(val => {
    robotIp = val;
    nh.getParam("/bin_picking_gui/robot_port")
      .then(val => {
        robotPort = val;
      })
      .then(function() {
        const urStateDataIns = new URStateData(robotPort, robotIp);
        console.log("connected to ip %s, port %s", robotIp, robotPort);
        return urStateDataIns;
      })
      .then(urStateDataIns => {
        urStateDataIns.on("data", function(data) {
          // Joint state
          jointState.header.stamp = rosnodejs.Time.now();
          jointState.name[0] = "shoulder_pan_joint";
          jointState.name[1] = "shoulder_lift_joint";
          jointState.name[2] = "elbow_joint";
          jointState.name[3] = "wrist_1_joint";
          jointState.name[4] = "wrist_2_joint";
          jointState.name[5] = "wrist_3_joint";
          jointState.position[0] = data.actJ1pos;
          jointState.position[1] = data.actJ2pos;
          jointState.position[2] = data.actJ3pos;
          jointState.position[3] = data.actJ4pos;
          jointState.position[4] = data.actJ5pos;
          jointState.position[5] = data.actJ6pos;
          // Cartesian position
          currentCartPose.position.x = data.actXXpos;
          currentCartPose.position.y = data.actYYpos;
          currentCartPose.position.z = data.actZZpos;
          var orientationInQuaternion = RPYToQuaternion(
            data.actRXpos,
            data.actRYpos,
            data.actRZpos
          );
          currentCartPose.orientation.w = orientationInQuaternion.w;
          currentCartPose.orientation.x = orientationInQuaternion.x;
          currentCartPose.orientation.y = orientationInQuaternion.y;
          currentCartPose.orientation.z = orientationInQuaternion.z;
          // Digital inputs
          for (let i = 0; i < digIOMask.length; i++) {
            let Digital = new UrMsgs.msg.Digital();
            Digital.pin = i;
            Digital.state = data.digInput & digIOMask[i];
            IOmsg.digital_in_states[i] = Digital;
          }
          // Digital outputs
          for (let i = 0; i < digIOMask.length; i++) {
            let Digital = new UrMsgs.msg.Digital();
            Digital.pin = i;
            Digital.state = data.digOutput & digIOMask[i];
            IOmsg.digital_out_states[i] = Digital;
          }
          // Robot mode
          robotMode.data = robotModes[data.robotMode];
          // Safety mode
          safetyMode.data = safetyModes[data.safetyMode - 1];
        });
      });
  });
});
