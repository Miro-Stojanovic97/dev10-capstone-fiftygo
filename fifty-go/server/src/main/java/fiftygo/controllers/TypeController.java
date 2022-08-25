package fiftygo.controllers;

import fiftygo.domain.Result;
import fiftygo.domain.ResultType;
import fiftygo.domain.TypeService;
import fiftygo.models.Type;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fiftygo/type")
public class TypeController {

    private final TypeService service;

    public TypeController(TypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Type> findAll() {
        return service.findAll();
    }

    @GetMapping("/{typeId}")
    public ResponseEntity<Type> findById(@PathVariable int typeId) {
        Type type = service.findById(typeId);
        if(type == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(type, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Type type) {
        Result<Type> result = service.add(type);
        if(!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED); //201
    }

    @PutMapping("/{typeId}")
    public ResponseEntity<?> update(@PathVariable int typeId, @RequestBody Type type) {
        if(typeId != type.getTypeId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); //409
        }

        Result<Type> result = service.update(type);
        if(!result.isSuccess()) {
            if(result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); //400
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }

    @DeleteMapping("/{typeId}")
    public ResponseEntity<Void> deleteById(@PathVariable int typeId) {
        Result<Type> result = service.deleteById(typeId);
        if(result.getResultType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }
}
