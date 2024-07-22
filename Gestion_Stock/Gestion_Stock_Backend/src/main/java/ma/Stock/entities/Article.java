package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "Article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_article;
    private int quantite;


    @OneToOne(mappedBy = "article")
    private Produit_Stocke produitStocke;

    @ManyToOne
    @JoinColumn(name = "id_personne")
    private Personnel personnel;

    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel materiel;



}
