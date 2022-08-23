package fiftygo.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;

public class Trip {

    private int tripId;
    @NotBlank(message = "A description is required.")
    private String tripDescription;
    @NotNull(message = "Please enter a start date.")
    private LocalDate tripStartDate;
    @NotNull(message = "Please enter an end date.")
    private LocalDate tripEndDate;
    private String transportation;
    @NotNull(message = "Please prioritize your Trip.")
    @Min(value = 1, message = "Priority must be between 1 and 5.")
    @Max(value = 5, message = "Priority must be between 1 and 5.")
    private int tripPriority;
    @NotNull(message = "Please mark if this trip is completed or not.")
    private boolean tripDidIt;
    private int userId;
    @NotNull(message = "City is required.")
    private City city;
    private Type type;
    private Pin pin;

    public Trip() {

    }

    public Trip(int tripId, String tripDescription, LocalDate tripStartDate, LocalDate tripEndDate, String transportation, int tripPriority, boolean tripDidIt, int userId, City city, Type type, Pin pin) {
        this.tripId = tripId;
        this.tripDescription = tripDescription;
        this.tripStartDate = tripStartDate;
        this.tripEndDate = tripEndDate;
        this.transportation = transportation;
        this.tripPriority = tripPriority;
        this.tripDidIt = tripDidIt;
        this.userId = userId;
        this.city = city;
        this.type = type;
        this.pin = pin;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Pin getPin() {
        return pin;
    }

    public void setPin(Pin pin) {
        this.pin = pin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Trip)) return false;
        Trip trip = (Trip) o;
        return getTripId() == trip.getTripId() && getTripPriority() == trip.getTripPriority() && isTripDidIt() == trip.isTripDidIt() && getUserId() == trip.getUserId() && Objects.equals(getTripDescription(), trip.getTripDescription()) && getTripStartDate().equals(trip.getTripStartDate()) && getTripEndDate().equals(trip.getTripEndDate()) && Objects.equals(getTransportation(), trip.getTransportation());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTripId(), getTripDescription(), getTripStartDate(), getTripEndDate(), getTransportation(), getTripPriority(), isTripDidIt(), getUserId());
    }
}
