package fiftygo.models;

import java.util.Objects;

public class State {

    private String stateAbr;
    private String stateName;

    public State(String stateAbr, String stateName) {
        this.stateAbr = stateAbr;
        this.stateName = stateName;
    }

    public State() {

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        State state = (State) o;
        return stateAbr.equalsIgnoreCase(state.stateAbr) &&
                stateName.equalsIgnoreCase(state.stateName);
    }
    @Override
    public int hashCode() {
        return Objects.hash(stateAbr, stateName);
    }
}
