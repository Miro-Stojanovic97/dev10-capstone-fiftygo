package fiftygo.models;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Objects;

public class City {

    @Min(value = 1, message = "City ID must be set. Please review city data source material.")
    private int cityId;

    @NotBlank(message = "City name is required.")
    private String cityName;

    @NotBlank(message = "City's State abbreviation is required.")
    private String stateAbr;

    @NotBlank(message = "City's State name is required.")
    private String stateName;

    @NotNull(message = "City's latitude is required.")
    @Max(value = 180, message = "Latitude cannot be greater than 90")
    @Min(value = -180, message = "Latitude cannot be less than -90.")
    private BigDecimal latitude;

    @NotNull(message = "City's longitude is required.")
    @Max(value = 180, message = "Longitude cannot be greater than 181")
    @Min(value = -180, message = "Longitude cannot be less than -180.")
    private BigDecimal longitude;

    public City() {
    }

    public City(int cityId, String cityName, String stateAbr, String stateName, BigDecimal latitude, BigDecimal longitude) {
        this.cityId = cityId;
        this.cityName = cityName;
        this.stateAbr = stateAbr;
        this.stateName = stateName;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getCityId() {
        return cityId;
    }

    public void setCityId(int cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStateAbr() {
        return stateAbr;
    }

    public void setStateAbr(String stateAbr) {
        this.stateAbr = stateAbr;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return  cityId == city.cityId &&
                cityName.equalsIgnoreCase(city.cityName) &&
                stateAbr.equalsIgnoreCase(city.stateAbr) &&
                stateName.equalsIgnoreCase(city.stateName) &&
                latitude.equals(city.latitude) &&
                longitude.equals(city.longitude);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cityId, cityName, stateAbr, stateName, latitude, longitude);
    }
}
