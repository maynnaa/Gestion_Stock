package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "FormulaireBesoins_Materiel")
public class FormulaireMateriel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_formulaire")
    private FormulaireBesoins formulaireBesoins;

    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;

    @Column(name = "quantite")
    private int quantite;

    @ManyToOne
    @JoinColumn(name = "id_personne")
    private Personnel personnel;
}
