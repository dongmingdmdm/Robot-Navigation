/* goal_sender.cpp
 * Description: this file implements the goal_sender node.
 *    Subscriptions:
 *       goal_sender subscribes to topic "unh_goal" (published by web server).
 *    Publications:
 *       goal_sender publishes topic "move_base_simple/goal" (to the move_base node).
 *    About:
 *       goal_sender first waits for a geometry_msgs/Point message (over the
 *       "unh_goal" topic) and then sends the goal to the move_base node
 *       using a SimpleActionClient. The web server obtains the current position
 *       of the robot using the node tf_odom_to_frame (in tf_odom_to_frame.cpp).
 *
 * Authors: Bryan Custer, Zach Piispanen, Jeremy Smith
 * Created: 3/1/2013
 */

#include <ros/ros.h>
#include <move_base_msgs/MoveBaseAction.h>
#include <actionlib/client/simple_action_client.h>
#include "geometry_msgs/Point.h"
#include "GoalManager.h"

#define NUM_POINTS 6

typedef actionlib::SimpleActionClient<move_base_msgs::MoveBaseAction> MoveBaseClient;

MoveBaseClient * ac_ptr = NULL;

move_base_msgs::MoveBaseGoal goal;
GoalManager * manager = NULL;

/**ACTION CLIENT callback method area
*
*
*
*/
void doneCb(const actionlib::SimpleClientGoalState& state,
            const move_base_msgs::MoveBaseActionResultConstPtr& result)
{
  ROS_INFO("Finished in state [%s]", state.toString().c_str());
}

// Called once when the goal becomes active
void activeCb()
{
  ROS_INFO("Goal just went active");
}

// Called every time feedback is received for the goal
void feedbackCb(const move_base_msgs::MoveBaseActionFeedbackConstPtr& feedback)
{
  ROS_INFO("Got Feedback");
}

/********************************************************************
 * unh_goal_node subscribes to topic "unh_goal" and this callback is
 * called whenever the topic is being published on. A point is sent
 * to the callback via a geometry_msgs::Point message, and this point
 * used by the SimpleActionClient to send a goal the SimpleActionServer.
 */
void unh_goal_callBack( const geometry_msgs::Point::ConstPtr& msg )
{
    ROS_INFO( "unh_goal_callBack: \n\tx: %f\n\ty: %f\n\tz: %f",
              msg->x, msg->y, msg->z );

    goal.target_pose.header.frame_id = "map";
    goal.target_pose.header.stamp = ros::Time::now();

    goal.target_pose.pose.position.x = msg->x;
    goal.target_pose.pose.position.y = msg->y;
    // arbitrary orientation for now
    goal.target_pose.pose.orientation.x = 0.0;
    goal.target_pose.pose.orientation.y = 0.0;
    goal.target_pose.pose.orientation.z = 0.8;
    goal.target_pose.pose.orientation.w = -0.6;

    manager->AddGoal(msg->x, msg->y);
    ROS_INFO("There are %i goals in the manager", manager->GetGoalCount());
    ROS_INFO("Sending goal (%f, %f)", goal.target_pose.pose.position.x, goal.target_pose.pose.position.y);
    ac_ptr->sendGoal(goal);
}

/********************************************************************
 * Initializes the move_base Action Client (SimpleActionClient),
 * waits for the SimpleActionServer to come up, subscribes to the
 * "unh_goal" topic, and then spins to wait for geometry_msgs::Point
 * messages.
 */
int main(int argc, char** argv){
  ros::init(argc, argv, "goal_sender");
  
  manager = new GoalManager();
  
  ROS_INFO( "Initializing the move_base Action Client..." );
  //tell the action client that we want to spin a thread by default
  MoveBaseClient ac("move_base", true);
  ac_ptr = &ac;
 
  //wait for the action server to come up
  while(!ac.waitForServer(ros::Duration(5.0))){
    ROS_INFO("Waiting for the move_base action server to come up");
  }
 
  // subscribe to "unh_goal" which is published on by the web server
  ROS_INFO( "subscribing to the unh_goal topic" );
  ros::NodeHandle unh_goal_node;
  ros::Subscriber unh_goal_sub = unh_goal_node.subscribe( "unh_robotic/goal", 1000, unh_goal_callBack );
 
  // wait and listen for messages
  ROS_INFO( "ros::spin()..." );
  ros::spin();
  
  delete manager;
  
  return 0;
}
