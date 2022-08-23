package fiftygo.domain;

import fiftygo.data.PinRepository;
import fiftygo.models.Pin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PinService {

    private final PinRepository repository;

    public PinService(PinRepository repository) {
        this.repository = repository;
    }

//    public List<Pin> findAll() {
//
//    }
//
//    public List<Pin> findByUserId(int userId) {
//
//    }
//
//    public Pin findById(int pinId) {
//
//    }
//
//    public Result<Pin> add(Pin pin) {
//
//    }
//
//    public Result<Pin> update(Pin pin) {
//
//    }
//
//    public boolean deleteById(int pinId) {
//
//    }


}
