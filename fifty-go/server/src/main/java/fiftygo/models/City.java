package fiftygo.models;

import java.math.BigDecimal;
import java.util.Objects;

public class City {

    private int cityId;
    private String cityName;
    private String stateAbr;
    private String stateName;
    private BigDecimal latitude;
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
