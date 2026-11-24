#!/usr/bin/env python3
"""Revisa el portafolio v3.1.0 antes de subirlo a GitHub. Solo usa la biblioteca estándar.

Uso (desde la carpeta IsaksGir4.github.io):
    python tools/revisar_sitio.py

Qué comprueba:
  1. Que los tres JSON de /data sean válidos.
  2. Que existan todos los assets requeridos (favicons, og-image, retratos, galería, video).
  3. Que los textos bilingües {es, en} estén completos y mantengan paridad de longitud, cifras y términos.
  4. Reglas de honestidad: sin porcentajes en workStyle, suma del scorecard VitalRisk AI (82/100)
     y sin palabras prohibidas (finalista/ganador/avanzó).
  5. SEO (ProfilePage + Person), seguridad (CSP con hash, 0 eval, 0 innerHTML) y formato escaneable.
  6. Listado claro de elementos draft o needsReview (nunca mostrados en el sitio).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATS = {"data", "ai", "cloud", "business", "language", "recognition"}
KINDS = {"data", "ai", "innovation"}
MAX_MB = 3
MAX_VIDEO_MB = 12
MAX_THUMB_KB = 150
REQUIRED_ASSETS = [
    "assets/favicon.svg",
    "assets/favicon-32.png",
    "assets/apple-touch-icon.png",
    "assets/icon-512.png",
    "assets/og-image.png",
    "assets/logo-ig.svg",
    "assets/isaac-giraldo.jpg",
    "assets/isaac-giraldo-200.webp",
    "assets/isaac-giraldo-200.jpg",
    "assets/isaac-giraldo-400.webp",
    "assets/isaac-giraldo-400.jpg",
    "assets/isaac-giraldo-800.webp",
    "assets/isaac-giraldo-800.jpg",
    "assets/isaac-giraldo-1200.webp",
    "assets/isaac-giraldo-1200.jpg",
    "assets/isaac-giraldo-madera-200.webp",
    "assets/isaac-giraldo-madera-200.jpg",
    "assets/isaac-giraldo-madera-400.webp",
    "assets/isaac-giraldo-madera-400.jpg",
    "assets/isaac-giraldo-madera-800.webp",
    "assets/isaac-giraldo-madera-800.jpg",
    "assets/isaac-giraldo-madera-1200.webp",
    "assets/isaac-giraldo-madera-1200.jpg",
    "assets/style.css",
    "assets/print.css",
    "assets/app.js",
    "assets/motion.js",
    "assets/extras.js",
    "assets/dock.js",
    "assets/not-found.js",
    "images/hobby-transformers.webp",
    "images/hobby-transformers-robot.webp",
    "images/hobby-transformers-jet.webp",
    "images/hobby-gaming.webp",
    "images/hobby-investing.webp",
    "images/invention-studio-team.webp",
    "images/invention-studio-campus.webp",
    "images/vitalrisk-dashboard.webp",
    "images/vitalrisk-demo.mp4",
    "404.html",
    "robots.txt",
    "sitemap.xml",
]

INVARIANT_TERMS = [
    "VitalRisk", "Alight", "Spark-X", "Universidad EIA", "BECO", "ASCUN",
    "82/100", "269", "103", "XGBoost", "SHAP", "PostgreSQL", "PostGIS",
]

INCONSISTENT_TERMS = [
    ("EIA University", "Usa «Universidad EIA» también en inglés para consistencia"),
    ("12 participantes", "Debe decir «12 equipos»"),
    ("12 participants", "Debe decir «12 teams»"),
    ("fuga temporal", "Usa «con validación temporal (entrenamiento 2018–2021, prueba 2022–2023)»"),
    ("temporal data leakage", "Usa «temporal validation (2018–2021 train, 2022–2023 test)»"),
]

problems, notes, parity_warnings = [], [], []


def load(name):
    path = ROOT / "data" / name
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        problems.append(f"Falta data/{name}")
    except json.JSONDecodeError as e:
        problems.append(f"data/{name} no es un JSON válido: {e}")
    return None


def check_parity(es_val, en_val, where):
    if not isinstance(es_val, str) or not isinstance(en_val, str):
        return
    es_s, en_s = es_val.strip(), en_val.strip()
    if len(es_s) >= 35 and len(en_s) >= 35:
        ratio = len(en_s) / max(1, len(es_s))
        if ratio > 2.2 or ratio < 0.45:
            parity_warnings.append(f"Paridad ES/EN [{where}]: longitud muy dispar (ES {len(es_s)} vs EN {len(en_s)} car.)")
    for term in INVARIANT_TERMS:
        pat = rf"(?<!\w){re.escape(term)}(?!\w)"
        in_es = bool(re.search(pat, es_s, re.I))
        in_en = bool(re.search(pat, en_s, re.I))
        if in_es != in_en:
            parity_warnings.append(f"Paridad ES/EN [{where}]: término «{term}» aparece solo en {'ES' if in_es else 'EN'}")
    for bad, hint in INCONSISTENT_TERMS:
        if bad.lower() in es_s.lower() or bad.lower() in en_s.lower():
            parity_warnings.append(f"Terminología [{where}]: «{bad}» — {hint}")


def check_i18n(obj, where, required=True):
    if obj is None:
        if required:
            problems.append(f"{where}: falta objeto bilingüe {{es, en}}")
        return
    if not isinstance(obj, dict):
        problems.append(f"{where}: se esperaba objeto {{es, en}}")
        return
    for lang in ("es", "en"):
        val = obj.get(lang)
        if not val or (isinstance(val, str) and not val.strip()):
            problems.append(f"{where}: falta traducción en «{lang}»")
    if isinstance(obj.get("es"), str) and isinstance(obj.get("en"), str):
        check_parity(obj["es"], obj["en"], where)


def check_file(ref, where, max_kb=None, is_video=False):
    if not ref:
        return
    if ref.startswith(("http://", "https://")):
        return
    p = ROOT / ref
    if not p.exists():
        problems.append(f"{where}: no existe el archivo «{ref}»")
        return
    size = p.stat().st_size
    if size == 0:
        problems.append(f"{where}: el archivo «{ref}» está vacío")
    elif max_kb and size > max_kb * 1024:
        notes.append(f"{where}: «{ref}» pesa {size / 1024:.0f} KB; recomendado < {max_kb} KB")
    elif is_video and size > MAX_VIDEO_MB * 1024 * 1024:
        notes.append(f"{where}: «{ref}» pesa {size / 1048576:.1f} MB; recomendado < {MAX_VIDEO_MB} MB")
    elif not is_video and size > MAX_MB * 1024 * 1024:
        notes.append(f"{where}: «{ref}» pesa {size / 1048576:.1f} MB; conviene comprimirlo (< {MAX_MB} MB)")


# 1. Validar assets generados y módulos
for rel in REQUIRED_ASSETS:
    p = ROOT / rel
    if not p.exists() or p.stat().st_size == 0:
        problems.append(f"Falta asset requerido: «{rel}»")

# 2. Revisar index.html (SEO ProfilePage+Person, preload, CSP, privacidad)
index_path = ROOT / "index.html"
if index_path.exists():
    html_text = index_path.read_text(encoding="utf-8")
    if "isaacgiraldo.dev@gmail.com" in html_text:
        problems.append("index.html contiene el correo en texto plano; debe armarse solo en JS")
    if 'rel="canonical"' not in html_text:
        problems.append("index.html no incluye enlace canonical")
    if 'name="referrer"' not in html_text:
        problems.append("index.html no incluye meta referrer")
    if 'rel="preload"' not in html_text or 'fetchpriority="high"' not in html_text:
        problems.append("index.html debe incluir preload y fetchpriority=\"high\" en la imagen del hero")
    if "Content-Security-Policy" not in html_text or "sha256-" not in html_text:
        problems.append("index.html no incluye CSP con hash sha256")
    m_ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', html_text, re.S)
    if not m_ld:
        problems.append("index.html no incluye bloque JSON-LD")
    else:
        try:
            ld = json.loads(m_ld.group(1))
            if ld.get("@type") != "ProfilePage":
                problems.append("JSON-LD debe ser @type ProfilePage con mainEntity Person")
            person = ld.get("mainEntity") or {}
            if person.get("@type") != "Person":
                problems.append("JSON-LD mainEntity debe ser @type Person")
            if not person.get("alumniOf") or not person.get("sameAs") or not person.get("knowsAbout"):
                problems.append("JSON-LD Person debe incluir alumniOf, sameAs y knowsAbout")
        except json.JSONDecodeError as e:
            problems.append(f"JSON-LD inválido en index.html: {e}")
else:
    problems.append("Falta index.html")

# 3. Revisión de seguridad en JS (0 eval, 0 new Function, 0 innerHTML/outerHTML/insertAdjacentHTML)
for js_name in ("app.js", "motion.js", "extras.js", "dock.js", "not-found.js"):
    js_path = ROOT / "assets" / js_name
    if not js_path.exists():
        continue
    js_txt = js_path.read_text(encoding="utf-8")
    for pat, label in (
        (r"\beval\s*\(", "eval()"),
        (r"\bnew\s+Function\s*\(", "new Function()"),
        (r"\bdocument\.write\s*\(", "document.write()"),
        (r"\.innerHTML\b", ".innerHTML"),
        (r"\.outerHTML\b", ".outerHTML"),
        (r"\binsertAdjacentHTML\b", "insertAdjacentHTML"),
    ):
        if re.search(pat, js_txt):
            problems.append(f"Seguridad en assets/{js_name}: se encontró uso de {label}")
    for bad, hint in INCONSISTENT_TERMS:
        if bad.lower() in js_txt.lower():
            parity_warnings.append(f"Terminología [assets/{js_name}]: «{bad}» — {hint}")

# Verificar que no quede ninguna referencia a "_filter" en el sitio publicado
for rel_check in ("index.html", "404.html", "assets/app.js", "assets/extras.js", "assets/dock.js", "assets/motion.js", "assets/not-found.js", "data/profile.json", "data/projects.json", "data/certificates.json"):
    p_check = ROOT / rel_check
    if p_check.exists() and re.search(r"_filter(?![a-zA-Z])", p_check.read_text(encoding="utf-8")):
        problems.append(f"{rel_check} aún contiene una referencia a «_filter»")

certs = load("certificates.json") or []
projects = load("projects.json") or []
profile = load("profile.json") or {}

# 4. Certificados
seen = set()
for c in certs:
    cid = c.get("id", "?")
    if cid in seen:
        problems.append(f"Certificado con id repetido: {cid}")
    seen.add(cid)
    for key in ("title", "issuer", "date", "category"):
        if not c.get(key):
            problems.append(f"Certificado {cid}: falta «{key}»")
    if c.get("category") not in CATS:
        problems.append(f"Certificado {cid}: categoría «{c.get('category')}» no válida")
    if "note" in c:
        check_i18n(c.get("note"), f"Certificado {cid} (note)")
    check_file(c.get("file"), f"Certificado {cid}")
    check_file(c.get("thumb"), f"Certificado {cid} (portada)", max_kb=MAX_THUMB_KB)
    if c.get("draft"):
        notes.append(f"Certificado {cid}: oculto (draft)")
    if c.get("needsReview"):
        extra = f" — {c['reviewNote']}" if c.get("reviewNote") else ""
        notes.append(f"Certificado {cid} [needsReview]: verificar con el original{extra}")
    if not c.get("file") and not c.get("url"):
        notes.append(f"Certificado {cid}: sin archivo ni enlace de verificación (se muestra con portada generada 3:2)")

# 5. Proyectos
for p in projects:
    pid = p.get("id", "?")
    if p.get("kind") not in KINDS:
        problems.append(f"Proyecto {pid}: kind «{p.get('kind')}» no válido")
    check_i18n(p.get("title"), f"Proyecto {pid} (title)")
    check_i18n(p.get("summary"), f"Proyecto {pid} (summary)")
    if not p.get("draft"):
        for field in ("problem", "role", "result"):
            if p.get(field):
                check_i18n(p.get(field), f"Proyecto {pid} ({field})")
            elif not p.get("needsReview"):
                problems.append(f"Proyecto visible {pid}: falta «{field}» (o marcar needsReview: true)")
    if p.get("status"):
        check_i18n(p.get("status"), f"Proyecto {pid} (status)")
    if p.get("context"):
        check_i18n(p.get("context"), f"Proyecto {pid} (context)")
    if p.get("learned"):
        check_i18n(p.get("learned"), f"Proyecto {pid} (learned)")
    if p.get("metrics"):
        for lang in ("es", "en"):
            if not (p["metrics"].get(lang) or []):
                problems.append(f"Proyecto {pid}: faltan métricas en «{lang}»")
    for gi, g in enumerate(p.get("gallery") or []):
        check_file(g.get("src"), f"Proyecto {pid} gallery[{gi}]")
        check_i18n(g.get("alt"), f"Proyecto {pid} gallery[{gi}].alt")
        if g.get("caption"):
            check_i18n(g.get("caption"), f"Proyecto {pid} gallery[{gi}].caption")
    if p.get("draft"):
        notes.append(f"Proyecto {pid}: oculto (draft)")
    if p.get("needsReview"):
        extra = f" — {p['reviewNote']}" if p.get("reviewNote") else ""
        notes.append(f"Proyecto {pid} [needsReview]{extra}")

    if pid == "vitalrisk-ai":
        blob = json.dumps(p, ensure_ascii=False).lower()
        for banned in ("finalista", "ganador", "avanzó", "avanzo"):
            if banned in blob:
                problems.append(f"Proyecto vitalrisk-ai contiene término no permitido: «{banned}»")
        cs = p.get("caseStudy") or {}
        scorecard = cs.get("scorecard") or []
        total = sum(item.get("score", 0) for item in scorecard)
        if total != 82:
            problems.append(f"VitalRisk AI scorecard suma {total}, debe sumar 82")
        for idx, item in enumerate(scorecard):
            check_i18n(item.get("label"), f"VitalRisk scorecard[{idx}]")
        for idx, step in enumerate(cs.get("pipeline") or []):
            check_i18n(step.get("short"), f"VitalRisk pipeline[{idx}].short")
            check_i18n(step.get("sub"), f"VitalRisk pipeline[{idx}].sub")
        media = cs.get("media") or {}
        if media.get("poster"):
            check_file(media.get("poster"), "VitalRisk media.poster")
        if media.get("video"):
            check_file(media.get("video"), "VitalRisk media.video", is_video=True)
        check_i18n(cs.get("reflection"), "VitalRisk reflection")

# 6. Perfil (principios, Criteria Corp workStyle, trayectoria ordenada, aficiones, habilidades)
for i, item in enumerate(profile.get("principles", [])):
    check_i18n(item.get("title"), f"profile.principles[{i}].title")
    check_i18n(item.get("text"), f"profile.principles[{i}].text")

ws = profile.get("workStyle")
if not ws:
    problems.append("profile.json: falta sección «workStyle»")
else:
    check_i18n(ws.get("source"), "profile.workStyle.source")
    ws_text = json.dumps(ws, ensure_ascii=False)
    if re.search(r"\d+\s*%", ws_text) or "Extravertido 64" in ws_text or "Asertivo 68" in ws_text:
        problems.append("profile.workStyle no debe incluir porcentajes ni puntajes numéricos")
    for i, sp in enumerate(ws.get("spectra", [])):
        for k in ("trait", "left", "right", "summary"):
            check_i18n(sp.get(k), f"profile.workStyle.spectra[{i}].{k}")
    for i, card in enumerate(ws.get("cards", [])):
        for k in ("frontTitle", "frontText", "backTitle", "backText"):
            check_i18n(card.get(k), f"profile.workStyle.cards[{i}].{k}")

journey = profile.get("journey", [])
j_ids = [j.get("id") for j in journey[:3]]
if j_ids != ["research", "operations", "sports"]:
    problems.append(f"Orden de Trayectoria debe empezar por research, operations, sports (actual: {j_ids})")
for i, j in enumerate(journey):
    for k in ("kicker", "title", "text"):
        check_i18n(j.get(k), f"profile.journey[{i}].{k}")
    if j.get("period"):
        check_i18n(j.get("period"), f"profile.journey[{i}].period")
    if j.get("chips"):
        for lang in ("es", "en"):
            if not (j["chips"].get(lang) or []):
                problems.append(f"profile.journey[{i}].chips: faltan chips en «{lang}»")

for h_item in profile.get("hobbies", []):
    hid = h_item.get("id", "?")
    check_i18n(h_item.get("title"), f"profile.hobbies[{hid}].title")
    check_i18n(h_item.get("text"), f"profile.hobbies[{hid}].text")
    if h_item.get("alt"):
        check_i18n(h_item.get("alt"), f"profile.hobbies[{hid}].alt")
    check_file(h_item.get("image"), f"Afición {hid}")
    for gi, g in enumerate(h_item.get("gallery") or []):
        check_file(g.get("src"), f"Afición {hid} gallery[{gi}]")
        check_i18n(g.get("alt"), f"Afición {hid} gallery[{gi}].alt")

for i, sk in enumerate(profile.get("skills", [])):
    check_i18n(sk.get("group"), f"profile.skills[{i}].group")

# 7. Paridad en diccionarios I18N dentro de assets/app.js
app_js = (ROOT / "assets" / "app.js").read_text(encoding="utf-8")
m_es = re.search(r"const I18N\s*=\s*\{\s*es:\s*\{(.*?)\n  \},\s*en:\s*\{(.*?)\n  \}\s*\};", app_js, re.S)
if m_es:
    def parse_js_obj(block):
        out = {}
        for m in re.finditer(r"(\w+):\s*(?:'((?:\\'|[^'])*)'|\"((?:\\\"|[^\"])*)\")", block):
            out[m.group(1)] = m.group(2) if m.group(2) is not None else m.group(3)
        return out
    es_dict = parse_js_obj(m_es.group(1))
    en_dict = parse_js_obj(m_es.group(2))
    for k in sorted(set(es_dict) | set(en_dict)):
        if k not in es_dict:
            problems.append(f"assets/app.js I18N: falta clave «{k}» en ES")
        elif k not in en_dict:
            problems.append(f"assets/app.js I18N: falta clave «{k}» en EN")
        else:
            check_parity(es_dict[k], en_dict[k], f"app.js I18N.{k}")

# 8. Archivos huérfanos en /certificates
cert_dir = ROOT / "certificates"
if cert_dir.exists():
    referenced = {Path(c.get("file", "")).name for c in certs} | {Path(c.get("thumb", "")).name for c in certs}
    for f in sorted(cert_dir.iterdir()):
        if f.name.startswith(".") or f.name.lower() == "readme.md":
            continue
        if f.name not in referenced:
            notes.append(f"certificates/{f.name}: está en la carpeta pero ningún certificado lo usa")

# 9. Aviso de CV público
cv_file = ROOT / "assets" / "Isaac_Camilo_Giraldo_Gomez_CV.pdf"
if cv_file.exists():
    notes.append(f"CV público activo: assets/{cv_file.name} ({cv_file.stat().st_size / 1024:.0f} KB).")
else:
    notes.append("CV PDF aún no cargado en assets/Isaac_Camilo_Giraldo_Gomez_CV.pdf.")

visible_projects = [p for p in projects if not p.get("draft")]
print("== Revisión del portafolio v3.1.0 ==")
print(f"Certificados: {len(certs)} · Proyectos visibles: {len(visible_projects)}/{len(projects)} · Assets clave: {len(REQUIRED_ASSETS)}")
if problems:
    print("\nProblemas (corrígelos antes de publicar):")
    for x in problems:
        print("  ✗", x)
else:
    print("\n✓ Sin errores estructurales, de rutas, de seguridad JS ni de i18n.")
if parity_warnings:
    print("\nAvisos de paridad y microcopy ES/EN:")
    for x in parity_warnings:
        print("  !", x)
else:
    print("✓ Paridad ES/EN y consistencia terminológica sin alertas.")
if notes:
    print("\nAvisos / needsReview:")
    for x in notes:
        print("  •", x)
sys.exit(1 if problems else 0)
