package fiftygo.models;

import java.time.LocalDate;

public class Activity {

    private int activityId;
    private String activityDescription;
    private LocalDate activityDate;
    private int activityPriority;
    private boolean activityDidIt;
    private int userId;

    public Activity(int activityId, String activityDescription, LocalDate activityDate, int activityPriority, boolean activityDidIt, int userId) {
        this.activityId = activityId;
        this.activityDescription = activityDescription;
        this.activityDate = activityDate;
        this.activityPriority = activityPriority;
        this.activityDidIt = activityDidIt;
        this.userId = userId;
    }

    public int getActivityId() {
        return activityId;
    }

    public void setActivityId(int activityId) {
        this.activityId = activityId;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public int getActivityPriority() {
        return activityPriority;
    }

    public void setActivityPriority(int activityPriority) {
        this.activityPriority = activityPriority;
    }

    public boolean isActivityDidIt() {
        return activityDidIt;
    }

    public void setActivityDidIt(boolean activityDidIt) {
        this.activityDidIt = activityDidIt;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
