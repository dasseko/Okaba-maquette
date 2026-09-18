// POC O'KABA — Modération IA des annonces par un VLM (Qwen2.5-VL via Ollama).
// Vérifie : cohérence image↔annonce, contenu sexuel (NSFW), et contenus INTERDITS (armes, drogues, illégal).
import express from "express";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UP = path.join(__dirname, "public", "uploads");
fs.mkdirSync(UP, { recursive: true });

const OLLAMA = "http://localhost:11434";
const MODEL = process.env.OKABA_VLM || "qwen2.5vl:7b";

const CATEGORIES = [
  { id: "vehicules", nom: "Véhicules" }, { id: "services", nom: "Services" },
  { id: "electronique", nom: "Électronique" }, { id: "mode", nom: "Mode" },
  { id: "maison", nom: "Maison" }, { id: "immobilier", nom: "Immobilier" },
  { id: "alimentation", nom: "Alimentation" }, { id: "animaux", nom: "Animaux" },
  { id: "beaute", nom: "Beauté" },
];
const nomOf = (id) => (CATEGORIES.find(c => c.id === id) || { nom: id }).nom;

async function askVLM(b64, catNom, title, desc) {
  const prompt =
`Tu es un modérateur STRICT pour O'KABA, une plateforme multiservices gabonaise. Une annonce peut être :
- un PRODUIT à vendre (objet physique), ou
- une PRESTATION DE SERVICE (une personne au travail : réparation, installation, plomberie, mécanique, coiffure, ménage, transport, cours…), ou
- un ÉTABLISSEMENT / annuaire (commerce, société, lieu).
Regarde UNIQUEMENT l'image. Le vendeur a choisi : catégorie "${catNom}", titre "${title || "(vide)"}", description "${desc || "(vide)"}".

Choisis "categorie_suggeree" parmi CETTE liste (celle qui décrit le mieux l'image) :
Véhicules · Pièces & accessoires auto · Électronique · Téléphonie · Informatique · Électroménager · Mode & vêtements · Chaussures · Montres & bijoux · Beauté & cosmétiques · Santé · Maison & meubles · Décoration · Immobilier · Alimentation & boissons · Animaux · Bébé & enfant · Sports & loisirs · Bricolage & jardin · Matériel professionnel · Emploi · Services de proximité · Enseignement & formation · Événements · Autre.
(Exemples : une personne qui répare un pneu, une clim, une voiture, une canalisation → "Services de proximité". Un téléphone posé → "Téléphonie". Un plat cuisiné → "Alimentation & boissons".)

Réponds avec UNIQUEMENT un objet JSON (aucun autre texte) :
{"contenu":"<ce que montre VRAIMENT l'image, 3-8 mots en français>","categorie_suggeree":"<UNE catégorie de la liste ci-dessus qui décrit le mieux l'image>","titre_coherent":true|false,"nsfw":true|false,"interdit":true|false,"type_interdit":"arme"|"drogue"|"violence"|"autre"|"aucun","raison":"<très courte raison en français>"}

Règles STRICTES :
- "contenu" : décris fidèlement le sujet PRINCIPAL réel de l'image (l'objet ou l'action montré), sans te laisser influencer par le titre.
- "categorie_suggeree" : choisis d'après ce que tu VOIS réellement, pas d'après le titre/la catégorie annoncés.
- "titre_coherent" : compare le TYPE d'objet du titre "${title || "(vide)"}" avec le sujet principal de l'image.
  * true si c'est le même TYPE d'objet, MÊME SI la marque, le modèle, la couleur ou la matière exacts ne sont pas vérifiables. Ex. true : titre "Samsung Galaxy S23" + image d'un téléphone ; titre "Canapé cuir 3 places" + image d'un canapé ; titre "Robe en wax" + image d'une robe.
  * false SEULEMENT si le titre nomme un objet de nature CLAIREMENT DIFFÉRENTE de l'image. Ex. false : titre "Canapé" + image d'une réparation de pneu ; titre "iPhone" + image d'un ordinateur ; titre "Voiture" + image de nourriture ; titre "Canapé" + image de l'intérieur d'un restaurant.
  * Ne juge PAS la marque/le modèle/la couleur/les quantités/les tailles/les dimensions (ex: "3 places", "256 Go", "taille M") : juge UNIQUEMENT le type d'objet.
  * IMPORTANT : si ce que tu décris dans "contenu" est le même type d'objet que le titre, alors titre_coherent = true (ex: contenu "canapé en cuir" + titre "Canapé cuir 3 places" → true).
  * Si le titre est vide ou générique, mets true.
- "interdit" = true si l'image montre : une arme à feu (pistolet, fusil), un couteau/arme blanche, des munitions, du cannabis/de la drogue, des pilules, ou tout objet illégal. Renseigne "type_interdit". Sinon false / "aucun".
- "nsfw" = true si nudité ou contenu sexuel.
Sois strict : une arme ou une drogue DOIT être interdit=true.`;
  const body = { model: MODEL, prompt, images: [b64], stream: false, format: "json", options: { temperature: 0 } };
  const r = await fetch(OLLAMA + "/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error("Ollama HTTP " + r.status);
  const j = await r.json();
  let v; try { v = JSON.parse(j.response); } catch (e) { throw new Error("Réponse VLM non-JSON: " + (j.response || "").slice(0, 120)); }
  return v;
}

const norm = (s) => (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
// Catégories "vues" (categorie_suggeree) compatibles avec la catégorie choisie par le vendeur.
const COMPAT = {
  vehicules: ["vehicule", "piece", "accessoire", "auto", "moto", "voiture", "camion"],
  electronique: ["electronique", "telephonie", "telephone", "informatique", "ordinateur", "electromenager", "tele"],
  mode: ["mode", "vetement", "chaussure", "montre", "bijou", "sac", "beaute", "cosmetique"],
  maison: ["maison", "meuble", "decoration", "deco", "electromenager", "jardin", "bricolage", "cuisine"],
  immobilier: ["immobilier", "maison", "appartement", "terrain", "bureau", "local"],
  services: ["service"],
  alimentation: ["alimentation", "boisson", "nourriture", "plat", "aliment"],
  animaux: ["animaux", "animal", "chien", "chat"],
  beaute: ["beaute", "cosmetique", "sante", "parfum"],
};
function categoryCompatible(reqId, suggested) {
  const kws = COMPAT[reqId] || [];
  const s = norm(suggested);
  if (!s) return true; // pas d'info => on ne bloque pas sur la catégorie
  return kws.some(k => s.includes(k) || norm(nomOf(reqId)).includes(k) && s.includes(norm(nomOf(reqId))));
}

async function moderate(filePath, categoryId, title, desc) {
  const b64 = fs.readFileSync(filePath).toString("base64");
  const catNom = nomOf(categoryId);
  const v = await askVLM(b64, catNom, title, desc);

  // 1) Contenus interdits (armes, drogues, etc.)
  if (v.interdit) {
    const t = { arme: "arme à feu", drogue: "drogue", violence: "violence" }[v.type_interdit] || "objet illégal";
    return { ok: false, reason: `Contenu interdit détecté : ${t}.`, detail: v };
  }
  // 2) NSFW
  if (v.nsfw) return { ok: false, reason: `Contenu à caractère sexuel détecté.`, detail: v };
  // 3) Cohérence CATÉGORIE (décision côté code, basée sur ce que le VLM a vu)
  const suggested = v.categorie_suggeree || v.contenu || "";
  if (!categoryCompatible(categoryId, suggested)) {
    return { ok: false, reason: `Votre image correspond plutôt à la catégorie « ${suggested} », pas à « ${catNom} ».`, detail: v };
  }
  // 4) Cohérence TITRE / description
  if (v.titre_coherent === false) {
    return { ok: false, reason: `L'image montre ${v.contenu || "autre chose"}, ce qui ne correspond pas au titre annoncé.`, detail: v };
  }
  return { ok: true, reason: "Conforme.", detail: v };
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const upload = multer({ dest: UP });
const articles = [];

app.get("/api/categories", (_req, res) => res.json(CATEGORIES));
app.get("/api/articles", (req, res) => { const c = req.query.category; res.json(articles.filter(a => !c || a.category === c)); });

app.post("/api/publish", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!req.file) return res.status(400).json({ status: "error", reason: "Image manquante." });
    const verdict = await moderate(req.file.path, category, title, description);
    if (!verdict.ok) {
      fs.unlink(req.file.path, () => {});
      return res.json({ status: "rejected", reason: verdict.reason, detail: verdict.detail });
    }
    const ext = (req.file.originalname.split(".").pop() || "jpg").toLowerCase();
    const fname = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    fs.renameSync(req.file.path, path.join(UP, fname));
    const article = { id: Date.now(), title, description, category, image: `/uploads/${fname}`, detail: verdict.detail, createdAt: new Date().toISOString() };
    articles.unshift(article);
    res.json({ status: "approved", article, detail: verdict.detail });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", reason: "Erreur modération: " + e.message });
  }
});

const PORT = 5178;
app.listen(PORT, () => console.log(`🚀 Modération VLM (${MODEL}) sur http://localhost:${PORT}`));
