package fiftygo.models;

import java.time.LocalDate;

public class Pin {

    private int pinId;
    private String pinDescription;
    private LocalDate pinDate;
    private int pinPriority;
    private boolean pinDidIt;
    private int userId;

    public Pin(int pinId, String pinDescription, LocalDate pinDate, int pinPriority, boolean pinDidIt, int userId) {
        this.pinId = pinId;
        this.pinDescription = pinDescription;
        this.pinDate = pinDate;
        this.pinPriority = pinPriority;
        this.pinDidIt = pinDidIt;
        this.userId = userId;
    }

    public int getPinId() {
        return pinId;
    }

    public void setPinId(int pinId) {
        this.pinId = pinId;
    }

    public String getPinDescription() {
        return pinDescription;
    }

    public void setPinDescription(String pinDescription) {
        this.pinDescription = pinDescription;
    }

    public LocalDate getPinDate() {
        return pinDate;
    }

    public void setPinDate(LocalDate pinDate) {
        this.pinDate = pinDate;
    }

    public int getPinPriority() {
        return pinPriority;
    }

    public void setPinPriority(int pinPriority) {
        this.pinPriority = pinPriority;
    }

    public boolean isPinDidIt() {
        return pinDidIt;
    }

    public void setPinDidIt(boolean pinDidIt) {
        this.pinDidIt = pinDidIt;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
