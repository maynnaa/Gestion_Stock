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
    private String type="Demande de besoins";
    private String is_seen;


    @ManyToOne
    @JoinColumn(name = "id_formulaire")
    private FormulaireBesoins formulaireBesoins;

    @ManyToOne
    @JoinColumn(name = "id_personnel")
    private Personnel personnel;
}
