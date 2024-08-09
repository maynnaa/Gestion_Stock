package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_notification;
    private String type;
    private boolean isSeen;


    @ManyToOne
    @JoinColumn(name = "id_formulaire")
    private FormulaireBesoins formulaireBesoins;

    @ManyToOne
    @JoinColumn(name = "id_personnel")
    private Personnel personnel;
}
