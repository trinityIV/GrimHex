# Structure de fichiers pour GitHub Pages

Pour que GitHub Pages trouve vos fichiers, votre repository doit avoir cette structure :

```
votre-repo/
├── index.html          # À la racine
├── styles.css          # À la racine  
├── script.js           # À la racine
├── img/
│   └── cover.png
└── musique/
    ├── Dans ton Drake.mp3
    ├── Dirty Trsh (Remastered).mp3
    ├── le Carrack Organisé (Trinity - Requiem and the corps).mp3
    ├── le Carrack Organisé.mp3
    ├── TRASHGANG – LES CHASSEURS DE TANA.mp3
    ├── trshgang – Bienvenue dans la piraterie.mp3
    └── trshgang –Viens pull up sur mon Javelin.mp3
```

## Changements effectués :
- `../img/cover.png` → `./img/cover.png`
- `../musique/fichier.mp3` → `./musique/fichier.mp3`

## Pour déployer :
1. Mettez tous les fichiers du dossier `website/` à la racine de votre repo GitHub
2. Activez GitHub Pages sur la branche main
3. Votre site sera accessible à `https://votre-username.github.io/nom-du-repo`
