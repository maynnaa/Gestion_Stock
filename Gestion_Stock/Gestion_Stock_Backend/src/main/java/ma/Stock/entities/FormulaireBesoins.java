package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "FormulaireBesoins")
public class FormulaireBesoins {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_formulaire;
    private Date date_creation;
    private String validation;

    @ManyToOne
    @JoinColumn(name = "id_personne")
    private Personnel personnel;

    @OneToOne
    @JoinColumn(name = "id_notification")
    private Notification notification;
}
