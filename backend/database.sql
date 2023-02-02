CREATE TABLE N_comptes (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  N_compte INTEGER NOT NULL,
  nom varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO N_comptes(N_compte,nom) VALUES (741,'Salaire');
INSERT INTO N_comptes(N_compte,nom) VALUES (6023,'Alimentation');
INSERT INTO N_comptes(N_compte,nom) VALUES (60611,'Eau');
INSERT INTO N_comptes(N_compte,nom) VALUES (60612,'Electricité');
INSERT INTO N_comptes(N_compte,nom) VALUES (616,'Assurance');
INSERT INTO N_comptes(N_compte,nom) VALUES (6026,'Carburant');
INSERT INTO N_comptes(N_compte,nom) VALUES (110,'Repport du mois dernier');

CREATE TABLE depenses (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nom varchar(255) NOT NULL,
  somme NUMERIC(10,2) NOT NULL,
  facture varchar(255),
  N_comptes_id INTEGER NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO depenses(nom,somme,facture,N_comptes_id) VALUES ('Leclerc',347.52,null,2);
INSERT INTO depenses(nom,somme,facture,N_comptes_id) VALUES ('Veolia',154.57,null,3);
INSERT INTO depenses(nom,somme,facture,N_comptes_id) VALUES ('EDF',90,null,4);
INSERT INTO depenses(nom,somme,facture,N_comptes_id) VALUES ('Essence Clio',61.80,null,6);
INSERT INTO depenses(nom,somme,facture,N_comptes_id) VALUES ('Gazoil Laguna',85.12,null,6);

CREATE TABLE recettes (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nom varchar(255) NOT NULL,
  somme NUMERIC(10,2) NOT NULL,
  N_comptes_id INTEGER NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO recettes(nom,somme,N_comptes_id) VALUES ('Salaire',2456.84,1);
INSERT INTO recettes(nom,somme,N_comptes_id) VALUES ('Repport du mois dernier',156.41,7);
