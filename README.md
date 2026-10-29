# OPTIK

Site conceptuel pour OPTIK, un atelier indépendant d'optique fictif imaginé pour le portfolio de Lymo. Le projet est volontairement autonome : HTML, CSS et JavaScript natifs, sans dépendance de build ni service backend.

## Lancer le site

Depuis ce dossier, avec Python installé :

```powershell
py -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`. Il est également possible d'ouvrir `index.html` directement ou d'utiliser l'extension Live Server de VS Code.

## Fonctionnalités

- Catalogue de six montures conceptuelles, dessinées en SVG (le coloris choisi change réellement le dessin), avec filtres, recherche et tri.
- Fiches détaillées avec choix de coloris, favoris enregistrés localement et panier de démonstration avec quantités et total.
- Formulaire de prise de rendez-vous avec validation native, date minimale et confirmation locale.
- Navigation adaptée au mobile, éléments accessibles au clavier, prise en compte de `prefers-reduced-motion` et remplacement visuel des images indisponibles.

## Configuration et limites

Les montures, prix, adresse et horaires sont fictifs. Aucun panier, paiement ou rendez-vous n'est transmis à un commerce réel. Les visuels sont générés en SVG par `app.js` : aucune image externe. Seules les polices (Archivo, Instrument Sans) viennent de Google Fonts ; sans connexion, des polices de secours s'affichent. Aucun service externe ni configuration de paiement n'est installé.

Il n'y a pas d'étape de build ou de commande de test à exécuter pour ce site statique.
