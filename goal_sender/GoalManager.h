#include <list>
#include "Goal.h"

class GoalManager
{
  public:
    GoalManager();
    ~GoalManager();
    bool AddGoal(float x, float y);
    bool GetNextGoal(Goal& g);
    int GetGoalCount();
    
  private:
    std::list<Goal*> goals;
};
