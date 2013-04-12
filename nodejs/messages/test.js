var ros = require('rosnodejs/lib/ros');

ros.types(['std_msgs/String'], function(String) {
  var node = ros.node('talker');
  node.topics([
    { topic: 'test_topic2', messageType: String }
  ], function(publishExample) {
    function test() {
      console.log("publsig");
      var message = new String({ data: 'test' });
      publishExample.publish(message);
      setTimeout(test, 1000);
    }
    test();
  });
});
