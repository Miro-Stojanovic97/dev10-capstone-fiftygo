package fiftygo.controllers;

import fiftygo.domain.PinService;
import fiftygo.domain.Result;
import fiftygo.models.Pin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin//(origins = {"http://localhost:3000"})
@RequestMapping("/fiftygo/pin")
public class PinController {

    private final PinService service;

    public PinController(PinService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pin> findAll() {
        return service.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Pin> findByUserId(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/{pinId}")
    public Pin findById(@PathVariable int pinId) {
        return service.findById(pinId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Pin pin) {
        Result<Pin> result = service.add(pin);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{pinId}")
    public ResponseEntity<Object> update(@PathVariable int pinId, @RequestBody Pin pin) {
        if (pinId != pin.getPinId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Pin> result = service.update(pin);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{pinId}")
    public ResponseEntity<Void> deleteById(@PathVariable int pinId) {
        if (service.deleteById(pinId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
