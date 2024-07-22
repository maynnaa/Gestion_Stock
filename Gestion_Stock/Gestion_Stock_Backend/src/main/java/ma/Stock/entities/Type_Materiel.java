package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "Type_Materiel")
public class Type_Materiel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int type_materiel_id;
    private String libelle;

}
