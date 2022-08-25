package fiftygo.controllers;

import fiftygo.domain.Result;
import fiftygo.domain.ResultType;
import fiftygo.domain.TripService;
import fiftygo.models.Trip;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fiftygo/trip")
public class TripController {

    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }

    @GetMapping
    public List<Trip> findAll() {
        return service.findAll();
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<Trip> findById(@PathVariable int tripId) {
        Trip trip = service.findById(tripId);
        if(trip == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(trip, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public List<Trip> findByUserId(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Trip trip){
        Result<Trip> result = service.add(trip);
        if(!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED); //201
    }

    @PutMapping("/{tripId}")
    public ResponseEntity<?> update(@PathVariable int tripId, @RequestBody Trip trip){
        if(tripId != trip.getTripId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT); //409
        }

        Result<Trip> result = service.update(trip);
        if(!result.isSuccess()){
            if(result.getResultType() == ResultType.NOT_FOUND){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteById(@PathVariable int tripId){
        Result<Trip> result = service.deleteById(tripId);
        if(result.getResultType() == ResultType.NOT_FOUND){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }
}
