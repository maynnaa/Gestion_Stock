package ma.Stock.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "Fournisseur")
public class Fournisseur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fournisseur_id;
    private String cin;
    private String nom;
    private String num_rc;
    private String num_imm;

}
