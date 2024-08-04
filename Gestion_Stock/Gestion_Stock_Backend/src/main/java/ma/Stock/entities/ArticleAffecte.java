package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ArticleAffecte")
public class ArticleAffecte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_artice_affecte;

    @ManyToOne
    @JoinColumn(name = "id_produit")
    private Produit_Stocke produitStocke;

    @ManyToOne
    @JoinColumn(name = "id_personnel")
    private Personnel personnel;

    @Column(name = "date_livraison_personnel")
    private LocalDate dateLivraisonPersonnel;

    @PrePersist
    protected void onCreate() {
        this.dateLivraisonPersonnel = LocalDate.now();
    }

}
