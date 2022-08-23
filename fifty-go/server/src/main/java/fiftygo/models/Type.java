package fiftygo.models;

import javax.validation.constraints.NotBlank;
import java.util.Objects;

public class Type {

    private int typeId;
    @NotBlank(message = "A name is required.")
    private String typeName;

    private Pin pin;

    public Type(int typeId, String typeName) {
        this.typeId = typeId;
        this.typeName = typeName;
    }

    public Type() {

    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Type type = (Type) o;
        return  typeId == type.typeId &&
                typeName.equalsIgnoreCase(type.typeName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(typeId, typeName);
    }
}
