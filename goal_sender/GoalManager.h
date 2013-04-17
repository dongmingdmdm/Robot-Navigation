#include <list>
#include "Goal.h"

class GoalManager
{
  public:
    GoalManager();
    ~GoalManager();
    bool AddGoal(float x, float y);
    Goal* GetNextGoal();
    int GetGoalCount();
    void RemoveGoal();
    
  private:
    std::list<Goal*> goals;
};
