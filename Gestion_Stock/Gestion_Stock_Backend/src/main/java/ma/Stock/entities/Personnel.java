package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Personnel")
public class Personnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_personnel;
    private String nom_complet ;
    private String ppr;
    private String username;
    private String password;
    private String email;

    @ManyToOne
    @JoinColumn(name = "id_entite")
    private Entite entite;

    @ManyToOne
    @JoinColumn(name = "id_fonction")
    private Fonction fonction;


}
