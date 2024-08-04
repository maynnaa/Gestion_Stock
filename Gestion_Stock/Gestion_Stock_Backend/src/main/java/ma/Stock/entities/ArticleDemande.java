package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ArticleDemande")
public class ArticleDemande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_artice_demande;

    @ManyToOne
    @JoinColumn(name = "id_demande")
    private DemandeAchat demandeAchat;

    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;

    @Column(name = "quantite")
    private int quantite;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;


}
