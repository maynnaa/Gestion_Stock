package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Demande")
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_demande;
    private Date date_demande;

    @OneToOne(mappedBy = "demande")
    private Statut_demande statutDemande;

    @ManyToOne
    @JoinColumn(name = "id_personne")
    private Personnel personnel;

    @OneToOne(mappedBy = "demande")
    private Historique historique;


}
