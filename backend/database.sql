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
INSERT INTO N_comptes(N_compte,nom) VALUES (7083,'Location');
INSERT INTO N_comptes(N_compte,nom) VALUES (6132,'Location');

CREATE TABLE enregistrement (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nom varchar(255) NOT NULL,
  somme NUMERIC(10,2) NOT NULL,
  facture varchar(255),
  N_comptes_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Leclerc',347.52,"assets/images/favicon.png",2, 1);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Veolia',154.57,"assets/images/favicon.png",3,1);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('EDF',90,"assets/images/favicon.png",4,1);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Essence Clio',61.80,"assets/images/favicon.png",6,1);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Gazoil Laguna',85.12,"assets/images/favicon.png",6,1);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Salaire',2456.84,"assets/images/favicon.png",1,2);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Report du mois dernier',156.41,"assets/images/favicon.png",7,2);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Loyer',785,"assets/images/favicon.png",8,2);
INSERT INTO enregistrement(nom,somme,facture,N_comptes_id,type_id) VALUES ('Frais de copropriété',125.60,"assets/images/favicon.png",9,1);

CREATE TABLE types (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nom varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO types(nom) VALUES ('Dépenses');
INSERT INTO types(nom) VALUES ('Recettes');


CREATE TABLE users (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nom varchar(255) NOT NULL,
  hashedPassword varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users(nom,hashedPassword) VALUES ('glemoine@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$AxsgJgdT3M2qxbaF7fcFQA$nIXNQKIWJBtFyfYpQLlLc7DkCBusP6G+GiuuZOddJf4');
