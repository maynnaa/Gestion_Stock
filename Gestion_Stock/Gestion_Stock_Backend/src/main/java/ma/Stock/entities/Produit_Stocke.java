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
@Table(name = "Produit_Stocke")
public class Produit_Stocke {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_produit;
    private String num_serie;
    private Boolean stockable;
    private Boolean perissable;
    @Temporal(TemporalType.DATE)
    private Date date_livraison;
    private String marque;
    private String disponibilite;

    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    @OneToOne
    @JoinColumn(name = "id_produit")
    private ArticleDemande article;
}
