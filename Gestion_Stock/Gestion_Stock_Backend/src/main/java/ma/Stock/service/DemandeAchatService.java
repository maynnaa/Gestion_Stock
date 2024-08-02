package ma.Stock.service;

import ma.Stock.entities.ArticleDemande;

import ma.Stock.entities.DemandeAchat;
import ma.Stock.repository.ArticleRepository;

import ma.Stock.repository.DemandeAchatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeAchatService {
    @Autowired
    private DemandeAchatRepository DemandeAchatRepository;

    public Optional<DemandeAchat> findById(int id) {
        return DemandeAchatRepository.findById(id);
    }

    public DemandeAchat save(DemandeAchat DemandeAchat) {
        return DemandeAchatRepository.save(DemandeAchat);
    }

    public void deleteById(int id) {
        DemandeAchatRepository.deleteById(id);
    }

    public List<DemandeAchat> findAll() {
        return DemandeAchatRepository.findAll();
    }

}
