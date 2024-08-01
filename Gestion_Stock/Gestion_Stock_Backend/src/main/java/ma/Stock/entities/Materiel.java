package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor @AllArgsConstructor @Data
@Entity
@Table(name = "Materiel")
public class Materiel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id_materiel;
    private String libelle;
    @ManyToOne
    @JoinColumn(name = "type_materiel_id")
    private Type_Materiel typeMateriel;
    @OneToMany(mappedBy = "materiel")
    private Set<FormulaireMateriel> formulaireMateriels = new HashSet<>();


}
