#!/usr/bin/env python3
"""Comprueba todos los enlaces internos y externos del portafolio (solo biblioteca estándar).

Uso (desde la carpeta IsaksGir4.github.io):
    python tools/revisar_enlaces.py
    python tools/revisar_enlaces.py --offline   # solo valida enlaces internos y anclas

Reglas:
  - Enlaces internos (rutas de archivos y anclas #id): cualquier fallo es ERROR (código de salida 1).
  - Enlaces externos:
      * Render (*.onrender.com): tiempo de espera de 60 s; timeout o 5xx se marca como ADVERTENCIA.
      * LinkedIn (*linkedin.com*): código 999 / 403 / 429 se marca como ADVERTENCIA (bloqueo anti-bot).
      * GitHub API (api.github.com): 403 / 429 se marca como ADVERTENCIA (rate limit).
      * Otros 404 / 410: ERROR.
"""
import argparse
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

SKIP_EXTERNAL_PREFIXES = (
    "https://schema.org",
    "http://www.w3.org/2000/svg",
    "https://isaksgir4.github.io",
)
SKIP_EXACT = {
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
}


def extract_html_refs(html_path):
    text = html_path.read_text(encoding="utf-8")
    ids = set(re.findall(r'\bid="([^"]+)"', text))
    refs = []
    for attr in ("href", "src", "data", "poster"):
        for m in re.finditer(rf'\b{attr}="([^"]+)"', text):
            refs.append((html_path.name, m.group(1)))
    for attr in ("srcset", "imagesrcset"):
        for m in re.finditer(rf'\b{attr}="([^"]+)"', text):
            for part in m.group(1).split(","):
                u = part.strip().split()[0]
                if u:
                    refs.append((html_path.name, u))
    for m in re.finditer(r'content="(https?://[^"]+)"', text):
        refs.append((html_path.name, m.group(1)))
    return ids, refs


def extract_json_refs(json_path):
    refs = []
    data = json.loads(json_path.read_text(encoding="utf-8"))

    def walk(node, where):
        if isinstance(node, dict):
            for k, v in node.items():
                if k in ("url", "repo", "demo", "file", "thumb", "image", "src", "poster", "video") and isinstance(v, str) and v.strip():
                    refs.append((f"{json_path.name}:{where}.{k}", v.strip()))
                else:
                    walk(v, f"{where}.{k}")
        elif isinstance(node, list):
            for i, item in enumerate(node):
                walk(item, f"{where}[{i}]")

    walk(data, "root")
    return refs


def check_external(url):
    host = (urlparse(url).hostname or "").lower()
    is_render = host.endswith(".onrender.com")
    is_linkedin = "linkedin.com" in host
    is_gh_api = host == "api.github.com"
    timeout = 60 if is_render else 15

    ctx = ssl.create_default_context()
    last_err = None
    for method in ("HEAD", "GET"):
        req = urllib.request.Request(url, headers=HEADERS, method=method)
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
                code = resp.getcode()
                if 200 <= code < 400:
                    return ("ok", f"HTTP {code}")
                return ("warn", f"HTTP {code}")
        except urllib.error.HTTPError as e:
            code = e.code
            if method == "HEAD" and code in (403, 405, 501, 999):
                last_err = f"HTTP {code}"
                continue
            if is_linkedin and code in (403, 429, 999):
                return ("warn", f"HTTP {code} (LinkedIn anti-bot)")
            if is_render and code >= 500:
                return ("warn", f"HTTP {code} (Render despertando/no disponible)")
            if is_gh_api and code in (403, 429):
                return ("warn", f"HTTP {code} (límite API GitHub)")
            if code in (403, 429):
                return ("warn", f"HTTP {code} (protección o límite del servidor)")
            return ("error", f"HTTP {code}")
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            reason = getattr(e, "reason", e)
            last_err = str(reason)
            if is_render:
                return ("warn", f"Timeout/red tras {timeout}s en Render ({last_err})")
            if is_linkedin:
                return ("warn", f"Red bloqueada en LinkedIn ({last_err})")
            return ("warn", f"Sin acceso de red ({last_err})")
    return ("warn", last_err or "Sin respuesta")


def main():
    parser = argparse.ArgumentParser(description="Valida enlaces internos y externos del portafolio.")
    parser.add_argument("--offline", action="store_true", help="Solo valida enlaces internos y anclas.")
    args = parser.parse_args()

    errors = []
    warnings = []
    internal_ok = 0
    external_urls = {}

    index_ids, index_refs = extract_html_refs(ROOT / "index.html")
    all_refs = list(index_refs)
    if (ROOT / "404.html").exists():
        _, nf_refs = extract_html_refs(ROOT / "404.html")
        all_refs.extend(nf_refs)

    for jn in ("certificates.json", "projects.json", "profile.json"):
        jp = ROOT / "data" / jn
        if jp.exists():
            all_refs.extend(extract_json_refs(jp))

    # También revisar enlaces en README del perfil si está junto al repositorio
    profile_readme = ROOT.parent / "IsaksGir4" / "README.md"
    if profile_readme.exists():
        rm_txt = profile_readme.read_text(encoding="utf-8")
        for m in re.finditer(r"https?://[^\s)\"'>*`]+", rm_txt):
            all_refs.append(("IsaksGir4/README.md", m.group(0).rstrip(".,;*_")))

    for src, ref in all_refs:
        if ref in ("#", "") or ref.startswith(("mailto:", "tel:", "javascript:", "data:")):
            continue
        if ref.startswith(("http://", "https://")):
            if ref in SKIP_EXACT or any(ref.startswith(p) for p in SKIP_EXTERNAL_PREFIXES):
                continue
            external_urls.setdefault(ref, []).append(src)
            continue

        # Enlace interno o ancla
        clean = ref.split("?", 1)[0]
        if clean.startswith("#"):
            anchor = clean[1:]
            if anchor and anchor not in index_ids:
                errors.append(f"Ancla rota en {src}: «{ref}» no existe en index.html")
            else:
                internal_ok += 1
            continue

        rel_path = clean.lstrip("/")
        if not rel_path:
            internal_ok += 1
            continue
        target = ROOT / rel_path
        if not target.exists():
            errors.append(f"Archivo interno inexistente ({src}): «{ref}»")
        else:
            internal_ok += 1

    print("== Revisión de enlaces del portafolio v3.1.0 ==")
    print(f"Internos verificados: {internal_ok} OK · {len(errors)} errores")

    external_ok = 0
    if args.offline:
        print(f"Externos omitidos (--offline): {len(external_urls)} URLs únicas")
    else:
        print(f"Comprobando {len(external_urls)} URLs externas únicas (timeout 60 s para Render)...")
        for url in sorted(external_urls):
            status, detail = check_external(url)
            where = ", ".join(sorted(set(external_urls[url]))[:2])
            if status == "ok":
                external_ok += 1
                print(f"  ✓ {url} ({detail})")
            elif status == "warn":
                warnings.append(f"{url} [{where}] → {detail}")
                print(f"  ! {url} ({detail})")
            else:
                errors.append(f"Enlace externo roto {url} [{where}] → {detail}")
                print(f"  ✗ {url} ({detail})")

    if warnings:
        print(f"\nAdvertencias ({len(warnings)} — no bloquean publicación):")
        for w in warnings:
            print("  !", w)
    if errors:
        print(f"\nErrores ({len(errors)}):")
        for e in errors:
            print("  ✗", e)
    else:
        print(f"\n✓ Enlaces verificados sin errores ({internal_ok} internos, {external_ok} externos OK, {len(warnings)} advertencias).")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
