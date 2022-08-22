package fiftygo.data;

import fiftygo.models.Pin;

import java.util.List;

public interface PinRepository {

    List<Pin> findAll();

}
