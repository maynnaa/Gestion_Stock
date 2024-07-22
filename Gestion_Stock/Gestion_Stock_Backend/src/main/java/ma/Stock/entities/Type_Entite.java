package ma.Stock.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Type_Entite")
public class Type_Entite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_type;
    private String libelle;

}
