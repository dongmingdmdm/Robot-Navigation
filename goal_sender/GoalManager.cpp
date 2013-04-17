#include <list>
#include "GoalManager.h"

GoalManager::GoalManager() {
}

GoalManager::~GoalManager() {
  goals.clear();
}

bool GoalManager::AddGoal(float x, float y) {
  goals.push_back(new Goal(x,y));
  return true;
}

Goal* GoalManager::GetNextGoal() {
  return goals.front();
}

int GoalManager::GetGoalCount() {
  return goals.size();
}

void GoalManager::RemoveGoal() {
  goals.pop_front();
}
