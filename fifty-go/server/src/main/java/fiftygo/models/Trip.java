package fiftygo.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class Trip {

    private int tripId;
    @NotBlank(message = "A description is required.")
    private String tripDescription;
    private LocalDate tripStartDate;
    private LocalDate tripEndDate;
    private String transportation;
    @NotNull(message = "Please prioritize your Trip.")
    @Min(value = 1, message = "Priority must be between 1 and 5.")
    @Max(value = 5, message = "Priority must be between 1 and 5.")
    private int tripPriority;
    @NotNull(message = "Please mark if this trip is completed or not.")
    private boolean tripDidIt;
    private int appUserId;
    //private Type type;

    private List<Pin> pins;

    public Trip() {

    }

    public Trip(int tripId, String tripDescription, LocalDate tripStartDate, LocalDate tripEndDate, String transportation, int tripPriority, boolean tripDidIt, List<Pin> pins, int appUserId) {
        this.tripId = tripId;
        this.tripDescription = tripDescription;
        this.tripStartDate = tripStartDate;
        this.tripEndDate = tripEndDate;
        this.transportation = transportation;
        this.tripPriority = tripPriority;
        this.tripDidIt = tripDidIt;
        this.pins = pins;
        this.appUserId = appUserId;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getTripDescription() {
        return tripDescription;
    }

    public void setTripDescription(String tripDescription) {
        this.tripDescription = tripDescription;
    }

    public LocalDate getTripStartDate() {
        return tripStartDate;
    }

    public void setTripStartDate(LocalDate tripStartDate) {
        this.tripStartDate = tripStartDate;
    }

    public LocalDate getTripEndDate() {
        return tripEndDate;
    }

    public void setTripEndDate(LocalDate tripEndDate) {
        this.tripEndDate = tripEndDate;
    }

    public String getTransportation() {
        return transportation;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }

    public int getTripPriority() {
        return tripPriority;
    }

    public void setTripPriority(int tripPriority) {
        this.tripPriority = tripPriority;
    }

    public boolean isTripDidIt() {
        return tripDidIt;
    }

    public void setTripDidIt(boolean tripDidIt) {
        this.tripDidIt = tripDidIt;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

//    public Type getType() {
//        return type;
//    }
//
//    public void setType(Type type) {
//        this.type = type;
//    }

    public List<Pin> getPins() {
        return pins;
    }

    public void setPins(List<Pin> pins) {
        this.pins = pins;
    }

    public boolean equals(Object o) {
        if (this ==o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Trip trip = (Trip) o;

        if (pins != null) {
            return tripId == trip.tripId &&
                    tripDescription.equalsIgnoreCase(trip.tripDescription) &&
                    tripStartDate.equals(trip.tripStartDate) &&
                    tripEndDate.equals(trip.tripEndDate) &&
                    transportation.equalsIgnoreCase(trip.transportation) &&
                    tripPriority == trip.tripPriority &&
                    tripDidIt == trip.tripDidIt &&
                    pins.equals(trip.pins);
        }
        return tripId == trip.tripId &&
                tripDescription.equalsIgnoreCase(trip.tripDescription) &&
                tripStartDate.equals(trip.tripStartDate) &&
                tripEndDate.equals(trip.tripEndDate) &&
                transportation.equalsIgnoreCase(trip.transportation) &&
                tripPriority == trip.tripPriority &&
                tripDidIt == trip.tripDidIt;

    }

    @Override
    public int hashCode() {
        return Objects.hash(tripId, tripDescription, tripStartDate, tripEndDate, transportation, tripPriority, tripDidIt, appUserId);
    }
}
