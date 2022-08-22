package fiftygo.models;



import javax.validation.constraints.*;
import java.time.LocalDate;

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
    private int cityId;

    private int typeId;

    @NotNull(message = "userId is required.")
    private int userId;

    public Pin() {
    }

    public Pin(int pinId, String pinDescription, LocalDate pinDate, int pinPriority, boolean pinDidIt, int cityId, int typeId, int userId) {
        this.pinId = pinId;
        this.pinDescription = pinDescription;
        this.pinDate = pinDate;
        this.pinPriority = pinPriority;
        this.pinDidIt = pinDidIt;
        this.cityId = cityId;
        this.typeId = typeId;
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

    public int getCityId() {
        return cityId;
    }

    public void setCityId(int cityId) {
        this.cityId = cityId;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
