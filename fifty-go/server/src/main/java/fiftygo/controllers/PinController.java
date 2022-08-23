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
@RequestMapping("/api/pin")
public class PinController {

    private final PinService service;

    public PinController(PinService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pin> findAll() {
        return service.findAll();
    }

    @GetMapping("/{userId}")
    public List<Pin> findByUserId(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/pin-{pinId}")
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
}
