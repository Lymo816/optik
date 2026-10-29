# OPTIK

Site conceptuel pour OPTIK, un atelier indépendant d'optique fictif imaginé pour le portfolio de Lymo. Le projet utilise Next.js avec l'App Router, React et des styles CSS natifs.

## Lancer le site

Depuis ce dossier :

```powershell
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Fonctionnalités

- Catalogue de six montures avec photos, filtres, recherche et tri.
- Fiches détaillées avec choix de coloris, favoris enregistrés localement et panier de démonstration avec quantités et total.
- Formulaire de prise de rendez-vous avec validation des jours ouvrés et confirmation locale.
- Navigation adaptée au mobile, éléments accessibles au clavier, prise en compte de `prefers-reduced-motion` et favicon SVG.

## Configuration et limites

Les montures, prix, adresse et horaires sont fictifs. Aucun panier, paiement ou rendez-vous n'est transmis à un commerce réel. Les images des produits se trouvent dans `public/images/`; les vues détaillées sont générées en SVG par `app/page.js`. Les polices Archivo et Instrument Sans viennent de Google Fonts ; sans connexion, des polices de secours s'affichent.

Commandes disponibles : `npm run dev`, `npm run build` et `npm run start`.
