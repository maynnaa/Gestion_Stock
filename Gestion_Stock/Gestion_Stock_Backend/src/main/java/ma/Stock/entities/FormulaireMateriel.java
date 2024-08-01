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
    private Integer id;

    @ManyToOne
    @MapsId("idFormulaire")
    @JoinColumn(name = "id_formulaire")
    private FormulaireBesoins formulaireBesoins;

    @ManyToOne
    @MapsId("idMateriel")
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;

    @Column(name = "quantite")
    private int quantite;



}
