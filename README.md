# Boîte à Idées

Application Angular de gestion d'idées permettant de créer, lister et archiver vos idées (cadeaux, projets, posts réseaux sociaux, etc.).

## À propos du projet

Ce projet est le **boss de fin** de la formation EAK (Easy Angular Kit) sur les fondamentaux d'Angular. Il met en pratique l'ensemble des concepts appris au cours de 8 exercices progressifs.

### Parcours d'apprentissage

Ce projet est le résultat d'un parcours d'apprentissage structuré couvrant les fondamentaux d'Angular :

1. **Mon premier composant** - Création et utilisation de composants Angular
2. **Styliser mon composant** - Gestion des styles avec `:host` et CSS scoped
3. **Variabiliser son template** - Interpolation et binding de données
4. **Communication entre composants (1/2)** - Utilisation des `@Input()` | `input<>` pour passer des données
5. **Communication entre composants (2/2)** - Utilisation des `@Output()` | `output<>` pour émettre des événements
6. **Control flow** - Conditions `@if`, boucles `@for`, et directives de contrôle
7. **Mon premier service** - Création de services injectables et gestion d'état
8. **Mon premier formulaire en ReactiveForms** - Création de formulaires réactifs avec validation

## Fonctionnalités

- ✨ **Créer une idée** avec un titre et une description
- 📝 **Lister toutes les idées** avec tri automatique (actives puis archivées)
- 📦 **Archiver les idées** réalisées ou obsolètes
- 🎨 **Interface responsive** avec distinction visuelle des idées archivées

## Technologies utilisées

- **Angular 20.3** - Framework frontend
- **TypeScript** - Langage typé
- **Signals** - Gestion d'état réactive (nouvelle API Angular)
- **Reactive Forms** - Gestion des formulaires avec validation
- **Standalone Components** - Architecture moderne sans NgModules

## Architecture du projet

```
src/app/
├── components/
│   ├── idea-form.ts       # Formulaire de création d'idée
│   └── idea-list.ts       # Liste et affichage des idées
├── models/
│   └── idea.ts            # Interfaces et types (Idea, IdeaStatus, CreateIdeaPayload)
├── services/
│   └── idea-in-memory.ts  # Service de gestion des idées avec Signals
└── app.ts                 # Composant racine
```

### Bonnes pratiques appliquées

#### 🏗️ Architecture
- **Composants Single File Component (SFC)** - Code concis avec template et styles inline
- **Suppression des divs wrappers** - Utilisation de `:host` pour un DOM optimisé
- **Services injectables** - Séparation de la logique métier et de la présentation
- **Signals computed** - Propriétés réactives calculées automatiquement

#### 🎨 Styles
- **Unités rem** - Accessibilité et responsive design
- **Variables CSS** - Thème cohérent et maintenable
- **Styles scopés** - Pas de conflits avec `:host`

#### ⚡ Performance
- **ChangeDetection.OnPush** - Optimisation du cycle de détection
- **Signals** - Réactivité fine et performante
- **Computed values** - Calculs mis en cache automatiquement

## Installation

### Prérequis
- Node.js (v18+)
- npm ou pnpm

### Étapes

```bash
# Cloner le repository
git clone <url-du-repo>

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:4200/`

## Scripts disponibles

```bash
npm start          # Lance le serveur de développement
npm run build      # Build de production
npm run watch      # Build en mode watch
npm test           # Lance les tests unitaires
```

## Modèle de données

### Interface Idea
```typescript
interface Idea {
  id: string;
  title: string;
  description: string;
  status: 'IDEA' | 'ARCHIVED';
  createdAt: Date;
}
```

### CreateIdeaPayload
```typescript
type CreateIdeaPayload = Pick<Idea, 'title' | 'description'>;
```

## Composants

### IdeaForm
Formulaire réactif de création d'idée avec :
- Validation du titre (requis, min 3 caractères)
- Validation de la description (requis, min 10 caractères)
- Émission d'événement `ideaSubmitted` au parent

### IdeaList
Affichage de la liste des idées avec :
- Tri automatique (actives en premier, puis archivées par date)
- Distinction visuelle des idées archivées (opacité, titre barré)
- Bouton d'archivage (masqué pour les idées déjà archivées)
- Compteur d'idées dans le titre
- Message d'état vide si aucune idée

## Service IdeaInMemory

Service singleton gérant l'état des idées avec :
- `ideas` - Signal computed des idées triées
- `ideasCount` - Nombre total d'idées
- `activeIdeasCount` - Nombre d'idées actives
- `archivedIdeasCount` - Nombre d'idées archivées
- `addIdea()` - Ajout d'une nouvelle idée
- `archiveIdea()` - Archivage d'une idée

## Améliorations possibles

- 🗄️ Persistance locale (LocalStorage)
- 🔍 Recherche et filtres
- ✏️ Édition d'idées
- 🗑️ Suppression définitive
- 🏷️ Catégories/tags
- 📊 Statistiques

## Ressources

- [Documentation Angular](https://angular.dev)
- [EAK - Easy Angular Kit](https://easyangularkit.com?via=djoudj)

## Licence

MIT
# boss-final-boite-a-idee
