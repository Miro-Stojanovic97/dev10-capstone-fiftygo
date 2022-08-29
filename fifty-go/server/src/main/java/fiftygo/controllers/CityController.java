package fiftygo.controllers;

import fiftygo.domain.CityService;
import fiftygo.models.City;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
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
    public List<String> findAllStates() {
        List<City> cities = service.findAll();
        List<String> states = new ArrayList<>();
        for (City c : cities) {
            if (!states.contains(c.getStateName())) {
                states.add(c.getStateName());
            }
        }
        return states.stream().sorted(
                Comparator.comparing(n -> n)).collect(Collectors.toList());
    }

    @GetMapping("/state/{stateAbr}")
    public List<City> findByStateAbr(@PathVariable String stateAbr) {
        return service.findByStateAbr(stateAbr);
    }

    @GetMapping("/search/{sequence}")
    public List<City> searchCities(@PathVariable String sequence) {
        return service.searchCities(sequence);
    }

    @GetMapping("/{pinId}")
    public City findById(@PathVariable int cityId) {
        return service.findById(cityId);
    }
}
