var ros = require('rosnodejs/lib/ros');
var messages = require('rosnodejs/lib/messages')
/*ros.types([
     'geometry_msgs/Quaternion'
   ], function(Quaternion) {
     var node = ros.node('talker');
     node.topics([
       { topic: 'test_topic', messageType: Quaternion }
     ], function(publishExample) {
        messages.getMessage('geometry_msgs/Quaternion', function(error, Message) {
        var message = new Message({x:1.0,y:2.0,z:3.0,w:4.0});
        console.log(message);
        publishExample.publish(message);
        });
     });
   });
   */
ros.types([
     'geometry_msgs/PoseWithCovarianceStamped'
   ], function(pose) {
     var node = ros.node('listener');
     node.topics([
       { topic: 'amcl_pose', messageType: pose }
     ], function(subscribeExample) {
        subscribeExample.subscribe( function(message) {
          console.log(message);
        });
     });
   });
