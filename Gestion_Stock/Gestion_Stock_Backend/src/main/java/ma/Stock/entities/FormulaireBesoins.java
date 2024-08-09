package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "FormulaireBesoins")
public class FormulaireBesoins {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_formulaire;

    @Column(name = "date_creation")

    private LocalDate date_creation ;

    @Column(name = "validation")
    private String validation = "en cours";  // Valeur par défaut

    @ManyToOne
    @JoinColumn(name = "id_personnel")
    private Personnel personnel;
    
    @OneToMany(mappedBy = "formulaireBesoins", cascade = CascadeType.ALL)
    private Set<FormulaireMateriel> formulaireMateriels = new HashSet<>();


    @PrePersist
    protected void onCreate() {

        this.date_creation = LocalDate.now();
        if (validation == null) {
            validation = "en cours";  // Assurer que validation a une valeur
        }
    }
}
