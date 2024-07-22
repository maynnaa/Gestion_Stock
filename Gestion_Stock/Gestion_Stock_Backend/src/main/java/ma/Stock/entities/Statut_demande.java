package ma.Stock.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Statut_demande")
public class Statut_demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_statut;
    private String libelle;
    private Date date_statut;

    @OneToOne
    @JoinColumn(name = "id_demande")
    private Demande demande;
}
