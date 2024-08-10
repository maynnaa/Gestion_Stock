package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "Entite")
public class Entite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id_entite ;
    private String libelle;
    private int entite_parent_id;

    @ManyToOne
    @JoinColumn(name = "id_type")
    private Type_Entite typeEntite;


}
