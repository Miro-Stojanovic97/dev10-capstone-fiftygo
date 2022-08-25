package fiftygo.controllers;

import fiftygo.domain.CityService;
import fiftygo.models.City;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/state_{stateAbr}")
    public List<City> findByStateAbr(@PathVariable String stateAbr) {
        return service.findByStateAbr(stateAbr);
    }

    @GetMapping("/{pinId}")
    public City findById(@PathVariable int cityId) {
        return service.findById(cityId);
    }
}
