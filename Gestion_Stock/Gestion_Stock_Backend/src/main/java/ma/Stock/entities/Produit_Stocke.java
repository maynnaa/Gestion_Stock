package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "Produit_Stocke")
public class Produit_Stocke {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_produit;
    private Double num_serie;
    private Boolean stockable;
    private Boolean perissable;
    private Date date_livraison;
    private Date date_livraison_personnel;
    private String marque;

    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    @OneToOne
    @JoinColumn(name = "id_produit")
    private Article article;
}
