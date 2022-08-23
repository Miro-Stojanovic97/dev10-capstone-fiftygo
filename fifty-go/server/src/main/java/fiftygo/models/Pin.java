package fiftygo.models;



import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Objects;

public class Pin {

    private int pinId;

    @NotBlank(message = "A description is required.")
    private String pinDescription;

    //ok if date is null, they might not know or care which day this happens.
    private LocalDate pinDate;

    @NotNull(message = "Please prioritize your Pin.")
    @Min(value = 1, message = "Priority must be between 1 and 5.")
    @Max(value = 5, message = "Priority must be between 1 and 5.")
    private int pinPriority;

    @NotNull(message = "pinDidIt is required.")
    private boolean pinDidIt;

    @NotNull(message = "City is required.")
    private City city;

    private Type type;

    @NotNull(message = "userId is required.")
    private int userId;

    public Pin() {
    }

    public Pin(int pinId, String pinDescription, LocalDate pinDate, int pinPriority, boolean pinDidIt, City city, Type type, int userId) {
        this.pinId = pinId;
        this.pinDescription = pinDescription;
        this.pinDate = pinDate;
        this.pinPriority = pinPriority;
        this.pinDidIt = pinDidIt;
        this.city = city;
        this.type = type;
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

    public boolean getPinDidIt() {
        return pinDidIt;
    }

    public void setPinDidIt(boolean pinDidIt) {
        this.pinDidIt = pinDidIt;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pin pin = (Pin) o;
        return  pinId == pin.pinId &&
                pinDescription.equalsIgnoreCase(pin.pinDescription) &&
                pinDate.equals(pin.pinDate) &&
                pinPriority == pin.pinPriority &&
                pinDidIt == pin.pinDidIt &&
                type.equals(pin.type) &&
                city.equals(pin.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pinId, pinDescription, pinDate, pinPriority, pinDidIt, type, city);
    }
}
