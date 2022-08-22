package fiftygo.data;

import fiftygo.models.Type;

import java.util.List;

public class TypeJdbcTemplateRepository implements TypeRepository{


    @Override
    public List<Type> findAll() {
        return null;
    }

    @Override
    public Type findById(int typeId) {
        return null;
    }

    @Override
    public Type add(Type type) {
        return null;
    }

    @Override
    public boolean update(Type type) {
        return false;
    }

    @Override
    public boolean deleteById(int typeId) {
        return false;
    }
}
