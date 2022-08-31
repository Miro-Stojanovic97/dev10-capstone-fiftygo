package fiftygo.controllers;

import fiftygo.domain.CityService;
import fiftygo.models.City;
import fiftygo.models.State;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin//(origins = {"http://localhost:3000"})
@RequestMapping("/fiftygo/city")
public class CityController {

    private final CityService service;

    public CityController(CityService service) {
        this.service = service;
    }

    @GetMapping
    public List<City> findAll() {
        return service.findAll();
    }

    @GetMapping("/states")
    public List<State> findAllStates() {
        List<City> cities = service.findAll();
        List<State> states = new ArrayList<>();
        for (City c : cities) {
            State state = new State(c.getStateAbr(), c.getStateName());
            if (!states.contains(state)) {
                states.add(state);
            }
        }

        return states.stream().sorted(Comparator.comparing(State::getStateName)).collect(Collectors.toList());
    }

    @GetMapping("/state/{stateAbr}")
    public List<City> findByStateAbr(@PathVariable String stateAbr) {
        return service.findByStateAbr(stateAbr);
    }

    @GetMapping("/search/{sequence}")
    public List<City> searchCities(@PathVariable String sequence) {
        return service.searchCities(sequence);
    }

    @GetMapping("/{cityId}")
    public City findById(@PathVariable int cityId) {
        return service.findById(cityId);
    }
}
